"use client";
import CustomEditor from "@/components/shared/CustomEditor/CustomEditor";
import DragEditUploadImageInput from "@/components/shared/DragEditUploadImageInput";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function MissionSection({
  testimonialId,
  isShow,
  setIsShow,
}) {
  // State management for form fields
  const [title, setTitle] = useState("");
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
        const res = await axiosSecure.get(`/about-vision/${testimonialId}`);
        const data = res?.data?.data;

        // Set form values with the testimonial data
        setTitle(data?.title);
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
    formData.append("title", title);
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
    <div className="w-full bg-white  p-8 rounded-md">
      {/* Testimonial Edit Form */}
      <h1 className="text-2xl font-bold mb-4">Mission Section</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-8" > 
        {/* Left Column - Image Upload */}
        <div className="relative">
          <label className="block text-gray-700 mb-2">Image *</label>
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
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700">title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700">Description *</label>
            <CustomEditor
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded min-h-[250px]"
              required
             />


          </div>
        </div>


        </div>
        <div className="flex justify-end w-full">
          <button
            type="submit"
            className=" max-w-[200px]  bg-blue-500 text-white p-2 rounded ml-auto"
          >
            Save Changes
          </button>
        </div>
        {/* Save Button */}
      </form>
    </div>
  );
}
