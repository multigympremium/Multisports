"use client";
import DragUploadImageInput from "../../../shared/DragUploadImageInput";

import useGetAllCategories from "../../../Hook/GetDataHook/useGetAllCategories";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function SubcategoryCreateForm() {
  const [category, setCategory] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryIcon, setSubcategoryIcon] = useState(null);
  const [subcategoryIconPreview, setSubcategoryIconPreview] = useState("");
  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [subcategoryImagePreview, setSubcategoryImagePreview] = useState("");
  const categories = useGetAllCategories({});
  const [slug, setSlug] = useState("");
  const axiosSecure = useAxiosSecure();

  const onDropIcon = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);

    // Set the state with the URL
    setSubcategoryIconPreview(previewUrl);

    setSubcategoryIcon(acceptedFiles[0]);
  };

  const onDropImage = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setSubcategoryImagePreview(previewUrl);
    setSubcategoryImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(category, subcategoryName, subcategoryIcon, subcategoryImage);

    const formData = new FormData();

    formData.append("category", category);
    formData.append("subcategoryName", subcategoryName);
    if (subcategoryIcon) formData.append("subcategoryIcon", subcategoryIcon);
    if (subcategoryImage) formData.append("subcategoryImage", subcategoryImage);
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.post("/subcategories", formData);

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category created successfully",
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

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      onDrop: onDropImage,
      accept: "image/*",
      multiple: false,
    });

  const handleSubcategoryNameInput = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setSubcategoryName(input);
  };

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Subcategory Create Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Select Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value={""} selected disabled>
                Select Category
              </option>
              {categories?.map((category, index) => (
                <option key={index} value={category?.slug}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name *</label>
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => handleSubcategoryNameInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Subcategory Title"
              required
            />
          </div>

          {/* slug Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlug(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Subcategory Title"
              required
            />
          </div>

          {/* Subcategory Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Subcategory Icon
            </label>
            {/* <div
              {...getIconRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getIconInputProps()} />
              {subcategoryIcon ? (
                <>
                  <img
                    src={subcategoryIconPreview}
                    alt="subcategoryIcon"
                    width={200}
                    height={200}
                  />
                  <p>{subcategoryIcon.name}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div> */}

            <DragUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={subcategoryIcon}
              imagePreview={subcategoryIconPreview}
            />
          </div>

          {/* Subcategory Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Subcategory Image
            </label>
            {/* <div
              {...getImageRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getImageInputProps()} />
              {subcategoryImage ? (
                <>
                  <img
                    src={subcategoryImagePreview}
                    alt="subcategoryImage"
                    width={200}
                    height={200}
                  />
                  <p>{subcategoryImage.name}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div> */}

            <DragUploadImageInput
              getRootProps={getImageRootProps}
              getInputProps={getImageInputProps}
              image={subcategoryImage}
              imagePreview={subcategoryImagePreview}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
