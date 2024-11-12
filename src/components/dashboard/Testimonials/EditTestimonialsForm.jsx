"use client";
import DragEditUploadImageInput from "../../../shared/DragEditUploadImageInput";


import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function EditTestimonialsForm({
  testimonialId,
  isShow,
  setIsShow,
}) {
  // State management for form fields
  const [customerName, setCustomerName] = useState("");
  const [designation, setDesignation] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [file_key, setFile_key] = useState(null);
  const [file_url, setFile_url] = useState(null);
  const [progress, setProgress] = useState(0);

  const axiosSecure = useAxiosSecure();

  // Fetch existing testimonial for editing
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axiosSecure.get(`/testimonials/${testimonialId}`);
        const data = res?.data?.data;

        // Set form values with the testimonial data
        setCustomerName(data?.customerName);
        setDesignation(data?.designation);
        setRating(data?.rating);
        setDescription(data?.description);
        setThumbnailPreview(data?.image); // Show the existing image
        setFile_url(data?.image); // Use the existing image URL
        setFile_key(data?.key);
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [testimonialId, axiosSecure, isShow]);

  // Dropzone for thumbnail upload
  const onDropThumbnail = (acceptedFiles) => {
    // Set the state with the URL

    const thumbnailPreview = URL.createObjectURL(acceptedFiles[0]);

    setThumbnailPreview(thumbnailPreview);


    setThumbnail(acceptedFiles[0]);
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: "image/*",
    multiple: false,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    


    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("designation", designation);
    formData.append("rating", rating);
    formData.append("description", description);
    formData.append("image", thumbnail);

    
    try {
      const res = await axiosSecure.put(
        `/testimonials/${testimonialId}`,
        formData
      );

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Testimonial updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        localStorage.removeItem("file_key");
        setFile_key(null);
        setThumbnailPreview(null);
        setThumbnail(null);
        setIsShow(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="w-full max-w-[60%] bg-white mx-auto p-8 shadow-md rounded-md">
      {/* Testimonial Edit Form */}
      <h1 className="text-2xl font-bold mb-4">Edit Testimonial Form</h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Left Column - Image Upload */}
        <div className="relative">
          <label className="block text-gray-700 mb-2">Customer Image *</label>
          <DragEditUploadImageInput
            getRootProps={getThumbnailRootProps}
            getInputProps={getThumbnailInputProps}
            image={thumbnail}
            imagePreview={thumbnailPreview}
          />

          {progress > 0 && progress < 100 && (
            <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 font-bold text-xl flex justify-center items-center">
              <progress
                className="progress progress-accent w-56"
                value={progress}
                max="100"
              ></progress>
              {Math.floor(progress)}%
            </div>
          )}
        </div>

        {/* Right Column - Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Customer Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Rating *</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select One</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded min-h-[250px]"
              required
            ></textarea>
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
