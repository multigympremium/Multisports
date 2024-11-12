"use client";


import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function CategoryCreateForm() {
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

  const onDropIcon = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);

    // Set the state with the URL
    setCategoryIconImagePreview(previewUrl);

    setCategoryIcon(acceptedFiles[0]);
  };

  const onDropBanner = (acceptedFiles) => {
    // Process the files
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setCategoryBannerImagePreview(previewUrl);
    setCategoryBanner(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      categoryName,
      featureCategory,
      showOnNavbar,
      categoryIcon,
      categoryBanner,
    });

    const submitData = {
      categoryName,
      featureCategory,
      showOnNavbar,
      categoryIcon,
      categoryBanner,
    };

    const formData = new FormData();

    formData.append("categoryName", categoryName);
    formData.append("featureCategory", featureCategory);
    formData.append("showOnNavbar", showOnNavbar);
    formData.append("categoryIcon", categoryIcon);
    formData.append("categoryBanner", categoryBanner);
    formData.append("slug", slug);

    try {
      const res = await axiosSecure.post("/categories", formData);

      console.log(res);
      handleCloseModal();

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
    setCategoryName("");
    setFeatureCategory("");
    setShowOnNavbar("");
    setCategoryIcon(null);
    setCategoryBanner(null);
    setSlug("");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Category Create Form</h1>
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
              {categoryIcon ? (
                <>
                  <img
                    src={categoryIconImagePreview}
                    alt="categoryIcon"
                    width={200}
                    height={200}
                  />
                  <p>{categoryIcon.name}</p>
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
              {categoryBanner ? (
                <>
                  <img
                    src={categoryBannerImagePreview}
                    alt="categoryBanner"
                    width={200}
                    height={200}
                  />
                  <p>{categoryBanner.name}</p>
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
              <option value="">Select One</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
