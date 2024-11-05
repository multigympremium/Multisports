"use client";
import DragUploadImageInput from "@/components/shared/DragUploadImageInput";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function CreateBannerForm({ setIsShow }) {
  // State management for form fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [file_key, setFile_key] = useState(null);
  const [file_url, setFile_url] = useState(null);
  const [progress, setProgress] = useState(0);

  const axiosSecure = useAxiosSecure();

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
    formData.append("subtitle", subtitle);
    formData.append("shortDescription", shortDescription);
    formData.append("image", thumbnail);
    try {
      const res = await axiosSecure.post("/banners", formData);

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        localStorage.removeItem("file_key");
        setFile_key(null);
        setIsShow(false);
        setThumbnail(null);
        setThumbnailPreview(null);
        setTitle("");
        setSubtitle("");
        setShortDescription("");
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
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Banner Entry Form */}
      <h1 className="text-2xl font-bold mb-4">Create Banner Form</h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Left Column - Image Upload */}
        <div className="relative">
          <label className="block text-gray-700 mb-2">Banner Image *</label>
          <DragUploadImageInput
            getRootProps={getThumbnailRootProps}
            getInputProps={getThumbnailInputProps}
            image={thumbnail}
            imagePreview={thumbnailPreview}
          />

          {progress > 0 && progress < 100 && (
            <div className="w-full h-full absolute top-0 left-0 text-white gap-4 bg-black bg-opacity-50 font-bold text-xl flex justify-center items-center">
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
            <label className="block text-gray-700">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Subtitle *</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Short Description *</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
