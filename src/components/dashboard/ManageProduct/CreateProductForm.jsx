"use client";
import CustomEditor from "../../../shared/CustomEditor/CustomEditor";
import DragUploadImageInput from "../../../shared/DragUploadImageInput";
import SwitchInput from "../../../shared/SwitchInput";
import useGetAllCategories from "../../../Hook/GetDataHook/useGetAllCategories";
import useGetAllChildCategories from "../../../Hook/GetDataHook/useGetAllChildCategories";
import useGetAllModelOfBrands from "../../../Hook/GetDataHook/useGetAllModelOfBrands";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import useGetAllProductColors from "../../../Hook/GetDataHook/useGetAllProductColors";
import useGetAllProductFlag from "../../../Hook/GetDataHook/useGetAllProductFlag";
import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Switch from "react-switch";
import ActiveDescBtn from "./productSharedComponents/ActiveDescBtn";
import useGetAllProductSizes from "../../../Hook/GetDataHook/useGetAllProductSizes";
import Swal from "sweetalert2";

import { IoCloseCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import DragMultiUploadImageInput from "../../../shared/DragMultiUploadImageInput";
import ReactSelect from "../../UI/ReactSelect";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import EditableTableColumn from "./productSharedComponents/EditableTableColumn";

export default function ProductCreateForm() {
  // States for the form fields
  const [productTitle, setProductTitle] = useState("");
  const [loading, setLoading] = useState(false);
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
  const [category, setCategory] = useState("dfsf");
  const [subcategory, setSubcategory] = useState("sdfds");
  const [childCategory, setChildCategory] = useState("sdfsd");
  const [modelOfBrandValue, setModelOfBrandValue] = useState("");
  const [productFlagValue, setProductFlagValue] = useState("");
  const [brandValue, setBrandValue] = useState("zxcvzcxv");
  const [colorAndSize, setColorAndSize] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [virtualStock, setVirtualStock] = useState(10);
  const [slug, setSlug] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [setupConfig, setSetupConfig] = useState({});

  const [productSize, setProductSize] = useState([]);
  const [productColor, setProductColor] = useState([]);

  const [activeDescription, setActiveDescription] = useState("full_desc");

  const categories = useGetAllCategories({});
  const subcategories = useGetAllSubCategories({
    query: `category=${category}`,
  });
  const childCategories = useGetAllChildCategories({});
  const productBrands = useGetAllProductBrands({});
  const productColors = useGetAllProductColors({});
  const productFlags = useGetAllProductFlag({});
  const productSizes = useGetAllProductSizes({});

  const modelOfBrand = useGetAllModelOfBrands({});

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
    setLoading(true);
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
    formData.append("specialOffer", specialOffer);
    formData.append("isFeatured", isFeatured);
    formData.append("thumbnail", thumbnail); // If it's a file, ensure it's a `File` object
    // formData.append("gallery", gallery);
    formData.append("category", category);
    formData.append("discount", discount);
    formData.append("brandValue", brandValue);
    formData.append("productColorValue", productColor.join(","));
    formData.append("productSizeValue", productSize.join(","));
    formData.append("productFlagValue", productFlagValue);
    formData.append("subcategory", subcategory);
    formData.append("childCategory", childCategory);
    formData.append("galleryItemCount", gallery.length);
    formData.append("colorAndSize", JSON.stringify(colorAndSize));

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
      console.error(err, "submit product error");
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

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

  console.log(setupConfig, "setupConfig");

  return (
    <div className="p-6 pt-0">
      <div className="">
        <p className="text-3xl font-semibold header mb-9">Add New Product</p>
        <form onSubmit={handleSubmit}>
          {/* Product Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="customInput"
              placeholder="Enter Product Name Here"
              // required
            />
          </div>
          <div className={"flex items-center gap-6 mb-6 mt-5"}>
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
              <label className="block text-gray-700 text-xl font-semibold mb-4">
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
              <label className="block text-gray-700 font-semibold mb-4 text-xl">
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
              <label className="block text-gray-700 font-semibold mb-4 text-xl">
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
              <label className="block text-gray-700 font-semibold mb-4 text-xl">
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
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold ">
                Price (BDT)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="customInput"
                // required
              />
            </div>
            {/* <div>
              <label className="block text-gray-700 font-semibold ">
                Discount Price
              </label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="customInput"
              />
            </div> */}

            {setupConfig?.rewardPoints && (
              <div>
                <label className="block text-gray-700 font-semibold ">
                  Reward Points
                </label>
                <input
                  type="number"
                  value={rewardPoints}
                  onChange={(e) => setRewardPoints(e.target.value)}
                  className="customInput"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-semibold ">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  setVirtualStock(e.target.value);
                }}
                className="customInput"
              />
            </div>
            {/* Product Code */}

            {setupConfig?.productCode && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold ">
                  Product Code
                </label>
                <input
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="customInput"
                  placeholder="Product Code"
                />
              </div>
            )}
          </div>

          <div className={"grid grid-cols-3 gap-4 mb-4"}>
            {/* Select Category */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold ">
                Select Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="customInput select"
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
              <label className="block text-gray-700 font-semibold ">
                Select Subcategory
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="customInput select"
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
              <label className="block text-gray-700 font-semibold ">
                Select Child Categories
              </label>
              <select
                value={childCategory}
                onChange={(e) => setChildCategory(e.target.value)}
                className="customInput select"
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
              <label className="block text-gray-700 font-semibold ">
                Select Brand
              </label>
              <select
                value={brandValue}
                onChange={(e) => setBrandValue(e.target.value)}
                className="customInput select"
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

            {/* Select Subcategory */}

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

            {/* {setupConfig?.productColor && (
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
            )} */}

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

            {/* {setupConfig?.productSize && (
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
            )} */}
          </div>

          {/* File Upload for Thumbnail */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Thumbnail Image
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
            <label className="block text-gray-700 font-semibold mb-2">
              Product Image Gallery
            </label>

            <DragMultiUploadImageInput
              getRootProps={getGalleryRootProps}
              getInputProps={getGalleryInputProps}
              image={gallery}
              imagePreview={galleryPreview}
              setImagePreview={setGalleryPreview}
              setGallery={setGallery}
            />
          </div>

          <EditableTableColumn
            productColors={productColors}
            productSizes={productSizes}
            quantity={quantity}
            setQuantity={setQuantity}
            colorAndSize={colorAndSize}
            setColorAndSize={setColorAndSize}
            totalQuantity={virtualStock}
            setTotalQuantity={setVirtualStock}
            stock={stock}
          />

          <div className="border rounded-2xl p-6 bg-gray-50 pb-0">
            {/* Toggle for Special Offer */}

            <SwitchInput
              label="Has Variants?"
              checked={hasVariants}
              onChange={setHasVariants}
            />
            <SwitchInput
              label="Is Featured?"
              checked={isFeatured}
              setChecked={setIsFeatured}
            />
            <SwitchInput
              label="Special Offer?"
              checked={specialOffer}
              setChecked={setSpecialOffer}
            />

            {specialOffer && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold ">
                  Special Offer Price As Discount
                </label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="customInput"
                  placeholder="Enter Special Offer Price As Discount"
                />
              </div>
            )}

            <SwitchInput
              label="Is Recommended"
              checked={isRecommended}
              setChecked={setIsRecommended}
            />
            <SwitchInput label="Is New" checked={isNew} setChecked={setIsNew} />
          </div>

          {/* SEO Information */}

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
          <div className="flex justify-end gap-5">
            <button type="button" className="customCancelButton">
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`customSaveButton`}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner mr-2  loading-xs"></span>
                  Saving Product ..
                </>
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
