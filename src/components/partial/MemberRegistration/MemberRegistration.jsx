import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import MemberRegisterInput from "./MemberRegisterInput/MemberRegisterInput";
import MemberRegisterSelect from "./MemberRegisterSelect/MemberRegisterSelect";
import ImageUpload from "../../../config/Upload/ImageUploadcpanel";
import moment from "moment/moment";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const schema = z.object({
  full_name: z.string().nonempty({ message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  contact_no: z
    .string()
    .regex(/^\d{11}$/, { message: "Please enter a valid phone number" }),
  date_of_birth: z.string().optional(),
  nid_number: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().nonempty({ message: "Please select your gender" }),
  blood_group: z.string().optional(),
  nickname: z.string().optional(),
  status: z.string().optional(),
  religion: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  profession: z.string().optional(),
  photourl: z.string().optional(),
  member_id: z.string().nonempty({ message: "Please enter your member id" }),
  emergency_contact_name: z.string().optional(),
  emergency_contact_number: z.string().optional(),
  admission_date: z
    .string()
    .nonempty({ message: "Please enter your admission date" }),
  expiredate: z.string().nonempty({ message: "Please enter your expire date" }),
  card_no: z
    .string()
    .nonempty({ message: "Please enter card number" }),
});

function MemberRegistration({ setIsShow, isShow }) {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const religions = ["Islam", "Hindu", "Christian", "Buddhism", "Other"];
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { branch } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setLoading(true);
    data.branch = branch;
  
    if (isAdvanced) {
      const isValid = validateAdvancedFields(data);
      if (!isValid) {
        setLoading(false);
        return;
      }
    }
  
    try {
      const response = await axiosSecure.post(`/users/post`, data);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Registration successful!");
        setIsShow(false);
        reset();
        setErrorMessage("");
      }
    } catch (error) {
      handleApiErrors(error);
    } finally {
      setLoading(false);
    }
  };
  

  const validateAdvancedFields = (data) => {
    const errors = [];
    
    if (!data.emergency_contact_number) errors.push({ field: "emergency_contact_number", message: "Please enter your emergency contact number!" });
    if (!data.emergency_contact_name) errors.push({ field: "emergency_contact_name", message: "Please enter your emergency contact name!" });
    if (!data.height) errors.push({ field: "height", message: "Please enter your height!" });
    if (!data.weight) errors.push({ field: "weight", message: "Please enter your weight!" });
    if (!data.blood_group) errors.push({ field: "blood_group", message: "Please enter blood group!" });
    if (!data.religion) errors.push({ field: "religion", message: "Please enter religion!" });
    
    errors.forEach(error => setError(error.field, { type: "custom", message: error.message }));
    return errors.length === 0;
  };
  
  const handleApiErrors = (error) => {
    if (error?.response?.status === 409) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage.includes("email") && errorMessage.includes("mobile")) {
        setError("email", { type: "manual", message: "Email already exists." });
        setError("contact_no", { type: "manual", message: "Mobile number already exists." });
      } else if (errorMessage.includes("email")) {
        setError("email", { type: "manual", message: "Email already exists." });
      } else if (errorMessage.includes("mobile")) {
        setError("contact_no", { type: "manual", message: "Mobile number already exists." });
      }
    } else if (error?.response?.status === 401) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage === "Member ID already exists.") {
        setError("member_id", { type: "manual", message: "Member ID already exists." });
      }
    } else if (error?.response?.status === 400) {
      setErrorMessage("Invalid input, please check your data.");
    } else {
      setErrorMessage("Something went wrong! Please try again.");
    }
  };

  const handleAddmitionDate = (e) => {
    const date = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setValue("date_of_birth", date);
    setValue("expiredate", date);
  };

  useEffect(() => {
    const date = moment(new Date()).format("YYYY-MM-DD");
    setValue("admission_date", date);
    setValue("expiredate", date);
  }, [moment, isShow]);

  return (
    <article
      className={`w-[90%] md:w-[65%] lg:w-[80%] rounded-xl bg-white my-7 transition-all duration-500 ${isShow ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
    >
      <h2 className="px-5 py-1 border-b border-gray-300 flex justify-between items-center w-full">
        <span className="font-medium mt-2">Add Member</span>
        <label className="capitalize font-bold text-[0.9rem] select-none">
          Advanced
          <input
            type={"checkbox"}
            className={`p-1 bg-slate-50 border border-gray-300 focus:border-black ml-3`}
            checked={isAdvanced}
            onChange={() => setIsAdvanced(!isAdvanced)}
          />
        </label>
      </h2>

      {/* Display error message */}
      {errorMessage && (
        <div className="text-red-600 font-semibold px-5 py-2 text-center">
          {errorMessage}
        </div>
      )}

      <form className="md:px-5 px-3 py-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-4 gap-3">
          <MemberRegisterInput
            type={"text"}
            register={register}
            error={errors}
            name={"full_name"}
            isRequired={true}
            label={"Full Name*"}
          />

          <MemberRegisterInput
            type={"email"}
            label={"Email*"}
            register={register}
            error={errors}
            name={"email"}
            isRequired={true}
          />

          <MemberRegisterInput
            type={"text"}
            label={"Member Id*"}
            register={register}
            error={errors}
            name={"member_id"}
            isRequired={true}
          />

          <MemberRegisterInput
            type={"text"}
            label={"Contact Number*"}
            register={register}
            error={errors}
            name={"contact_no"}
            isRequired={true}
          />

          <MemberRegisterSelect
            type={"text"}
            label={"Gender *"}
            register={register}
            error={errors}
            name={"gender"}
            isRequired={true}
          >
            <option value={""}>Select Gender</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </MemberRegisterSelect>

          <MemberRegisterSelect
                type={"text"}
                label={"Blood Group"}
                register={register}
                error={errors}
                name={"blood_group"}
                isRequired={false}
              >
                <option value={""}>Select Blood Group</option>
                {bloodGroups.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </MemberRegisterSelect>

 

          <MemberRegisterInput
            type={"text"}
            label={"Card Number*"}
            register={register}
            error={errors}
            name={"card_no"}
            isRequired={true}
          />

          <MemberRegisterInput
            type={"date"}
            label={"Admission Date*"}
            register={register}
            error={errors}
            name={"admission_date"}
            onChange={handleAddmitionDate}
            isRequired={true}
          />

          <MemberRegisterInput
            type={"date"}
            label={"Expiry Date*"}
            register={register}
            error={errors}
            name={"expiredate"}
            readOnly={true}
            isRequired={false}
            disabled={true}
          />

          {isAdvanced && (
            <>
              <MemberRegisterInput
                type={"text"}
                register={register}
                error={errors}
                name={"nickname"}
                isRequired={false}
                label={"Nickname"}
              />
                       <MemberRegisterInput
            type={"text"}
            label={"National ID"}
            register={register}
            error={errors}
            name={"nid_number"}
            isRequired={true}
          />

              <MemberRegisterInput
                type={"text"}
                label={"Profession"}
                register={register}
                error={errors}
                name={"profession"}
                isRequired={false}
              />

              <MemberRegisterInput
                type={"text"}
                label={"Address"}
                register={register}
                error={errors}
                name={"address"}
                isRequired={false}
              />

              <MemberRegisterInput
                type={"date"}
                label={"Date Of Birth"}
                register={register}
                error={errors}
                name={"date_of_birth"}
                isRequired={false}
              />

              <MemberRegisterSelect
                type={"text"}
                label={"Marital Status"}
                register={register}
                error={errors}
                name={"status"}
                isRequired={false}
              >
                <option value={""}>Select Marital Status</option>
                <option value={"Married"}>Married</option>
                <option value={"Unmarried"}>Unmarried</option>
                <option value={"Divorced"}>Divorced</option>
                <option value={"Don't say"}>Don't Say</option>
              </MemberRegisterSelect>

              <MemberRegisterSelect
                type={"text"}
                label={"Religion"}
                register={register}
                error={errors}
                name={"religion"}
                isRequired={false}
              >
                <option value={""}>Select Religion</option>
                {religions.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </MemberRegisterSelect>

              <MemberRegisterSelect
                type={"text"}
                label={"Height"}
                register={register}
                error={errors}
                name={"height"}
                isRequired={false}
              >
                <option value={""}>Select Height</option>
                {Array.from({ length: 5 }, (_, feetIndex) => {
                  const feet = feetIndex + 3;
                  return Array.from({ length: 12 }, (_, inchIndex) => {
                    const inch = inchIndex;
                    return (
                      <option value={`${feet} feet ${inch}`} key={`${feet}-${inch}`}>
                        {`${feet} feet ${inch}`}
                      </option>
                    );
                  });
                })}
              </MemberRegisterSelect>

              <MemberRegisterInput
                type={"text"}
                label={"Weight (kg)"}
                register={register}
                error={errors}
                name={"weight"}
                isRequired={false}
              />



              <MemberRegisterInput
                type={"text"}
                label={"Emergency Contact Name"}
                register={register}
                error={errors}
                name={"emergency_contact_name"}
                isRequired={false}
              />

              <MemberRegisterInput
                type={"text"}
                label={"Emergency Contact Number"}
                register={register}
                error={errors}
                name={"emergency_contact_number"}
                isRequired={false}
              />

              <MemberRegisterInput
                type={"text"}
                label={"Photo Url"}
                register={register}
                error={errors}
                name={"photourl"}
                isRequired={false}
              />
            </>
          )}
        </div>
        <div>
          <div className="flex md:flex-row flex-col justify-between py-3 mt-2">
            <imgUpload setValue={setValue} />
            <div className="flex justify-end items-center gap-3 mt-9">
              <div className="flex justify-end">
                <div className="flex gap-2 cursor-pointer items-center bg-gray-700 text-white py-2 px-3 rounded-xl shadow hover:bg-gray-800 transition duration-300">
                  <button
                    type="button"
                    onClick={() => {
                      setIsShow(false);
                      reset();
                    }}
                    className="font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex gap-2 cursor-pointer items-center bg-gray-700 text-white py-2 px-3 rounded-xl shadow hover:bg-gray-800 transition duration-300">
                  {loading ?
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                    </>
                    :
                    <>
                      <button type="submit" className="font-semibold">
                        Save
                      </button>
                    </>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </article>
  );
}

export default MemberRegistration;
