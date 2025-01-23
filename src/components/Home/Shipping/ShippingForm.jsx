// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import Swal from "sweetalert2";
// import { AiOutlineLoading } from "react-icons/ai";

// const ShippingForm = ({
//   setShippingAddress,
//   shippingAddress,
//   isShowModal,
//   setIsShowModal,
// }) => {
//   const [cities, setCities] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [zoneLoading, setZoneLoading] = useState(false);
//   const [areaLoading, setAreaLoading] = useState(false);
//   const [isInputFocused, setIsInputFocused] = useState(false);

//   const [formData, setFormData] = useState({
//     city_id: "",
//     city_name: "",
//     zone_name: "",
//     area_name: "",
//     zone_id: "",
//     area_id: "",
//     special_instruction: "",
//     recipientName: shippingAddress?.recipientName || "",
//     contact_number: shippingAddress?.contactNumber || "",
//     district: shippingAddress?.district || "",
//     area: shippingAddress?.area || "",
//     address: shippingAddress?.address || "",
//     postCode: shippingAddress?.postCode || "",
//     deliveryType: shippingAddress?.deliveryType || "Home",
//   });

//   const [errors, setErrors] = useState({});

//   const axiosSecure = useAxiosSecure();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setIsInputFocused(true);

//     if (name === "city_id") {
//       const filter_name = cities.find(
//         (city) => city.city_id == value
//       ).city_name;

//       console.log(filter_name, "city_name");

//       setFormData({
//         ...formData,
//         city_name: filter_name,
//         city_id: value,
//       });

//       return;
//     } else if (name === "zone_id") {
//       const filter_name = zones.find((zone) => zone.zone_id == value).zone_name;

//       console.log(filter_name, "zone_name");

//       setFormData({
//         ...formData,
//         zone_name: filter_name,
//         zone_id: value,
//       });
//       return;
//     } else if (name === "area_id") {
//       const filter_name = areas.find((area) => area.area_id == value).area_name;

//       console.log(filter_name, "area_name");

//       setFormData({
//         ...formData,
//         area_name: filter_name,
//         area_id: value,
//       });

//       return;
//     }

//     if (name === "contact_number") {
//       value === formData.secondaryContactNumber &&
//         setErrors((prev) => ({
//           ...prev,
//           contact_number:
//             "Secondary Contact Number should not be same as Primary Contact Number",
//         }));
//     }

//     console.log(name, value, "formData");
//     console.log({
//       ...formData,
//       [name]: value,
//     });

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     if (!formData.recipientName)
//       formErrors.recipientName = "Recipient Name is required";
//     if (!formData.contact_number)
//       formErrors.contact_number = "Contact Number is required";
//     if (!formData.city_id) formErrors.city_id = "City selection is required";
//     if (!formData.zone_id) formErrors.zone_id = "City selection is required";
//     if (!formData.area_id) formErrors.area_id = "Area selection is required";
//     if (!formData.address) formErrors.address = "Address is required";
//     if (!formData.postCode) formErrors.postCode = "Post Code is required";

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log(formData, "formData", validateForm());

//     if (validateForm()) {
//       console.log(formData, "formData");

//       localStorage.setItem("shippingAddress", JSON.stringify(formData));
//       setShippingAddress(formData);
//       setFormData({
//         ...formData,
//         recipientName: "",
//         contact_number: "",
//         district: "",
//         area: "",
//         address: "",
//         postCode: "",
//         deliveryType: "Home",
//       });

//       setIsShowModal(false);
//       setIsInputFocused(false);
//       return;

//       // formData.userId = user._id;
//       // formData.email = user.email;
//       // try {
//       //   const response = await axiosSecure.post("/shipping", formData);

//       //   console.log(response, "response");

//       //   if (response.status === 200 || response.status === 201) {
//       //     localStorage.setItem(
//       //       "shippingAddress",
//       //       JSON.stringify(response.data?.data)
//       //     );
//       //     setShippingAddress(response.data?.data);
//       //     setFormData({
//       //       ...formData,
//       //       recipientName: "",
//       //       contact_number: "",
//       //       district: "",
//       //       area: "",
//       //       address: "",
//       //       postCode: "",
//       //       deliveryType: "Home",
//       //     });
//       //     return;
//       //   }
//       // } catch (error) {
//       //   console.error("Error submitting form:", error);
//       //   Swal.fire({
//       //     title: "Error",
//       //     text: "There was an error submitting the form.",
//       //     icon: "error",
//       //     confirmButtonText: "Ok",
//       //     customClass: "border-none",
//       //     buttonsStyling: false,
//       //   });
//       // }
//     }
//   };

//   useEffect(() => {
//     const stringShippingAddress = localStorage.getItem("shippingAddress");
//     const localShippingAddress = stringShippingAddress
//       ? JSON.parse(stringShippingAddress)
//       : null;

//     console.log(localShippingAddress, "localShippingAddress");
//     if (localShippingAddress) {
//       formData.recipientName = localShippingAddress.recipientName;
//       formData.contactNumber = localShippingAddress.contactNumber;
//       formData.district = localShippingAddress.district;
//       formData.area = localShippingAddress.area;
//       formData.address = localShippingAddress.address;
//       formData.postCode = localShippingAddress.postCode;
//       formData.deliveryType = localShippingAddress.deliveryType;
//     }
//   }, [formData]);

//   // useEffect(() => {
//   //   const fetchCities = async () => {
//   //     try {
//   //       const res = await axiosSecure.get("/courier/cities");
//   //       if (res.status === 200 || res.status === 201) {
//   //         setCities(res.data?.data?.data?.data);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching cities:", error);
//   //     }
//   //   };

//   //   fetchCities();
//   // }, [axiosSecure]);

//   // useEffect(() => {
//   //   const fetchZones = async () => {
//   //     if (!formData.city_id) return;
//   //     try {
//   //       setZoneLoading(true);
//   //       const res = await axiosSecure.get(`/courier/zones/${formData.city_id}`);
//   //       if (res.status === 200 || res.status === 201) {
//   //         setZones(res.data?.data?.data?.data);
//   //         setZoneLoading(false);
//   //       }
//   //       setZoneLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching zones:", error);
//   //       setZoneLoading(false);
//   //     }
//   //   };

//   //   fetchZones();
//   // }, [axiosSecure, formData.city_id]);

//   // useEffect(() => {
//   //   const fetchAreas = async () => {
//   //     if (!formData.zone_id) return;
//   //     try {
//   //       setAreaLoading(true);
//   //       const res = await axiosSecure.get(`/courier/area/${formData.zone_id}`);
//   //       if (res.status === 200 || res.status === 201) {
//   //         setAreas(res.data?.data?.data?.data);
//   //         setAreaLoading(false);
//   //       }
//   //       setAreaLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching areas:", error);
//   //       setAreaLoading(false);
//   //     }
//   //   };

//   //   fetchAreas();
//   // }, [axiosSecure, formData.zone_id]);

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const res = await axiosSecure.get("/district");
//         // const res = await axiosSecure.get("/courier/cities");
//         if (res.status === 200 || res.status === 201) {
//           setCities(res.data);
//           // setCities(res.data?.data?.data?.data);
//         }
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       }
//     };

//     fetchCities();
//   }, [axiosSecure, isShowModal]);

//   useEffect(() => {
//     const fetchZones = async () => {
//       if (!formData.city_id) return;
//       try {
//         setZoneLoading(true);
//         // const res = await axiosSecure.get(`/courier/zones/${formData.city_id}`);
//         const res = await axiosSecure.get(`/zones/by_city/${formData.city_id}`);
//         if (res.status === 200 || res.status === 201) {
//           setZones(res.data);
//           // setZones(res.data?.data?.data?.data);
//           setZoneLoading(false);
//         }
//         setZoneLoading(false);
//       } catch (error) {
//         console.error("Error fetching zones:", error);
//         setZoneLoading(false);
//       }
//     };

//     fetchZones();
//   }, [axiosSecure, formData.city_id]);

//   useEffect(() => {
//     const fetchAreas = async () => {
//       if (!formData.zone_id) return;
//       try {
//         setAreaLoading(true);
//         // const res = await axiosSecure.get(`/courier/area/${formData.zone_id}`);
//         const res = await axiosSecure.get(`/areas/by_zone/${formData.zone_id}`);
//         if (res.status === 200 || res.status === 201) {
//           setAreas(res.data?.data?.data?.data);
//           setAreas(res.data);
//           setAreaLoading(false);
//         }
//         setAreaLoading(false);
//       } catch (error) {
//         console.error("Error fetching areas:", error);
//         setAreaLoading(false);
//       }
//     };

//     fetchAreas();
//   }, [axiosSecure, formData.zone_id]);
//   // useEffect(() => {
//   //   if (isShowModal && !isInputFocused) {
//   //     setFormData({
//   //       recipientName: shippingAddress?.recipientName,
//   //       contactNumber: shippingAddress?.contactNumber,
//   //       district: shippingAddress?.district,
//   //       area: shippingAddress?.area,
//   //       address: shippingAddress?.address,
//   //       postCode: shippingAddress?.postCode,
//   //       deliveryType: shippingAddress?.deliveryType,
//   //     });
//   //   }

//   //   console.log(
//   //     isShowModal,
//   //     isShowModal && !isInputFocused,
//   //     isInputFocused,
//   //     "formData"
//   //   );
//   // }, [isShowModal, shippingAddress, isInputFocused]);

//   console.log(formData, "formData");

//   return (
//     <div className="w-full mx-auto mt-6 md:mt-0 p-6 border rounded-md mb-12 bg-white shadow-lg ">
//       <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Recipient Name */}
//           <div>
//             <label className="block font-semibold mb-1">Recipient Name *</label>
//             <input
//               type="text"
//               name="recipientName"
//               value={formData.recipientName}
//               onChange={handleInputChange}
//               placeholder="Full Name"
//               className="border outline-none mt-2 p-2 w-full rounded-lg"
//             />
//             {errors.recipientName && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.recipientName}
//               </p>
//             )}
//           </div>

//           {/* Contact Number */}
//           <div>
//             <label className="block font-semibold mb-1">Contact Number *</label>
//             <input
//               type="text"
//               name="contact_number"
//               value={formData.contact_number}
//               onChange={handleInputChange}
//               placeholder="Mobile Number"
//               className="border outline-none mt-2 p-2 w-full rounded-lg"
//             />
//             {errors.contact_number && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.contact_number}
//               </p>
//             )}
//           </div>
//           {/* <div>
//             <label className="block font-semibold mb-1">
//               Secondary Contact Number *
//             </label>
//             <input
//               type="text"
//               name="secondaryContactNumber"
//               value={formData.secondaryContactNumber}
//               onChange={handleInputChange}
//               placeholder="Mobile Number"
//               className="border outline-none mt-2 p-2 w-full rounded-lg"
//             />
//             {errors.secondaryContactNumber && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.secondaryContactNumber}
//               </p>
//             )}
//           </div> */}

//           {/* District/City */}
//           <div>
//             <label className="block font-semibold mb-1">District/City *</label>
//             <select
//               name="city_id"
//               value={formData.city_id}
//               onChange={handleInputChange}
//               className="border outline-none mt-2 p-2 w-full rounded-lg"
//             >
//               <option value="">Select District/City Name</option>
//               {cities.length > 0 &&
//                 cities.map((item, index) => (
//                   <option key={index} value={item.city_id}>
//                     {item.city_name}
//                   </option>
//                 ))}
//               {/* Add more options as necessary */}
//             </select>
//             {errors.city_id && (
//               <p className="text-red-500 text-sm mt-1">{errors.city_id}</p>
//             )}
//           </div>

//           {/* Area/Thana/Upazilla */}
//           <div>
//             <label className="block font-semibold mb-1">Zone *</label>
//             {!zoneLoading ? (
//               <select
//                 name="zone_id"
//                 value={formData.zone_id}
//                 onChange={handleInputChange}
//                 className="border outline-none mt-2 p-2 w-full rounded-lg"
//               >
//                 <option value="">Select Zone</option>
//                 {zones?.length > 0 &&
//                   zones.map((item, index) => (
//                     <option key={index} value={item.zone_id}>
//                       {item?.zone_name}
//                     </option>
//                   ))}
//                 {/* Add more options as necessary */}
//               </select>
//             ) : (
//               <div className="flex justify-center items-center mt-3 rounded-lg border py-3">
//                 <AiOutlineLoading className="animate-spin text-gray-500" />
//               </div>
//             )}
//             {errors.zone_id && (
//               <p className="text-red-500 text-sm mt-1">{errors.zone_id}</p>
//             )}
//           </div>
//           {/* Area/Thana/Upazilla */}
//           <div>
//             <label className="block font-semibold mb-1">Area *</label>

//             {!areaLoading ? (
//               <select
//                 name="area_id"
//                 value={formData.area_id}
//                 onChange={handleInputChange}
//                 className="border outline-none mt-2 p-2 w-full rounded-lg"
//               >
//                 <option value="">Select Area</option>
//                 {areas?.length > 0 &&
//                   areas.map((item, index) => (
//                     <option key={index} value={item.area_id}>
//                       {item?.area_name}
//                     </option>
//                   ))}
//                 {/* Add more options as necessary */}
//               </select>
//             ) : (
//               <div className="flex justify-center items-center border py-3 mt-3 rounded-lg">
//                 <AiOutlineLoading className="animate-spin text-gray-500" />
//               </div>
//             )}
//             {errors.area_id && (
//               <p className="text-red-500 text-sm mt-1">{errors.area_id}</p>
//             )}
//           </div>

//           {/* Post Code */}
//           <div>
//             <label className="block font-semibold mb-1">Post Code *</label>
//             <input
//               type="text"
//               name="postCode"
//               value={formData.postCode}
//               onChange={handleInputChange}
//               placeholder="Post Code"
//               className="border outline-none mt-2 p-2 w-full rounded-lg"
//             />
//             {errors.postCode && (
//               <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
//             )}
//           </div>

//           {/* Address */}
//           <div className="md:col-span-2">
//             <label className="block font-semibold mb-1">Address *</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="House / Building / Street"
//               className="border outline-none mt-2 p-2 w-full rounded-lg"
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <label className="block font-semibold mb-1">
//               Special Instruction *
//             </label>
//             <textarea
//               type="text"
//               name="special_instruction"
//               value={formData.special_instruction}
//               onChange={handleInputChange}
//               placeholder=" Special Instruction"
//               className="border outline-none mt-2 p-2 w-full rounded-lg min-h-[150px]"
//             />
//             {errors.special_instruction && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.special_instruction}
//               </p>
//             )}
//           </div>

//           {/* Delivery Type */}
//           {/* <div className="md:col-span-2">
//             <label className="block font-semibold mb-1">Select Effective Delivery *</label>
//             <div className="flex items-center space-x-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="deliveryType"
//                   value="Home"
//                   checked={formData.deliveryType === 'Home'}
//                   onChange={handleInputChange}
//                   className="form-radio text-indigo-600"
//                 />
//                 <span className="ml-2">Home</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="deliveryType"
//                   value="Office"
//                   checked={formData.deliveryType === 'Office'}
//                   onChange={handleInputChange}
//                   className="form-radio text-indigo-600"
//                 />
//                 <span className="ml-2">Office</span>
//               </label>
//             </div>
//           </div> */}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ShippingForm;

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
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

  // Individual states for each input field
  const [city_id, setCityId] = useState("");
  const [city_name, setCityName] = useState("");
  const [zone_id, setZoneId] = useState("");
  const [zone_name, setZoneName] = useState("");
  const [area_id, setAreaId] = useState("");
  const [area_name, setAreaName] = useState("");
  const [recipientName, setRecipientName] = useState(
    shippingAddress?.recipientName || ""
  );
  const [contact_number, setContactNumber] = useState(
    shippingAddress?.contact_number || ""
  );
  const [district, setDistrict] = useState(shippingAddress?.district || "");
  const [area, setArea] = useState(shippingAddress?.area || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [postCode, setPostCode] = useState(shippingAddress?.postCode || "");

  const [special_instruction, setSpecialInstruction] = useState("");

  const [errors, setErrors] = useState({});
  const axiosSecure = useAxiosSecure();

  const validateForm = () => {
    let formErrors = {};
    if (!recipientName) formErrors.recipientName = "Recipient Name is required";
    if (!contact_number)
      formErrors.contactNumber = "Contact Number is required";
    if (!city_id) formErrors.cityId = "City selection is required";
    if (!zone_id) formErrors.zoneId = "Zone selection is required";
    if (!area_id) formErrors.areaId = "Area selection is required";
    if (!address) formErrors.address = "Address is required";
    if (!postCode) formErrors.postCode = "Post Code is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  console.log(errors, "errors");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        city_id,
        city_name,
        zone_id,
        zone_name,
        area_id,
        area_name,
        recipientName,
        contact_number,
        district,
        area,
        address,
        postCode,
        special_instruction,
      };

      localStorage.setItem("shippingAddress", JSON.stringify(formData));
      setShippingAddress(formData);
      setIsShowModal(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axiosSecure.get("/district");
        if (res.status === 200 || res.status === 201) {
          setCities(res.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchZones = async () => {
      if (!city_id) return;
      try {
        setZoneLoading(true);
        const res = await axiosSecure.get(`/zones/by_city/${city_id}`);
        if (res.status === 200 || res.status === 201) {
          setZones(res.data);
        }
        setZoneLoading(false);
      } catch (error) {
        console.error("Error fetching zones:", error);
        setZoneLoading(false);
      }
    };

    fetchZones();
  }, [axiosSecure, city_id]);

  useEffect(() => {
    const fetchAreas = async () => {
      if (!zone_id) return;
      try {
        setAreaLoading(true);
        const res = await axiosSecure.get(`/areas/by_zone/${zone_id}`);
        if (res.status === 200 || res.status === 201) {
          setAreas(res.data);
        }
        setAreaLoading(false);
      } catch (error) {
        console.error("Error fetching areas:", error);
        setAreaLoading(false);
      }
    };

    fetchAreas();
  }, [axiosSecure, zone_id]);

  useEffect(() => {
    if (isShowModal) {
      setRecipientName(shippingAddress.recipientName);
      setContactNumber(shippingAddress.contact_number);
      setAddress(shippingAddress.address);
      setCityId(shippingAddress.city_id);
      setCityName(shippingAddress.city_name);
      setZoneId(shippingAddress.zone_id);
      setZoneName(shippingAddress.zone_name);
      setAreaId(shippingAddress.area_id);
      setAreaName(shippingAddress.area_name);
    }

    console.log(isShowModal, "formData");
  }, [isShowModal, shippingAddress]);

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
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
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
              value={contact_number}
              onChange={(e) => setContactNumber(e.target.value)}
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
                    value={secondaryContactNumber}
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
              value={city_id}
              onChange={(e) => {
                const filter_name = cities.find(
                  (city) => city.city_id == e.target.value
                ).city_name;

                console.log(filter_name, "city name");
                setCityId(e.target.value);
                setCityName(filter_name);
              }}
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
                value={zone_id}
                onChange={(e) => {
                  const filter_name = zones.find(
                    (zone) => zone.zone_id == e.target.value
                  ).zone_name;
                  console.log(filter_name, "zone name");
                  setZoneName(filter_name);
                  setZoneId(e.target.value);
                }}
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
          <div
            className={`${
              areas.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <label className="block font-semibold mb-1">Area *</label>

            {!areaLoading ? (
              <select
                name="area_id"
                value={area_id}
                onChange={(e) => {
                  const filter_name = areas.find(
                    (area) => area.area_id == e.target.value
                  ).area_name;
                  console.log(filter_name, "area name");
                  setAreaId(e.target.value);
                  setAreaName(filter_name);
                }}
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
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              value={special_instruction}
              onChange={(e) => setSpecialInstruction(e.target.value)}
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
