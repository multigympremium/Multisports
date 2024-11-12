

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

// Zod schema for form validation
const schema = z.object({
  company_name: z.string().nonempty("Company Name is required"),
  phone: z.string().nonempty("Phone Number is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  description: z.string().nonempty("Short Description is required"),
  address: z.string().nonempty("Company Address is required"),
  google_map_link: z.string().optional(),
  play_store_link: z.string().optional(),
  app_store_link: z.string().optional(),
  trade_license: z.string().nonempty("Trade License No is required"),
  tin_no: z.string().nonempty("TIN No is required"),
  bin_no: z.string().nonempty("BIN No is required"),
  footer_copyright: z.string().nonempty("Footer Text is required"),
});

const GeneralInfoForm = () => {
  const axiosSecure = useAxiosSecure();
  const [targetId, setTargetId] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
  
      if(targetId){
          const res = await axiosSecure.put(
            `/general-info/${targetId}`,
            data
          );
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "About Us updated successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
          
      }else {
         const res = await axiosSecure.post(
              `/general-info`,
              data
          );
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "About Us Created successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }

      }

   

  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: err.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axiosSecure.get(`/general-info/${targetId}`);

        if(res.status === 200 || res.status === 201) {
            
            const data = res?.data?.data[0];
    
            // Set form values with the testimonial data
            for(let key in data){
                setValue(key, data[key]);
            }
            setTargetId(data?._id)
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);



  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section 1: General Information */}
      <h2 className="text-2xl font-bold mb-4">General Information Form</h2>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name *
        </label>
        <input
          type="text"
          {...register("company_name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.company_name && (
          <span className="text-red-600 text-sm">
            {errors.company_name.message}
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number *
        </label>
        <input
          type="text"
          {...register("phone")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.phone && (
          <span className="text-red-600 text-sm">{errors.phone.message}</span>
        )}
      </div>

      {/* Company Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Email *
        </label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.email && (
          <span className="text-red-600 text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Short Description *
        </label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.description && (
          <span className="text-red-600 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Company Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Address *
        </label>
        <input
          type="text"
          {...register("address")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.address && (
          <span className="text-red-600 text-sm">
            {errors.address.message}
          </span>
        )}
      </div>

      {/* Google Map Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Google Map Link
        </label>
        <input
          type="text"
          {...register("google_map_link")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.google_map_link && (
          <span className="text-red-600 text-sm">
            {errors.google_map_link.message}
          </span>
        )}
      </div>

      {/* Play Store Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Play Store Link
        </label>
        <input
          type="text"
          {...register("play_store_link")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.play_store_link && (
          <span className="text-red-600 text-sm">
            {errors.play_store_link.message}
          </span>
        )}
      </div>

      {/* Section 2: Social Media Links */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Social Media Links</h2>

      {/* App Store Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          App Store Link
        </label>
        <input
          type="text"
          {...register("app_store_link")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.app_store_link && (
          <span className="text-red-600 text-sm">
            {errors.app_store_link.message}
          </span>
        )}
      </div>

      {/* Trade License No */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Trade License No *
        </label>
        <input
          type="text"
          {...register("trade_license")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.trade_license && (
          <span className="text-red-600 text-sm">
            {errors.trade_license.message}
          </span>
        )}
      </div>

      {/* TIN No */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          TIN No *
        </label>
        <input
          type="text"
          {...register("tin_no")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.tin_no && (
          <span className="text-red-600 text-sm">{errors.tin_no.message}</span>
        )}
      </div>

      {/* BIN No */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          BIN No *
        </label>
        <input
          type="text"
          {...register("bin_no")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.bin_no && (
          <span className="text-red-600 text-sm">{errors.bin_no.message}</span>
        )}
      </div>

      {/* Footer Copyright Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Footer Copyright Text *
        </label>
        <input
          type="text"
          {...register("footer_copyright")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border px-3"
        />
        {errors.footer_copyright && (
          <span className="text-red-600 text-sm">
            {errors.footer_copyright.message}
          </span>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Info
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GeneralInfoForm;
