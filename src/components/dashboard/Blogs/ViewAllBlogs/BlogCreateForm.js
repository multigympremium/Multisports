"use client";
import CustomEditor from "@/components/shared/CustomEditor/CustomEditor";
import DragUploadImageInput from "@/components/shared/DragUploadImageInput";
import useGetAllBlogCategories from "@/Hook/GetDataHook/useGetAllBlogCategories";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { set } from "mongoose";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function BlogCreateForm() {
  const axiosSecure = useAxiosSecure();
  const [writer, setWriter] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");

  const BlogCategories = useGetAllBlogCategories({});

    const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");

  const onDropIcon = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);

    // Set the state with the URL
    setThumbnailPreview(previewUrl);

    setThumbnail(acceptedFiles[0]);
  };

  const onDropBanner = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setBlogBannerImagePreview(previewUrl);
    setBlogBanner(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    

   

    const formData = new FormData();

    formData.append("writer", writer);
    formData.append("blogCategory", blogCategory);
    formData.append("shortDescription", shortDescription);
    formData.append("fullDescription", fullDescription);
    formData.append("image", thumbnail);
    formData.append("title", title);
    formData.append("metaTitle", metaTitle);
    formData.append("metaKeywords", metaKeywords);
    formData.append("metaDescription", metaDescription);

    try {
      const res = await axiosSecure.post("/blog", formData);

      console.log(res);
      handleCloseModal();

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Blog created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
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

  const { getRootProps: getIconRootProps, getInputProps: getIconInputProps } =
    useDropzone({
      onDrop: onDropIcon,
      accept: "image/*",
      multiple: false,
    });

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: onDropBanner,
    accept: "image/*",
    multiple: false,
  });



  const handleCloseModal = () => {
    setWriter("");
    setBlogCategory(null);
    setSlug("");
    setTitle("");
    setShortDescription("");
    setFullDescription("");
    setMetaTitle("");
    setMetaKeywords("");
    setMetaDescription("");
    setThumbnail(null);
    setThumbnailPreview("");

  };

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setTitle(input);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Blog Create Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Blog Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name *</label>
            <input
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Blog Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">title *</label>
            <input
              type="text"
              value={title}
              className="w-full p-2 border rounded-md"
              placeholder="Blog Name"
              required
              onChange={(e) => handleSlug(e.target.value)}
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              className="w-full p-2 border rounded-md"
              placeholder="Slug"
              required
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          {/*  Blog Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
               Blog Category
            </label>
            <select
              value={blogCategory}
              onChange={(e) => setBlogCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select One</option>
              {BlogCategories.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
             
          </div>

          {/* Blog Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Blog Thumbnail
            </label>
            <DragUploadImageInput
            getRootProps={getIconRootProps}
            getInputProps={getIconInputProps}
            image={thumbnail}
            imagePreview={thumbnailPreview}
          />
          </div>

        

          

          <div className="mb-[4rem]">
              <label className="block text-gray-700 text-2xl font-bold mb-6">
                Short Description
              </label>

              <CustomEditor
                value={shortDescription}
                setValue={setShortDescription}
              />
            </div>
          <div className="mb-[4rem]">
              <label className="block text-gray-700 text-2xl font-bold mb-6">
                Full Description
              </label>

              <CustomEditor
                value={fullDescription}
                setValue={setFullDescription}
              />
            </div>


            {/* SEO Information */}
          <div className="mb-4 mt-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-300">
               SEO Information (Optional)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 font-bold mb-2">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
