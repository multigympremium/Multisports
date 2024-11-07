"use client";
import DragUploadImageInput from "@/components/shared/DragUploadImageInput";
import DeleteCloudImage from "@/config/DeleteCloudImage/DeleteCloudImage";
import UploadFile from "@/config/Upload/UploadFile";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function CreateTestimonialsForm() {
  // State management for form fields
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [designation, setDesignation] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
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
    setLoading(true);
    const newTestimonial = {
      customerName,
      designation,
      rating,
      description,
      image: file_url?.url,
      key: file_key,
    };

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("designation", designation);
    formData.append("rating", rating);
    formData.append("description", description);
    formData.append("image", thumbnail);
    try {
      const res = await axiosSecure.post("/testimonials", formData);

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        toast.success("Testimonial created successfully");
        localStorage.removeItem("file_key");
        setFile_key(null);
        setCustomerName("");
        setDesignation("");
        setRating("");
        setDescription("");
        setThumbnailPreview("");
        setThumbnail(null);

      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong !");
    } finally {
      setLoading(false);
    }

    // Clear form fields
    // setCustomerName("");
    // setDesignation("");
    // setRating("");
    // setDescription("");
    // setThumbnailPreview("");
    // setThumbnail(null);
  };

  return (
    <div className="container mx-auto py-2">
      {/* Testimonial Entry Form */}
      <h1 className="text-2xl font-semibold mb-8">Testimonial Entry Form</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Customer Name </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="globalInput mt-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="globalInput mt-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Rating </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="globalInput mt-2"
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
            <label className="block text-gray-700">Description </label>
            <textarea
              value={description}

              onChange={(e) => setDescription(e.target.value)}
              className="globalInput mt-2 resize-none min-h-[50px]"
              required
            ></textarea>
          </div>
        </div>
        {/* Left Column - Image Upload */}
        <div className="relative my-4">
          <label className="block text-gray-700 mb-2">Customer Image</label>
          <DragUploadImageInput
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

        {/* Save Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full btn bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600"
          >
            {!loading ? <span>Save Testimonial</span> : <span className="flex items-center gap-2">Saving .. <span className="loading loading-spinner loading-sm"></span></span>}
          </button>
        </div>
      </form>

      {/* Display Testimonials */}
      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Saved Testimonials</h2>
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border p-4 rounded">
              <div className="flex space-x-4">
                {testimonial.image && (
                  <Image
                    width={400}
                    height={400}
                    src={testimonial.image}
                    alt={testimonial.customerName}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold">
                    {testimonial.customerName}
                  </h3>
                  <p>{testimonial.designation}</p>
                  <p>Rating: {testimonial.rating} Stars</p>
                  <p>{testimonial.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
