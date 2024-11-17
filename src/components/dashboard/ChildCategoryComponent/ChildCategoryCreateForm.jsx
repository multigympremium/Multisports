"use client";
import DragUploadImageInput from "../../../shared/DragUploadImageInput";

import useGetAllCategories from "../../../Hook/GetDataHook/useGetAllCategories";
import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function ChildCategoryCreateForm() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");
  const [childCategoryIcon, setChildCategoryIcon] = useState(null);
  const [childCategoryIconPreview, setChildCategoryIconPreview] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({});
  
  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({ query: `category=${category}` });

  const axiosSecure = useAxiosSecure();

  // Maximum allowed file size in bytes (e.g., 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        icon: "File size exceeds 5MB limit",
      }));
      return;
    }

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setChildCategoryIconPreview(previewUrl);
    setChildCategoryIcon(file);
    setErrors((prevErrors) => {
      const { icon, ...rest } = prevErrors; // Remove any existing icon error
      return rest;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({});

    // Basic validation for required fields
    let validationErrors = {};

    if (!category) validationErrors.category = "Category is required.";
    if (!subcategory) validationErrors.subcategory = "Subcategory is required.";
    if (!childCategoryName) validationErrors.childCategoryName = "Child Category Name is required.";
    if (!slug) validationErrors.slug = "Slug is required.";
    if (!childCategoryIcon) validationErrors.childCategoryIcon = "Child Category Icon is required.";
    if (childCategoryIcon && childCategoryIcon.size > MAX_FILE_SIZE) {
      validationErrors.icon = "File size exceeds 5MB limit.";
    }

    // If there are validation errors, update the state and prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create FormData and append values
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("childCategoryName", childCategoryName);
    formData.append("image", childCategoryIcon);
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.post("/child-categories", formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });

        // Reset form fields after successful submission
        setCategory("");
        setSubcategory("");
        setChildCategoryName("");
        setChildCategoryIcon(null);
        setChildCategoryIconPreview("");
        setSlug("");
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

  const handleSubcategoryNameInput = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setChildCategoryName(input);
  };

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Child Category Create Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Select Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Select Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
              
            >
              <option value="">Select One</option>
              {categories?.length > 0 &&
                categories.map((item, index) => (
                  <option value={item.slug} key={item._id}>
                    {item?.categoryName}
                  </option>
                ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>

          {/* Select Subcategory */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Select Subcategory *</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full p-2 border rounded-md"
              
            >
              <option value="">Select One</option>
              {subcategories?.length > 0 &&
                subcategories.map((item, index) => (
                  <option value={item.slug} key={item._id}>
                    {item?.subcategoryName}
                  </option>
                ))}
            </select>
            {errors.subcategory && <p className="text-red-500 text-xs">{errors.subcategory}</p>}
          </div>

          {/* Child Category Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name *</label>
            <input
              type="text"
              value={childCategoryName}
              onChange={(e) => handleSubcategoryNameInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Child Category Title"
              
            />
            {errors.childCategoryName && (
              <p className="text-red-500 text-xs">{errors.childCategoryName}</p>
            )}
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlug(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Subcategory Title"
              
            />
            {errors.slug && <p className="text-red-500 text-xs">{errors.slug}</p>}
          </div>

          {/* Child Category Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Child Category Icon</label>
            <DragUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={childCategoryIcon}
              imagePreview={childCategoryIconPreview}
            />
            {errors.icon && <p className="text-red-500 text-xs">{errors.icon}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Child Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
