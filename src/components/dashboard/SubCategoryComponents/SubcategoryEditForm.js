"use client";
import EditFormImage from "@/components/shared/ImageComponents/EditFormImage";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";

export default function SubcategoryEditForm({
  subcategoryId,
  setIsShowModal,
  isShowModal,
}) {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategoryIcon, setSubcategoryIcon] = useState(null);
  const [subcategoryIconPreview, setSubcategoryIconPreview] = useState("");
  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [subcategoryImagePreview, setSubcategoryImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [slug, setSlug] = useState("");

  // Fetch category data when component mounts
  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const res = await axiosSecure.get(`/subcategories/${subcategoryId}`);
        const category = res?.data?.data;

        // Populate form fields with existing category data

        console.log(category, "category");
        setCategory(category.category);
        setSubcategoryName(category.subcategoryName);
        setSlug(category.slug);

        // For existing images, display preview from the server
        setSubcategoryIconPreview(category.subcategoryIcon); // Assuming you have a URL for the icon
        setSubcategoryImagePreview(category.subcategoryImage); // Assuming you have a URL for the banner
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    if (subcategoryId) {
      fetchCategoryData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [subcategoryId, axiosSecure, isShowModal]);

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
      const res = await axiosSecure.put(
        `/subcategories/${subcategoryId}`,
        formData
      );

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
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

  const handleCloseModal = () => {
    setIsShowModal(false);
    setCategory("");
    setSubcategoryName("");
    setSubcategoryIcon(null);
    setSubcategoryImage(null);
    setSubcategoryIconPreview("");
    setSubcategoryImagePreview("");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get("/categories");
        console.log(res, "res", res?.data?.data);
        if (res.status === 200 || res.status === 201) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [axiosSecure]);

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
    <div className="w-[80%] bg-gray-100 p-10">
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
            <div
              {...getIconRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getIconInputProps()} />
              {subcategoryIcon || subcategoryIconPreview ? (
                <>
                  <EditFormImage
                    imageObject={subcategoryIcon}
                    imagePreview={subcategoryIconPreview}
                  />
                  <p>{subcategoryIcon ? subcategoryIcon.name : ""}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
          </div>

          {/* Subcategory Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Subcategory Image
            </label>
            <div
              {...getImageRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getImageInputProps()} />
              {subcategoryImage || subcategoryImagePreview ? (
                <>
                  <EditFormImage
                    imageObject={subcategoryImage}
                    imagePreview={subcategoryImagePreview}
                  />
                  <p>{subcategoryImage ? subcategoryImage.name : ""}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4"
            >
              Cancel
            </button>
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
