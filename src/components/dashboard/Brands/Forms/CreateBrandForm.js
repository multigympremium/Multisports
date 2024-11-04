"use client";
import DragUploadImageInput from "@/components/shared/DragUploadImageInput";
import SwitchInput from "@/components/shared/SwitchInput";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import useGetAllCategories from "@/Hook/GetDataHook/useGetAllCategories";
import useGetAllChildCategories from "@/Hook/GetDataHook/useGetAllChildCategories";
import useGetAllSubCategories from "@/Hook/GetDataHook/useGetAllSubCategories";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function CreateBrandForm({ isShowModal, setIsShowModal }) {
  const [category, setCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [featureBrand, setFeatureBrand] = useState(false);

  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({
    query: `category=${category}`,
  });
  const childCategories = useGetAllChildCategories({});

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    if (
      !logo ||
      !banner ||
      !brandName ||
      !category ||
      !subcategory ||
      !slug ||
      !isActive ||
      !featureBrand
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();

    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("slug", slug);
    formData.append("isActive", isActive);
    formData.append("featureBrand", featureBrand);
    formData.append("logo", logo);
    formData.append("banner", banner);
    formData.append("brandName", brandName);

    try {
      const res = await axiosSecure.post("/product-brands", formData);

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

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setLogoPreview(previewUrl);
    setLogo(acceptedFiles[0]);
  };

  const onDropBanner = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setBanner(file);
    setBannerPreview(previewUrl);
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

  const handleBrandNameInput = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setBrandName(input);
  };

  const handleSlug = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setCategory("");
    setSubcategory("");
    setChildCategory("");
    setLogo(null);
    setLogoPreview("");
    setBanner(null);
    setBannerPreview("");
    setSlug("");
    setIsActive(false);
    setFeatureBrand(false);
  };

  return (
    <div className="w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
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
              <option value="" selected disabled>
                Select One
              </option>
              {categories?.length > 0 &&
                categories.map((item, index) => (
                  <option value={item.slug} key={item._id}>
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
              <option value="" selected disabled>
                Select One
              </option>
              {subcategories?.length > 0 &&
                subcategories.map((item, index) => (
                  <option value={item.slug} key={item._id}>
                    {item?.subcategoryName}
                  </option>
                ))}
              {/* Add more subcategories dynamically if needed */}
            </select>
          </div>

          {/* Select Subcategory */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select Child Category *
            </label>
            <select
              value={childCategory}
              onChange={(e) => setChildCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="" selected disabled>
                Select One
              </option>
              {childCategories?.length > 0 &&
                childCategories?.map((item, index) => (
                  <option value={item.slug} key={item._id}>
                    {item?.childCategoryName}
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
              value={brandName}
              onChange={(e) => handleBrandNameInput(e.target.value)}
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

          <SwitchInput
            label="Active"
            checked={isActive}
            setChecked={setIsActive}
          />
          <SwitchInput
            label="Feature Brand"
            checked={featureBrand}
            setChecked={setFeatureBrand}
          />

          {/* Logo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Logo</label>

            <DragUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={logo}
              imagePreview={logoPreview}
            />
          </div>

          {/* Banner */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Banner</label>

            <DragUploadImageInput
              getRootProps={getBannerRootProps}
              getInputProps={getBannerInputProps}
              image={banner}
              imagePreview={bannerPreview}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
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
              Save Child Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
