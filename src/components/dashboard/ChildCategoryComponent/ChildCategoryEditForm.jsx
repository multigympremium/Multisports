"use client";
import EditFormImage from "../../../shared/ImageComponents/EditFormImage";

import useGetAllCategories from "../../../Hook/GetDataHook/useGetAllCategories";
import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function ChildCategoryEditForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");
  const [childCategoryIcon, setChildCategoryIcon] = useState(null);
  const [childCategoryIconPreview, setChildCategoryIconPreview] = useState("");
  const [slug, setSlug] = useState("");
  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({});

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const res = await axiosSecure.get(`/child-categories/${targetId}`);
        const category = res?.data?.data;

        // Populate form fields with existing category data

        console.log(category, "category");
        setChildCategoryName(category.childCategoryName);
        setCategory(category.category);
        setSubcategory(category.subcategory);
        setSlug(category.slug);

        // For existing images, display preview from the server
        setChildCategoryIconPreview(category.childCategoryIcon); // Assuming you have a URL for the icon
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    if (targetId) {
      fetchCategoryData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setChildCategoryIconPreview(previewUrl);
    setChildCategoryIcon(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const formData = new FormData();

    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("childCategoryName", childCategoryName);
    if (childCategoryIcon)
      formData.append("image", childCategoryIcon);
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.put(
        `/child-categories/${targetId}`,
        formData
      );

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      setIsShowModal(false);
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

  const handleCloseModal = () => {
    setIsShowModal(false);
    setCategory("");
    setSubcategory("");
    setChildCategoryName("");
    setChildCategoryIcon(null);
    setChildCategoryIconPreview("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Child Category Create Form</h1>
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
              <option value="">Select One</option>
              {categories?.length > 0 &&
                categories.map((item, index) => (
                  <option
                    value={item.slug}
                    selected={category === item.slug}
                    key={item._id}
                  >
                    {item?.categoryName}
                  </option>
                ))}
            </select>
          </div>

          {/* Select Subcategory */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select Subcategory *
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select One</option>
              {subcategories?.length > 0 &&
                subcategories.map((item, index) => (
                  <option
                    value={item.slug}
                    selected={subcategory === item.slug}
                    key={index}
                  >
                    {item?.subcategoryName}
                  </option>
                ))}
              {/* Add more subcategories dynamically if needed */}
            </select>
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

          {/* Child Category Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Child Category Icon
            </label>

            <div
              {...getIconRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getIconInputProps()} />
              {childCategoryIcon || childCategoryIconPreview ? (
                <>
                  <EditFormImage
                    imageObject={childCategoryIcon}
                    imagePreview={childCategoryIconPreview}
                  />
                  <p>{childCategoryIcon ? childCategoryIcon.name : ""}</p>
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
