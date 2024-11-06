"use client";
import CustomEditor from "@/components/shared/CustomEditor/CustomEditor";
import DragEditUploadImageInput from "@/components/shared/DragEditUploadImageInput";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { get, set } from "mongoose";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function AboutUsSection({
  testimonialId,
  isShow,
  setIsShow,
}) {
  // State management for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [sideImagePreview, setSideImagePreview] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [targetId, setTargetId] = useState("");

  const axiosSecure = useAxiosSecure();

  // Fetch existing testimonial for editing
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axiosSecure.get(`/about-us/${targetId}`);

        if(res.status === 200 || res.status === 201) {
            
            const data = res?.data?.data[0];
    
            // Set form values with the testimonial data
            setTitle(data?.title);
            setDescription(data?.description);
            setSideImagePreview(data?.sideImage); //
            setBannerImagePreview(data?.bannerImage); //
            setTargetId(data?._id)
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

  // Dropzone for thumbnail upload
  const onDropBanner = (acceptedFiles) => {
    // Set the state with the URL

    const bannerImagePreview = URL.createObjectURL(acceptedFiles[0]);

    setBannerImagePreview(bannerImagePreview);


    setBannerImage(acceptedFiles[0]);
  };


  // Dropzone for thumbnail upload
  const onDropSideImage = (acceptedFiles) => {
    // Set the state with the URL

    const sideImagePreview = URL.createObjectURL(acceptedFiles[0]);

    setSideImagePreview(sideImagePreview);


    setSideImage(acceptedFiles[0]);
  };

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: onDropBanner,
    accept: "image/*",
    multiple: false,
  });


  const {
    getRootProps: getSideImageRootProps,
    getInputProps: getSideImageInputProps,
  } = useDropzone({
    onDrop: onDropSideImage,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log({title, description, thumbnail});
    
  
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sideImage", sideImage);
    formData.append("bannerImage", bannerImage);
  
    
    try {
  
        if(targetId){
            const res = await axiosSecure.put(
              `/about-us/${targetId}`,
              formData
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
                `/about-us`,
                formData
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
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="w-full bg-white  p-8 rounded-md">
      {/* Testimonial Edit Form */}
      <h1 className="text-2xl font-bold mb-4">About Section</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-8" > 
        {/* Left Column - Image Upload */}
        <div className="relative">
          <label className="block text-gray-700 mb-2">Banner Image *</label>
          <DragEditUploadImageInput
            getRootProps={getBannerRootProps}
            getInputProps={getBannerInputProps}
            image={bannerImage}
            imagePreview={bannerImagePreview}
          />

         
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-2">Side Image *</label>
          <DragEditUploadImageInput
            getRootProps={getSideImageRootProps}
            getInputProps={getSideImageInputProps}
            image={sideImage}
            imagePreview={sideImagePreview}
          />

         
        </div>

        {/* Right Column - Form Inputs */}
        <div className="space-y-4 mb-6 col-span-full">
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
          
        </div>
          <div className="mb-8 col-span-full">
            <label className="block text-gray-700">Description *</label>
            <CustomEditor
              value={description}
              setValue={setDescription}
              className="w-full p-2 border rounded min-h-[250px]"
              required
             />


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
