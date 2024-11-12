"use client";
import DragEditUploadImageInput from "../../../../shared/DragEditUploadImageInput";
import SwitchInput from "../../../../shared/SwitchInput";

import useGetAllCategories from "../../../../Hook/GetDataHook/useGetAllCategories";
import useGetAllSubCategories from "../../../../Hook/GetDataHook/useGetAllSubCategories";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

export default function EditBrandForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [childCategoryIcon, setChildCategoryIcon] = useState(null);
  const [childCategoryIconPreview, setChildCategoryIconPreview] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [featureBrand, setFeatureBrand] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [brandName, setBrandName] = useState("");
  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({});

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const res = await axiosSecure.get(`/product-brands/${targetId}`);
        const category = res?.data?.data;

        // Populate form fields with existing category data

        setCategory(category.category);
        setSubcategory(category.subcategory);
        setSlug(category.slug);
        setIsActive(category.isActive);
        setFeatureBrand(category.featureBrand);
        setBrandName(category.brandName);

        setLogoPreview(category.logo);
        setBannerPreview(category.banner);
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
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setChildCategoryIconPreview(previewUrl);
    setChildCategoryIcon(file);
  };

  const onDropLogo = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setLogo(file);
  };

  const onDropBanner = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setBannerPreview(previewUrl);
    setBanner(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("category", category);
    formData.append("subcategory", subcategory);
    if (childCategoryIcon)
      formData.append("childCategoryIcon", childCategoryIcon);
    formData.append("slug", slug);
    formData.append("isActive", isActive);
    formData.append("featureBrand", featureBrand);
    if (logo) formData.append("logo", logo);
    if (banner) formData.append("banner", banner);
    formData.append("brandName", brandName);

    try {
      const res = await axiosSecure.put(
        `/product-brands/${targetId}`,
        formData
      );

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Category updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      setIsShowModal(false);
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

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } =
    useDropzone({
      onDrop: onDropLogo,
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

  const handleSubcategoryNameInput = (input) => {
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
    setChildCategoryIcon(null);
    setChildCategoryIconPreview("");
    setLogo(null);
    setLogoPreview("");
    setBanner(null);
    setBannerPreview("");
    setBrandName("");
  };

  return (
    <div className="w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Child Category Edit Form</h1>
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
                categories.map((item) => (
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
              <option value="">Select One</option>
              {subcategories?.length > 0 &&
                subcategories.map((item) => (
                  <option value={item.slug} key={item._id}>
                    {item?.subcategoryName}
                  </option>
                ))}
            </select>
          </div>

          {/* Child Category Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name *</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => handleSubcategoryNameInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Child Category Title"
              required
            />
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlug(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Slug"
              required
            />
          </div>

          <SwitchInput
            label="Feature Brand"
            checked={featureBrand}
            setChecked={setFeatureBrand}
          />

          <SwitchInput
            label="Show On Navbar"
            checked={isActive}
            setChecked={setIsActive}
          />

          {/* Brand Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Brand Name *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Brand Name"
              required
            />
          </div>

          {/* Logo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Logo *</label>

            <DragEditUploadImageInput
              getRootProps={getLogoRootProps}
              getInputProps={getLogoInputProps}
              image={logo}
              imagePreview={logoPreview}
            />
          </div>

          {/* Banner */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Banner *
            </label>

            <DragEditUploadImageInput
              getRootProps={getBannerRootProps}
              getInputProps={getBannerInputProps}
              image={banner}
              imagePreview={bannerPreview}
            />
          </div>

          <div className="flex justify-end mt-4 gap-6">
            <button
              type="button"
              className="w-full p-3 bg-gray-500 text-white font-bold rounded-md"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-md"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
