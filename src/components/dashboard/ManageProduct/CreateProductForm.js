"use client";
import CustomEditor from "@/components/shared/CustomEditor/CustomEditor";
import DragUploadImageInput from "@/components/shared/DragUploadImageInput";
import SwitchInput from "@/components/shared/SwitchInput";
import useGetAllCategories from "@/Hook/GetDataHook/useGetAllCategories";
import useGetAllChildCategories from "@/Hook/GetDataHook/useGetAllChildCategories";
import useGetAllModelOfBrands from "@/Hook/GetDataHook/useGetAllModelOfBrands";
import useGetAllProductBrands from "@/Hook/GetDataHook/useGetAllProductBrands";
import useGetAllProductColors from "@/Hook/GetDataHook/useGetAllProductColors";
import useGetAllProductFlag from "@/Hook/GetDataHook/useGetAllProductFlag";
import useGetAllSubCategories from "@/Hook/GetDataHook/useGetAllSubCategories";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Switch from "react-switch";
import ActiveDescBtn from "./productSharedComponents/ActiveDescBtn";
import useGetAllProductSizes from "@/Hook/GetDataHook/useGetAllProductSizes";
import Swal from "sweetalert2";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function ProductCreateForm() {
  // States for the form fields
  const [productTitle, setProductTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [stock, setStock] = useState(10);
  const [productCode, setProductCode] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [specialOffer, setSpecialOffer] = useState(false);
  const [hasVariants, setHasVariants] = useState(false);
  const [isRecommended, setIsRecommended] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [modelOfBrandValue, setModelOfBrandValue] = useState("");
  const [productColorValue, setProductColorValue] = useState("");
  const [productFlagValue, setProductFlagValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [productSizeValue, setProductSizeValue] = useState("");

  const [productSize, setProductSize] = useState([]);
  const [productColor, setProductColor] = useState([]);


  const [activeDescription, setActiveDescription] = useState("full_desc");

  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({});
  const childCategories = useGetAllChildCategories({});
  const modelOfBrand = useGetAllModelOfBrands({});
  const productBrands = useGetAllProductBrands({});
  const productColors = useGetAllProductColors({});
  const productFlags = useGetAllProductFlag({});
  const productSizes = useGetAllProductSizes({});

  const axiosSecure = useAxiosSecure();

  // Dropzone for thumbnail and gallery
  const onDropThumbnail = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);

    // Set the state with the URL
    setThumbnailPreview(previewUrl);

    setThumbnail(acceptedFiles[0]);
  };
  const onDropGallery = (acceptedFiles) => {
    // Generate preview URLs for all accepted files
    const previewUrls = acceptedFiles.map((file) => ({
      file, // Store file reference
      preview: URL.createObjectURL(file), // Create preview URL
    }));

    // Update the state by adding new previews to the gallery
    setGalleryPreview((prev) => [...prev, ...previewUrls]);

    // Add all new files to the gallery state
    setGallery((prev) => [...prev, ...acceptedFiles]);
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: "image/*",
    multiple: false,
  });

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps,
  } = useDropzone({
    onDrop: onDropGallery,
    accept: "image/*",
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      productTitle,
      shortDescription,
      fullDescription,
      price,
      discountPrice,
      rewardPoints,
      stock,
      productCode,
      metaTitle,
      metaKeywords,
      metaDescription,
      specialOffer,
      hasVariants,
      thumbnail,
      gallery,
      category,
      brand: brandValue,
      color: productColor.join(","),
      size: productSize.join(","),
      flag: productFlagValue,
      model: modelOfBrandValue,
      subcategory: subcategory,
      childCategory: childCategory,
    });
    const formData = new FormData();
    formData.append("productTitle", productTitle);
    formData.append("shortDescription", shortDescription);
    formData.append("fullDescription", fullDescription);
    formData.append("specifications", specifications);
    formData.append("returnPolicy", returnPolicy);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice);
    formData.append("rewardPoints", rewardPoints);
    formData.append("stock", stock);
    formData.append("productCode", productCode);
    formData.append("metaTitle", metaTitle);
    formData.append("metaKeywords", metaKeywords);
    formData.append("metaDescription", metaDescription);
    formData.append("specialOffer", specialOffer);
    formData.append("hasVariants", hasVariants);
    formData.append("thumbnail", thumbnail); // If it's a file, ensure it's a `File` object
    // formData.append("gallery", gallery);
    formData.append("category", category);
    formData.append("brand", brandValue);
    formData.append("color", productColor.join(","));
    formData.append("size", productSize.join(","));
    formData.append("flag", productFlagValue);
    formData.append("model", modelOfBrandValue);
    formData.append("subcategory", subcategory);
    formData.append("childCategory", childCategory);


    // If `gallery` is an array of files, you can loop through it and append each file:

    console.log(gallery, "gallery");
    // for (const file of gallery) {
    //   console.log(file, "file");
    //   formData.append(`gallery`, file);
    // }
    if (Array.isArray(gallery)) {
      gallery.forEach((file, index) => {
        console.log(file, "file");
        formData.append(`gallery`, file);
      });
    }

    try {
      const res = await axiosSecure.post("/products", formData);

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product created successfully",
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

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setProductColorValue(value);

    if(value !== ""){
    setProductColor((prev)=> prev.includes(value) ? prev : [...prev, value]);
    }
  };
  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setProductSizeValue(value);

    if(value !== ""){
    setProductSize((prev)=> prev.includes(value) ? prev : [...prev, value]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Add New Product</h1>
        <form onSubmit={handleSubmit}>
          {/* Product Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Title *
            </label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Product Name Here"
              required
            />
          </div>
          <div className={"flex items-center gap-6 mb-5"}>
            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="short_desc"
              btnName="Short Description"
            />

            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="full_desc"
              btnName="Full Description"
            />
            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="specifications"
              btnName="Specifications"
            />
            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="return_policy"
              btnName="Return Policy"
            />
          </div>

          {/* Short Description */}
          {activeDescription === "short_desc" && (
            <div className="mb-[4rem]">
              <label className="block text-gray-700 text-2xl font-bold mb-6">
                Short Description
              </label>

              <CustomEditor
                value={shortDescription}
                setValue={setShortDescription}
              />
            </div>
          )}

          {/* Full Description */}
          {activeDescription === "full_desc" && (
            <div className="mb-[4rem]">
              <label className="block text-gray-700 font-bold mb-2 text-2xl">
                Full Description
              </label>
              {/* <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Write Description Here"
              rows="6"
            /> */}
              <CustomEditor
                value={fullDescription}
                setValue={setFullDescription}
              />
            </div>
          )}
          {/* Full Description */}
          {activeDescription === "specifications" && (
            <div className="mb-[4rem]">
              <label className="block text-gray-700 font-bold mb-2 text-2xl">
                Specifications
              </label>
              {/* <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Write Description Here"
              rows="6"
            /> */}
              <CustomEditor
                value={specifications}
                setValue={setSpecifications}
              />
            </div>
          )}
          {/* Full Description */}
          {activeDescription === "return_policy" && (
            <div className="mb-[4rem]">
              <label className="block text-gray-700 font-bold mb-2 text-2xl">
                Retrun Policy
              </label>
              {/* <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Write Description Here"
              rows="6"
            /> */}
              <CustomEditor value={returnPolicy} setValue={setReturnPolicy} />
            </div>
          )}

          {/* Price, Discount Price, Reward Points, Stock */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Price (BDT) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Discount Price
              </label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Reward Points
              </label>
              <input
                type="number"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className={"grid grid-cols-3 gap-4 mb-4"}>
            {/* Product Code */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Product Code
              </label>
              <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Product Code"
              />
            </div>

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
                Select Child Categories *
              </label>
              <select
                value={childCategory}
                onChange={(e) => setChildCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select One</option>
                {childCategories?.length > 0 &&
                  childCategories.map((item, index) => (
                    <option value={item.slug} key={item._id}>
                      {item?.childCategoryName}
                    </option>
                  ))}
                {/* Add more subcategories dynamically if needed */}
              </select>
            </div>
            {/* Select Brand */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Brand *
              </label>
              <select
                value={brandValue}
                onChange={(e) => setBrandValue(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select One</option>
                {productBrands?.length > 0 &&
                  productBrands.map((item, index) => (
                    <option value={item.slug} key={item._id}>
                      {item?.brandName}
                    </option>
                  ))}
                {/* Add more subcategories dynamically if needed */}
              </select>
            </div>

            {/* Select Subcategory */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Model Of Brand *
              </label>
              <select
                value={modelOfBrandValue}
                onChange={(e) => setModelOfBrandValue(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select One</option>
                {modelOfBrand?.length > 0 &&
                  modelOfBrand.map((item, index) => (
                    <option value={item.slug} key={item._id}>
                      {item?.modelName}
                    </option>
                  ))}
                {/* Add more subcategories dynamically if needed */}
              </select>
            </div>

            {/* Select Subcategory */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Product Color *
              </label>
              <select
                value={productColorValue}
                onChange={handleColorChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select One</option>
                {productColors?.length > 0 &&
                  productColors.map((item, index) => (
                    <option value={item.productColor} key={item._id}>
                      {item?.productColorName}
                    </option>
                  ))}
                {/* Add more subcategories dynamically if needed */}
              </select>

              <ul className="flex gap-3 mt-3 items-center">
                {
                  productColor?.length > 0 &&
                  productColor.map((item, index) => (
                    <li key={item._id} className="px-3 py-1 border border-black text-sm capitalize relative rounded-lg" >{item}
                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 "><IoCloseCircleOutline size={25} /></span>
                    </li>
                ))}
              </ul>
            </div>

            {/* Select Subcategory */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Product Flag*
              </label>
              <select
                value={productFlagValue}
                onChange={(e) => setProductFlagValue(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select One</option>
                {productFlags?.length > 0 &&
                  productFlags.map((item, index) => (
                    <option value={item.flagName} key={item._id}>
                      {item?.flagName}
                    </option>
                  ))}
                {/* Add more subcategories dynamically if needed */}
              </select>

              
            </div>

            {/* Select Subcategory */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Product Size*
              </label>
              <select
                value={productSizeValue}
                onChange={handleSizeChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select One</option>
                {productSizes?.length > 0 &&
                  productSizes.map((item, index) => (
                    <option value={item.sizeName} key={item._id}>
                      {item?.sizeName}
                    </option>
                  ))}
                {/* Add more subcategories dynamically if needed */}
              </select>
            <ul className="flex gap-3 mt-3 items-center">
                {
                  productSize?.length > 0 &&
                  productSize.map((item, index) => (
                    <li key={item._id} className="px-3 py-1 border border-black text-sm capitalize relative rounded" >{item}
                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 "><IoCloseCircleOutline size={25} /></span>
                    </li>
                ))}
              </ul>
            </div>

          </div>

          {/* File Upload for Thumbnail */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Thumbnail Image *
            </label>

            <DragUploadImageInput
              getRootProps={getThumbnailRootProps}
              getInputProps={getThumbnailInputProps}
              image={thumbnail}
              imagePreview={thumbnailPreview}
            />
          </div>

          {/* Gallery */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Image Gallery
            </label>

            <DragUploadImageInput
              getRootProps={getGalleryRootProps}
              getInputProps={getGalleryInputProps}
              image={gallery}
              imagePreview={galleryPreview}
            />
          </div>

          {/* Toggle for Special Offer */}
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-bold mr-2">
              Special Offer?
            </label>
            <Switch
              label="Has Variants?"
              checked={hasVariants}
              onChange={setHasVariants}
              offColor="#ccc"
              onColor="#00b894"
            />
          </div>

          <SwitchInput
            label="Special Offer?"
            checked={specialOffer}
            setChecked={setSpecialOffer}
          />

          <SwitchInput
            label="Is Recommended"
            checked={isRecommended}
            setChecked={setIsRecommended}
          />
          <SwitchInput label="Is New" checked={isNew} setChecked={setIsNew} />

          {/* SEO Information */}
          <div className="mb-4 mt-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-300">
              Product SEO Information (Optional)
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

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Discard
            </button>
            <button
              type="submit"
              className={`bg-blue-500 px-4 py-2 rounded-md hover:bg-neutral-800 text-white`}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
