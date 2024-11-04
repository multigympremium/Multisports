"use client";
import EditFormImage from "@/components/shared/ImageComponents/EditFormImage";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";

export default function CategoryEditForm({
  categoryId,
  setIsShowModal,
  isShowModal,
}) {
  const axiosSecure = useAxiosSecure();
  const [categoryName, setCategoryName] = useState("");
  const [featureCategory, setFeatureCategory] = useState("");
  const [showOnNavbar, setShowOnNavbar] = useState("Yes");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryIconImagePreview, setCategoryIconImagePreview] = useState("");
  const [categoryBanner, setCategoryBanner] = useState(null);
  const [categoryBannerImagePreview, setCategoryBannerImagePreview] =
    useState("");
  const [slug, setSlug] = useState("");

  // Fetch category data when component mounts
  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const res = await axiosSecure.get(`/categories/${categoryId}`);
        const category = res?.data?.data;
        // Populate form fields with existing category data

        console.log(category, "category");
        setCategoryName(category.categoryName);
        setFeatureCategory(category.featureCategory);
        setShowOnNavbar(category.showOnNavbar);
        setSlug(category.slug);

        // For existing images, display preview from the server
        setCategoryIconImagePreview(category.categoryIcon); // Assuming you have a URL for the icon
        setCategoryBannerImagePreview(category.categoryBanner); // Assuming you have a URL for the banner
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    if (categoryId) {
      fetchCategoryData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [categoryId, axiosSecure, isShowModal]);

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setCategoryIconImagePreview(previewUrl);
    setCategoryIcon(acceptedFiles[0]);
  };

  const onDropBanner = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setCategoryBannerImagePreview(previewUrl);
    setCategoryBanner(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("featureCategory", featureCategory);
    formData.append("showOnNavbar", showOnNavbar);
    if (categoryIcon) formData.append("categoryIcon", categoryIcon); // Only append if a new file was uploaded
    if (categoryBanner) formData.append("categoryBanner", categoryBanner); // Only append if a new file was uploaded
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.put(`/categories/${categoryId}`, formData);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        handleCloseModal();
      }
    } catch (err) {
      console.error(err);
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

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setCategoryName(input);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setCategoryName("");
    setFeatureCategory("");
    setShowOnNavbar("");
    setSlug("");
    setCategoryIconImagePreview("");
    setCategoryBannerImagePreview("");
    setCategoryBanner(null);
    setCategoryIcon(null);
  };

  return (
    <div className=" w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Edit Category</h1>
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name *</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => handleSlug(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Category Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              className="w-full p-2 border rounded-md"
              placeholder="Category Name"
              required
            />
          </div>

          {/* Category Icon */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Category Icon
            </label>
            <div
              {...getIconRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getIconInputProps()} />
              {categoryIconImagePreview ? (
                <>
                  <EditFormImage
                    imageObject={categoryIcon}
                    imagePreview={categoryIconImagePreview}
                  />
                  <p>{categoryIcon ? categoryIcon.name : "Current Icon"}</p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
          </div>

          {/* Category Banner */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Category Banner
            </label>
            <div
              {...getBannerRootProps()}
              className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
            >
              <input {...getBannerInputProps()} />
              {categoryBannerImagePreview ? (
                <>
                  <EditFormImage
                    imageObject={categoryBanner}
                    imagePreview={categoryBannerImagePreview}
                  />
                  <p>
                    {categoryBanner ? categoryBanner.name : "Current Banner"}
                  </p>
                </>
              ) : (
                <>
                  <FiUploadCloud size={60} />
                  <p className="text-xl">Drag and drop a file here or click</p>
                </>
              )}
            </div>
          </div>

          {/* Feature Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Feature Category
            </label>
            <select
              value={featureCategory}
              onChange={(e) => setFeatureCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select One</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Show on Navbar */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Show On Navbar
            </label>
            <select
              value={showOnNavbar}
              onChange={(e) => setShowOnNavbar(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
