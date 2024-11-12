"use client";
import CustomEditor from "../../../../shared/CustomEditor/CustomEditor";
import DragEditUploadImageInput from "../../../../shared/DragEditUploadImageInput";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function MissionSection({
}) {
  // State management for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [targetId, setTargetId] = useState("");

  const axiosSecure = useAxiosSecure();

  // Fetch existing testimonial for editing
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axiosSecure.get(`/about-mission/${targetId}`);

        if(res.status === 200 || res.status === 201) {
            
            const data = res?.data?.data[0];
    
            // Set form values with the testimonial data
            setTitle(data?.title);
            setDescription(data?.description);
            setThumbnailPreview(data?.image); //
            setTargetId(data?._id)
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

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

  console.log({title, description, thumbnail});
  


  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", thumbnail);

  
  try {

      if(targetId){
          const res = await axiosSecure.put(
            `/about-mission/${targetId}`,
            formData
          );
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "About Mission updated successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
          
      }else {
         const res = await axiosSecure.post(
              `/about-mission`,
              formData
          );
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "About Mission Created successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }

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
            setValue={setDescription}
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
