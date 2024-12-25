"use client";
import CustomEditor from "../../../shared/CustomEditor/CustomEditor";
import SwitchInput from "../../../shared/SwitchInput";
import useGetAllChildCategories from "../../../Hook/GetDataHook/useGetAllChildCategories";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import useGetAllProductColors from "../../../Hook/GetDataHook/useGetAllProductColors";
import useGetAllProductFlag from "../../../Hook/GetDataHook/useGetAllProductFlag";
import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ActiveDescBtn from "./productSharedComponents/ActiveDescBtn";
import useGetAllProductSizes from "../../../Hook/GetDataHook/useGetAllProductSizes";
import Swal from "sweetalert2";
import DragEditUploadImageInput from "../../../shared/DragEditUploadImageInput";
import useGetAllCategories from "../../../Hook/GetDataHook/useGetAllCategories";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { IoCloseCircleOutline } from "react-icons/io5";
import DragMultiEditUploadImageInput from "../../../shared/DragMultiEditUploadImageInput";
import useGetAllModelOfBrands from "../../../Hook/GetDataHook/useGetAllModelOfBrands";
import { set } from "react-hook-form";
import EditableTableColumn from "./productSharedComponents/EditableTableColumn";

export default function EditProductForm({
  targetId,
  setIsShowModal,

  isShowModal,
}) {
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
  const [productColorValue, setProductColorValue] = useState("");
  const [productFlagValue, setProductFlagValue] = useState("");
  const [brandValue, setBrandValue] = useState("");
  const [productSizeValue, setProductSizeValue] = useState("");
  const [galleryItemIds, setGalleryItemIds] = useState([]);
  const [deleteItemIds, setDeleteItemIds] = useState([]);
  const [colorAndSize, setColorAndSize] = useState([]);
  const [virtualStock, setVirtualStock] = useState(0);

  const [modelOfBrandValue, setModelOfBrandValue] = useState("");

  const modelOfBrand = useGetAllModelOfBrands({});

  const [activeDescription, setActiveDescription] = useState("full_desc");
  const [setupConfig, setSetupConfig] = useState({});

  const [productSize, setProductSize] = useState([]);
  const [productColor, setProductColor] = useState([]);

  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({});
  const childCategories = useGetAllChildCategories({});
  const productBrands = useGetAllProductBrands({});
  const productColors = useGetAllProductColors({});
  const productFlags = useGetAllProductFlag({});
  const productSizes = useGetAllProductSizes({});

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchSizeNameData() {
      try {
        const res = await axiosSecure.get(`/products/${targetId}`);
        const resData = res?.data?.data;

        // Populate form fields with existing data
        setProductTitle(resData.productTitle);
        setShortDescription(resData.shortDescription);
        setFullDescription(resData.fullDescription);
        setSpecifications(res?.specifications);
        setReturnPolicy(res.returnPolicy);
        setPrice(resData.price);
        setDiscountPrice(resData.discountPrice);
        setRewardPoints(resData.rewardPoints);
        setStock(resData.stock);
        setProductCode(resData.productCode);
        setMetaTitle(resData.metaTitle);
        setMetaKeywords(resData.metaKeywords);
        setMetaDescription(resData.metaDescription);
        setSpecialOffer(resData.specialOffer);
        setHasVariants(resData.hasVariants);
        setCategory(resData.category);
        setBrandValue(resData.brandValue);
        setProductColorValue(resData.productColorValue);
        setProductSizeValue(resData.productSizeValue);
        setProductFlagValue(resData.productFlagValue);
        setSubcategory(resData.subcategory);
        setChildCategory(resData.childCategory);
        setThumbnailPreview(resData.thumbnail);
        setGalleryPreview(resData.gallery);
        setIsNew(resData.isNew);
        setIsRecommended(resData.isRecommended);
        setProductColor(resData.productColorValue);
        setProductSize(resData.productSizeValue);
        setVirtualStock(resData.stock);
        setColorAndSize(resData.colorAndSize);

        for (const galleryItem of resData.gallery) {
          setGalleryItemIds((prev) => [...prev, galleryItem._id]);
        }
      } catch (error) {
        console.error("Error fetching sizeName data:", error);
      }
    }

    if (targetId) {
      fetchSizeNameData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

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
    setGalleryPreview((prev) => {
      console.log([...prev, ...previewUrls], "[...prev, ...previewUrls]");
      return [...prev, ...previewUrls];
    });

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

    // const uniqeDeletedGalleryItemIds = Array.from(new Set(deleteItemIds));

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
      color: productColorValue,
      size: productSizeValue,
      flag: productFlagValue,
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
    formData.append("thumbnail", thumbnail || thumbnailPreview); // If it's a file, ensure it's a `File` object
    // formData.append("gallery", gallery);
    formData.append("category", category);
    formData.append("brandValue", brandValue);
    formData.append("productColorValue", productColor.join(","));
    formData.append("productSizeValue", productSize.join(","));
    formData.append("productFlagValue", productFlagValue);
    formData.append("subcategory", subcategory);
    formData.append("childCategory", childCategory);
    formData.append("galleryItemIds", galleryItemIds);
    formData.append("colorAndSize", JSON.stringify(colorAndSize));
    formData.append(
      "deletedGalleryItemIds",
      Array.from(new Set(deleteItemIds))
    );
    formData.append("galleryItemCount", gallery.length);

    // If `gallery` is an array of files, you can loop through it and append each file:

    console.log(gallery, "gallery");
    // for (const file of gallery) {
    //   console.log(file, "file");
    //   formData.append(`gallery`, file);
    // }
    if (Array.isArray(gallery)) {
      gallery.forEach((file, index) => {
        formData.append(`gallery`, file);
      });
    }

    // if (Array.isArray(galleryItemIds)) {
    //   galleryItemIds.forEach((id, index) => {
    //     formData.append(`galleryItemIds`, id);
    //   });
    // }

    try {
      const res = await axiosSecure.put(`/products/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "sizeName updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }

      setIsShowModal(false);

      handleCloseModal();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsShowModal(false);
    setProductTitle("");
    setShortDescription("");
    setFullDescription("");
    setPrice(0);
    setDiscountPrice(0);
    setRewardPoints(0);
    setStock(0);
    setProductCode("");
    setMetaTitle("");
    setMetaKeywords("");
    setMetaDescription("");
    setSpecialOffer(false);
    setHasVariants(false);
    setCategory("");
    setBrandValue("");
    setProductColorValue("");
    setProductSizeValue("");
    setProductFlagValue("");
    setSubcategory("");
    setChildCategory("");
    setThumbnailPreview("");
    setGalleryPreview([]);
    setGalleryItemIds([]);
    setProductColor([]);
    setProductSize([]);
    setGallery([]);
    setDeleteItemIds([]);
  }, []);

  useEffect(() => {
    setProductTitle("");
    setShortDescription("");
    setFullDescription("");
    setPrice(0);
    setDiscountPrice(0);
    setRewardPoints(0);
    setStock(0);
    setProductCode("");
    setMetaTitle("");
    setMetaKeywords("");
    setMetaDescription("");
    setSpecialOffer(false);
    setHasVariants(false);
    setCategory("");
    setBrandValue("");
    setProductColorValue("");
    setProductSizeValue("");
    setProductFlagValue("");
    setSubcategory("");
    setChildCategory("");
    setThumbnailPreview("");
    setGalleryPreview([]);
    setGalleryItemIds([]);
    setProductColor([]);
    setProductSize([]);
    setGallery([]);
  }, [isShowModal]);

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setProductColorValue(value);

    if (value !== "") {
      setProductColor((prev) =>
        prev.includes(value) ? prev : [...prev, value]
      );
    }
  };
  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setProductSizeValue(value);

    if (value !== "") {
      setProductSize((prev) =>
        prev.includes(value) ? prev : [...prev, value]
      );
    }
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const firstResData = await axiosSecure.get(`/setup-config`);

        console.log(firstResData, "res ljlj");

        if (firstResData.status === 200 || firstResData.status === 201) {
          const data = firstResData?.data?.data[0];

          console.log(data, "data");

          setSetupConfig(data);

          // Set form values with the testimonial data
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();
  }, [axiosSecure]);

  console.log(deleteItemIds, "deleteItemIds");
  console.log(galleryItemIds, "galleryItemIds");
  useEffect(() => {
    setGalleryItemIds((prev) =>
      prev.filter((item) => !deleteItemIds.includes(item))
    );
  }, [deleteItemIds]);

  return (
    <div className="w-full mx-auto bg-gray-100 rounded-2xl p-10">
      <div className="">
        <h1 className="text-2xl font-semibold mb-9">Add New Product</h1>
        <form onSubmit={handleSubmit}>
          {/* Product Title */}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="customInput mb-4"
              placeholder="Enter Product Name Here"
              // required
            />
          </div>
          <div className={"flex items-center  gap-6 mb-5"}>
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
              <label className="block text-gray-700 text-xl font-semibold mb-3">
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
              <label className="block text-gray-700 font-semibold mb-3 text-xl">
                Full Description
              </label>
              {/* <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="customInput"
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
              <label className="block text-gray-700 font-semibold mb-3 text-xl">
                Specifications
              </label>
              {/* <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="customInput"
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
              <label className="block text-gray-700 font-semibold mb-3 text-xl">
                Retrun Policy
              </label>
              {/* <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="customInput"
              placeholder="Write Description Here"
              rows="6"
            /> */}
              <CustomEditor value={returnPolicy} setValue={setReturnPolicy} />
            </div>
          )}

          {/* Price, Discount Price, Reward Points, Stock */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 ">Price (BDT)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="customInput"
                // required
              />
            </div>
            <div>
              <label className="block text-gray-70">Discount Price</label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="customInput"
              />
            </div>
            <div>
              <label className="block text-gray-70">Reward Points</label>
              <input
                type="number"
                value={rewardPoints}
                onChange={(e) => setRewardPoints(e.target.value)}
                className="customInput"
              />
            </div>
            <div>
              <label className="block text-gray-70">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="customInput"
              />
            </div>
          </div>

          <div className={"grid grid-cols-3 gap-4 mb-4"}>
            {/* Product Code */}
            <div className="mb-4">
              <label className="block text-gray-70">Product Code</label>
              <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="customInput"
                placeholder="Product Code"
              />
            </div>

            {/* Select Category */}
            <div className="mb-4">
              <label className="block text-gray-70">Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className=" customInput"
                // required
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
              <label className="block text-gray-70">Select Subcategory</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="customInput"
                // required
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
              <label className="block text-gray-70">
                Select Child Categories
              </label>
              <select
                value={childCategory}
                onChange={(e) => setChildCategory(e.target.value)}
                className="customInput"
                // required
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
              <label className="block text-gray-70">Select Brand</label>
              <select
                value={brandValue}
                onChange={(e) => setBrandValue(e.target.value)}
                className="customInput"
                // required
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
            {setupConfig?.modelOfBrand && (
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Select Model Of Brand *
                </label>
                <select
                  value={modelOfBrandValue}
                  onChange={(e) => setModelOfBrandValue(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  // required
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
            )}

            {/* Select Subcategory */}

            {setupConfig?.productColor && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold ">
                  Select Product Color
                </label>
                <select
                  value={productColorValue}
                  onChange={handleColorChange}
                  className="customInput select"
                  // required
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
                  {productColor?.length > 0 &&
                    productColor.map((item, index) => (
                      <li
                        key={item._id}
                        className="px-3 py-1 border border-black text-sm capitalize relative rounded-lg"
                      >
                        {item}
                        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 ">
                          <IoCloseCircleOutline size={25} />
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Select Subcategory */}

            {setupConfig?.productFlags && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold ">
                  Select Product Flag
                </label>
                <select
                  value={productFlagValue}
                  onChange={(e) => setProductFlagValue(e.target.value)}
                  className="customInput select"
                  // required
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
            )}

            {/* Select Subcategory */}

            {setupConfig?.productSize && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold ">
                  Select Product Size
                </label>
                <select
                  value={productSizeValue}
                  onChange={handleSizeChange}
                  className="customInput select"
                  // required
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
                  {productSize?.length > 0 &&
                    productSize.map((item, index) => (
                      <li
                        key={item._id}
                        className="px-3 py-1 border border-black text-sm capitalize relative rounded"
                      >
                        {item}
                        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 ">
                          <IoCloseCircleOutline size={25} />
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <EditableTableColumn
            productColors={productColors}
            productSizes={productSizes}
            colorAndSize={colorAndSize}
            setColorAndSize={setColorAndSize}
            totalQuantity={virtualStock}
            setTotalQuantity={setVirtualStock}
            stock={stock}
            isEditState={true}
          />
          {/* File Upload for Thumbnail */}
          <div className="mb-4">
            <label className="block text-gray-70">
              Product Thumbnail Image
            </label>

            <DragEditUploadImageInput
              getRootProps={getThumbnailRootProps}
              getInputProps={getThumbnailInputProps}
              image={thumbnail}
              imagePreview={thumbnailPreview}
            />
          </div>

          {/* Gallery */}
          <div className="mb-4">
            <label className="block text-gray-70">Product Image Gallery</label>

            <DragMultiEditUploadImageInput
              getRootProps={getGalleryRootProps}
              getInputProps={getGalleryInputProps}
              image={gallery}
              imagePreview={galleryPreview}
              setGallery={setGallery}
              setImagePreview={setGalleryPreview}
              setDeleteItemIds={setDeleteItemIds}
            />
          </div>

          {/* Toggle for Special Offer */}
          {/* <div className="mb-4 flex items-center">
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
          </div> */}

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

          {setupConfig?.seoInformation && (
            <div className="mb-4 mt-6">
              <h2 className="text-2xl font-semibold mb-4 pb-5 border-b border-gray-300">
                Product SEO Information (Optional)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold ">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="customInput"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold ">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    className="customInput"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold ">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="customInput resize-none"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 ">
            <button
              type="button"
              className="customCancelButton"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button type="submit" className={`customSaveButton`}>
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
