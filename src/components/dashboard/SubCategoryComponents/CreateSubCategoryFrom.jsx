"use client";
import DragUploadImageInput from "../../../shared/DragUploadImageInput";
import useGetAllCategories from "../../../Hook/GetDataHook/useGetAllCategories";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function SubcategoryCreateForm() {
  const [category, setCategory] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryIcon, setSubcategoryIcon] = useState(null);
  const [subcategoryIconPreview, setSubcategoryIconPreview] = useState("");
  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [subcategoryImagePreview, setSubcategoryImagePreview] = useState("");
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({});
  const categories = useGetAllCategories({});
  const axiosSecure = useAxiosSecure();

  const validateFields = () => {
    const newErrors = {};

    // Validate category
    if (!category) {
      newErrors.category = "Category is required.";
    }

    // Validate subcategory name
    if (!subcategoryName.trim()) {
      newErrors.subcategoryName = "Subcategory name is required.";
    } else if (subcategoryName.length < 3) {
      newErrors.subcategoryName =
        "Subcategory name must be at least 3 characters.";
    }

    // Validate slug
    if (!slug.trim()) {
      newErrors.slug = "Slug is required.";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
      newErrors.slug = "Slug can only contain letters, numbers, dashes, and underscores.";
    }

    // Validate icon file
    if (subcategoryIcon && subcategoryIcon.size > 2 * 1024 * 1024) {
      newErrors.subcategoryIcon = "Icon file size must be less than 2MB.";
    }

    // Validate image file
    if (subcategoryImage && subcategoryImage.size > 2 * 1024 * 1024) {
      newErrors.subcategoryImage = "Image file size must be less than 2MB.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSubcategoryIconPreview(URL.createObjectURL(file));
      setSubcategoryIcon(file);
    }
  };

  const onDropImage = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSubcategoryImagePreview(URL.createObjectURL(file));
      setSubcategoryImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategoryName", subcategoryName);
    if (subcategoryIcon) formData.append("subcategoryIcon", subcategoryIcon);
    if (subcategoryImage) formData.append("subcategoryImage", subcategoryImage);
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.post("/subcategories", formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Subcategory created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
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
    const sanitizedInput = input.replace(/[^a-zA-Z0-9 ]/g, "");
    setSubcategoryName(sanitizedInput);
    setSlug(sanitizedInput.toLowerCase().replace(/\s+/g, "-"));
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
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories?.map((cat, index) => (
                <option key={index} value={cat?.slug}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Subcategory Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Subcategory Name *
            </label>
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => handleSubcategoryNameInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Subcategory Name"
            />
            {errors.subcategoryName && (
              <p className="text-red-500 text-sm">{errors.subcategoryName}</p>
            )}
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Slug"
            />
            {errors.slug && (
              <p className="text-red-500 text-sm">{errors.slug}</p>
            )}
          </div>

          {/* Subcategory Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Subcategory Icon
            </label>
            <DragUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={subcategoryIcon}
              imagePreview={subcategoryIconPreview}
            />
            {errors.subcategoryIcon && (
              <p className="text-red-500 text-sm">{errors.subcategoryIcon}</p>
            )}
          </div>

          {/* Subcategory Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Subcategory Image
            </label>
            <DragUploadImageInput
              getRootProps={getImageRootProps}
              getInputProps={getImageInputProps}
              image={subcategoryImage}
              imagePreview={subcategoryImagePreview}
            />
            {errors.subcategoryImage && (
              <p className="text-red-500 text-sm">{errors.subcategoryImage}</p>
            )}
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
