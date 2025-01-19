import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useGetAllDistrict from "../../../Hook/GetPublicDataHook/useGetAllDistrict";
import { set } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";

const ShippingForm = ({
  setShippingAddress,
  shippingAddress,
  isShowModal,
  setIsShowModal,
}) => {
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [zoneLoading, setZoneLoading] = useState(false);
  const [areaLoading, setAreaLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipient_name: "",
    contact_number: "",
    secondaryContactNumber: "",
    city_id: "",
    city_name: "",
    zone_name: "",
    area_name: "",
    zone_id: "",
    area_id: "",
    address: "",
    postCode: "",
    special_instruction: "",
  });

  const [errors, setErrors] = useState({});

  const axiosSecure = useAxiosSecure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "city_id") {
      const filter_name = cities.find(
        (city) => city.city_id == value
      ).city_name;

      console.log(filter_name, "city_name");

      setFormData({
        ...formData,
        city_name: filter_name,
        city_id: value,
      });

      return;
    } else if (name === "zone_id") {
      const filter_name = zones.find((zone) => zone.zone_id == value).zone_name;

      console.log(filter_name, "zone_name");

      setFormData({
        ...formData,
        zone_name: filter_name,
        zone_id: value,
      });
      return;
    } else if (name === "area_id") {
      const filter_name = areas.find((area) => area.area_id == value).area_name;

      console.log(filter_name, "area_name");

      setFormData({
        ...formData,
        area_name: filter_name,
        area_id: value,
      });

      return;
    }

    if (name === "contact_number") {
      value === formData.secondaryContactNumber &&
        setErrors((prev) => ({
          ...prev,
          contact_number:
            "Secondary Contact Number should not be same as Primary Contact Number",
        }));
    }

    console.log(name, value);
    console.log({
      ...formData,
      [name]: value,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.recipientName)
      formErrors.recipientName = "Recipient Name is required";
    if (!formData.contactNumber)
      formErrors.contactNumber = "Contact Number is required";
    if (!formData.city_id) formErrors.city_id = "City selection is required";
    if (!formData.zone_id) formErrors.zone_id = "City selection is required";
    if (!formData.area_id) formErrors.area_id = "Area selection is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.postCode) formErrors.postCode = "Post Code is required";
    if (!formData.secondaryContactNumber)
      formErrors.secondaryContactNumber =
        "Secondary Contact Number is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData, "formData", validateForm());

    if (validateForm()) {
      if (shippingAddress) {
        console.log(formData, "formData");

        localStorage.setItem("shippingAddress", JSON.stringify(formData));
        setShippingAddress(formData);
        setFormData({
          ...formData,
          recipientName: "",
          contactNumber: "",
          district: "",
          area: "",
          address: "",
          postCode: "",
          deliveryType: "Home",
        });

        setIsShowModal(false);
        return;
      }

      // formData.userId = user._id;
      // formData.email = user.email;
      try {
        const response = await axiosSecure.post("/shipping", formData);

        console.log(response, "response");

        if (response.status === 200 || response.status === 201) {
          localStorage.setItem(
            "shippingAddress",
            JSON.stringify(response.data?.data)
          );
          setShippingAddress(response.data?.data);
          setFormData({
            ...formData,
            recipientName: "",
            contactNumber: "",
            district: "",
            area: "",
            address: "",
            postCode: "",
            deliveryType: "Home",
          });
          return;
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error submitting the form.",
          icon: "error",
          confirmButtonText: "Ok",
          customClass: "border-none",
          buttonsStyling: false,
        });
      }
    }
  };

  useEffect(() => {
    const stringShippingAddress = localStorage.getItem("shippingAddress");
    const localShippingAddress = stringShippingAddress
      ? JSON.parse(stringShippingAddress)
      : null;

    console.log(localShippingAddress, "localShippingAddress");
    if (localShippingAddress) {
      formData.recipientName = localShippingAddress.recipientName;
      formData.contactNumber = localShippingAddress.contactNumber;
      formData.district = localShippingAddress.district;
      formData.area = localShippingAddress.area;
      formData.address = localShippingAddress.address;
      formData.postCode = localShippingAddress.postCode;
      formData.deliveryType = localShippingAddress.deliveryType;
    }
  }, [formData]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosSecure.get("/courier/cities");
        if (res.status === 200 || res.status === 201) {
          setCities(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchZones = async () => {
      if (!formData.city_id) return;
      try {
        setZoneLoading(true);
        const res = await axiosSecure.get(`/courier/zones/${formData.city_id}`);
        if (res.status === 200 || res.status === 201) {
          setZones(res.data?.data?.data?.data);
          setZoneLoading(false);
        }
        setZoneLoading(false);
      } catch (error) {
        console.error("Error fetching zones:", error);
        setZoneLoading(false);
      }
    };

    fetchZones();
  }, [axiosSecure, formData.city_id]);

  useEffect(() => {
    const fetchAreas = async () => {
      if (!formData.zone_id) return;
      try {
        setAreaLoading(true);
        const res = await axiosSecure.get(`/courier/area/${formData.zone_id}`);
        if (res.status === 200 || res.status === 201) {
          setAreas(res.data?.data?.data?.data);
          setAreaLoading(false);
        }
        setAreaLoading(false);
      } catch (error) {
        console.error("Error fetching areas:", error);
        setAreaLoading(false);
      }
    };

    fetchAreas();
  }, [axiosSecure, formData.zone_id]);

  useEffect(() => {
    if (isShowModal) {
      setFormData(shippingAddress);
    }
  }, [isShowModal, shippingAddress]);

  console.log(errors, "errors");

  return (
    <div className="w-full mx-auto mt-6 md:mt-0 p-6 border rounded-md mb-12 bg-white shadow-lg ">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recipient Name */}
          <div>
            <label className="block font-semibold mb-1">Recipient Name *</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.recipientName}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block font-semibold mb-1">Contact Number *</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact_number}
              </p>
            )}
          </div>
          {/* <div>
            <label className="block font-semibold mb-1">
              Secondary Contact Number *
            </label>
            <input
              type="text"
              name="secondaryContactNumber"
              value={formData.secondaryContactNumber}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
            />
            {errors.secondaryContactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.secondaryContactNumber}
              </p>
            )}
          </div> */}

          {/* District/City */}
          <div>
            <label className="block font-semibold mb-1">District/City *</label>
            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleInputChange}
              className="border outline-none mt-2 p-2 w-full rounded-lg"
            >
              <option value="">Select District/City Name</option>
              {cities.length > 0 &&
                cities.map((item, index) => (
                  <option key={index} value={item.city_id}>
                    {item.city_name}
                  </option>
                ))}
              {/* Add more options as necessary */}
            </select>
            {errors.city_id && (
              <p className="text-red-500 text-sm mt-1">{errors.city_id}</p>
            )}
          </div>

          {/* Area/Thana/Upazilla */}
          <div>
            <label className="block font-semibold mb-1">Zone *</label>
            {!zoneLoading ? (
              <select
                name="zone_id"
                value={formData.zone_id}
                onChange={handleInputChange}
                className="border outline-none mt-2 p-2 w-full rounded-lg"
              >
                <option value="">Select Zone</option>
                {zones?.length > 0 &&
                  zones.map((item, index) => (
                    <option key={index} value={item.zone_id}>
                      {item?.zone_name}
                    </option>
                  ))}
                {/* Add more options as necessary */}
              </select>
            ) : (
              <div className="flex justify-center items-center mt-3 rounded-lg border py-3">
                <AiOutlineLoading className="animate-spin text-gray-500" />
              </div>
            )}
            {errors.zone_id && (
              <p className="text-red-500 text-sm mt-1">{errors.zone_id}</p>
            )}
          </div>
          {/* Area/Thana/Upazilla */}
          <div>
            <label className="block font-semibold mb-1">Area *</label>

            {!areaLoading ? (
              <select
                name="area_id"
                value={formData.area_id}
                onChange={handleInputChange}
                className="border outline-none mt-2 p-2 w-full rounded-lg"
              >
                <option value="">Select Area</option>
                {areas?.length > 0 &&
                  areas.map((item, index) => (
                    <option key={index} value={item.area_id}>
                      {item?.area_name}
                    </option>
                  ))}
                {/* Add more options as necessary */}
              </select>
            ) : (
              <div className="flex justify-center items-center border py-3 mt-3 rounded-lg">
                <AiOutlineLoading className="animate-spin text-gray-500" />
              </div>
            )}
            {errors.area_id && (
              <p className="text-red-500 text-sm mt-1">{errors.area_id}</p>
            )}
          </div>

          {/* Post Code */}
          <div>
            <label className="block font-semibold mb-1">Post Code *</label>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              placeholder="Post Code"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="House / Building / Street"
              className="border outline-none mt-2 p-2 w-full rounded-lg"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">
              Special Instruction *
            </label>
            <textarea
              type="text"
              name="special_instruction"
              value={formData.special_instruction}
              onChange={handleInputChange}
              placeholder=" Special Instruction"
              className="border outline-none mt-2 p-2 w-full rounded-lg min-h-[150px]"
            />
            {errors.special_instruction && (
              <p className="text-red-500 text-sm mt-1">
                {errors.special_instruction}
              </p>
            )}
          </div>

          {/* Delivery Type */}
          {/* <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Select Effective Delivery *</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="deliveryType"
                  value="Home"
                  checked={formData.deliveryType === 'Home'}
                  onChange={handleInputChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Home</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="deliveryType"
                  value="Office"
                  checked={formData.deliveryType === 'Office'}
                  onChange={handleInputChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Office</span>
              </label>
            </div>
          </div> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
