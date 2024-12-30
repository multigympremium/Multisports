import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import useAxiosCourier from "../../../Hook/useAxiosCourier";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import RelatedProducts from "../../../components/partial/RelatedProducts/RelatedProducts";

const ProductDetails = () => {
  const product_id = useParams().id;
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosPublic.get(`/products/${product_id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("done");
      }
    };
    fetchProduct();
  }, [axiosPublic]);

  const {
    brandValue,
    category,
    childCategory,
    discountPrice,
    fullDescription,
    gallery,
    hasVariants,
    isNew,
    isRecommended,
    metaDescription,
    metaKeywords,
    metaTitle,
    price,
    productCode,
    productColorValue,
    productFlagValue,
    productSizeValue,
    productTitle,
    returnPolicy,
    rewardPoints,
    shortDescription,
    specialOffer,
    specification,
    stock,
    subcategory,
    thumbnail,
    updatedAt,
    wishCount,
    colorAndSize,
  } = product;

  console.log(category, "category");

  const [trackingProduct, setTrackingProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  // const [sizes, setSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail || "");

  const {
    cartItems,
    removeFromCart,
    addToCart,
    updateCartQuantity,
    totalPrice,
    setCartItems,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeDescription, setActiveDescription] = useState("full_desc");

  const [selectedColor, setSelectedColor] = useState({});
  const [sizeArray, setSizeArray] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});

  useEffect(() => {
    setQuantity(
      cartItems.find((item) => item._id === product_id)?.quantity || 0
    );

    if (colorAndSize && quantity == 0 && cartItems.length == 0) {
      setSelectedColor(colorAndSize[0]?.color || {});
      setSelectedSize(colorAndSize[0]?.size[0] || {});
      setSizeArray(colorAndSize[0]?.size || []);
    }
  }, [cartItems, product_id, colorAndSize]);

  useEffect(() => {
    const currentItem = cartItems.find(
      (item) =>
        item._id === product_id &&
        item.color === selectedColor?.value &&
        item.size === selectedSize?.value
    );
    console.log(currentItem, "currentItem");
    if (currentItem) {
      setTrackingProduct(currentItem);
      setQuantity(currentItem.quantity);
    } else {
      const copy_product = {
        ...product,
        quantity: trackingProduct.quantity || 1,
      };
      copy_product.color = selectedColor?.value;
      copy_product.size = selectedSize?.value;
      setTrackingProduct(copy_product);
      setQuantity(0);
    }
    console.log(currentItem, "copy_product");
  }, [selectedSize, selectedColor, product, cartItems]);

  //   console.log(colorAndSize[0]?.size[0], "colorAndSize[0]?.size[0]");

  // Determine grid columns based on the total number of images
  const getGridCols = (totalImages) => {
    if (totalImages <= 4) return "grid-cols-4"; // 4 items or less
    if (totalImages <= 6) return "grid-cols-6"; // Up to 6 items
    return "grid-cols-8"; // More than 6 items
  };

  // useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         setLoading(true);
  //         const res = await axiosSecure.get(`/products?${query}`);

  //         if (res.status === 200 || res.status === 201) {
  //           setProducts(res.data.data);
  //           setLoading(false);
  //           setTotalItems(res.data.totalItems);
  //           setTotalPages(res.data.totalPages);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching Products:", error);
  //         setLoading(false);
  //         throw new Error("Failed to fetch Products");
  //       }
  //     };

  //     fetchProducts();
  //   }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);
  return (
    <div className="w-[95%] md:max-w-[1440px] mx-auto pt-5 py-9">
      {/* If product exists */}
      {product && (
        <section className="flex flex-col  md:flex-row">
          {/* image div */}
          <div className="w-full p-10">
            {/* Main Image */}
            <img
              src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${
                currentImage || thumbnail
              }`}
              alt="Product"
              className="w-full rounded-lg"
            />

            {/* Thumbnails */}

            {gallery && (
              <div
                className={`grid  ${getGridCols(
                  gallery.length + 1
                )}  gap-3 mt-5`}
              >
                {gallery.map((item, index) => (
                  <img
                    key={index}
                    src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${item.image}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover cursor-pointer rounded-lg hover:ring-2 hover:ring-gray-400 transition duration-200"
                    onClick={() => setCurrentImage(item.image)}
                  />
                ))}
              </div>
            )}
          </div>
          {/* content div */}
          <div className=" w-full p-10">
            <h1 className="text-3xl font-bold tracking-wider mb-2 md:mb-3 text-gray-700">
              {productTitle}
            </h1>
            <p className="text-lg tracking-wider text-gray-600 ">
              <HtmlText htmlContent={fullDescription} />
            </p>
            {/* price */}
            <div className="flex items-center gap-6 my-5">
              <p className="font-bold text-3xl">
                BDT{" "}
                {discountPrice
                  ? parseInt(price) - parseInt(discountPrice)
                  : price}
                .00
              </p>
              {/* if dicount available */}
              {parseInt(discountPrice) > 0 && (
                <p className="line-through opacity-50 font-semibold  text-xl md:text-2xl">
                  BDT {price}.00
                </p>
              )}
            </div>
            <div className="border-b w-full" /> {/* horizontal ruler */}
            {/* size */}
            <div className="mt-5">
              <p className="font-semibold text-xl">Size</p>
              <div className="flex gap-2">
                {sizeArray.map((size) => (
                  <button
                    key={size}
                    className={`border text-xs md:text-sm shadow-sm w-7 h-7 md:w-10 md:h-10 hover:border-gray-500 duration-300 ease-in-out rounded-lg ${
                      size.value === selectedSize.value
                        ? "bg-neutral-500 text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size?.label}
                  </button>
                ))}
              </div>
            </div>
            {/* color */}
            <div className="mt-5">
              <p className="font-semibold text-xl">Color</p>
              <div className="flex gap-5 mt-4">
                {colorAndSize?.length > 0 &&
                  colorAndSize?.map((color, index) => (
                    <div
                      key={index}
                      className={`border flex items-center border-gray-100 duration-300 ease-in-out  hover:border-gray-400 justify-center p-[3px] md:p-1 rounded-md ${
                        selectedColor?.value === color?.color?.value
                          ? "border-neutral-700 text-white shadow-md"
                          : ""
                      }`}
                    >
                      <button
                        style={{ backgroundColor: color?.color?.value }}
                        className={`md:w-8 md:h-8 w-7 h-7 rounded-md`}
                        onClick={() => {
                          setSelectedColor(color.color);
                          setSizeArray(color.size);
                        }}
                      ></button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="border-b w-full my-6" /> {/* horizontal ruler */}
            {/* quantity and add to cart */}
            <div className="flex md:block ">
              {/* Quantity and Actions */}
              <div className="flex flex-row items-center gap-4 mb-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    className="w-16 text-center text-xl py-3 md:h-12"
                    onClick={() =>
                      updateCartQuantity(
                        trackingProduct._id,
                        quantity - 1,
                        selectedColor.value,
                        selectedSize.value
                      )
                    }
                    disabled={
                      product?.stock <= 0 || quantity == 0

                      // product?.quantity >= product?.stock ||
                    }
                  >
                    -
                  </button>
                  <span className="w-20 border-x text-xl text-center">
                    {quantity}
                  </span>
                  <button
                    className="w-16 text-xl"
                    onClick={() => {
                      if (quantity > 1) {
                        updateCartQuantity(
                          product._id,
                          quantity + 1,
                          selectedColor?.value,
                          selectedSize?.value
                        );
                      } else {
                        addToCart(
                          product,
                          selectedColor.value,
                          selectedSize.value
                        );
                      }
                    }}
                    disabled={
                      product?.stock <= 0
                      // product?.quantity >= product?.stock ||
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="md:py-3 max-w-fit px-3 md:px-28 py-2 rounded-lg text-sm md:text-base font-semibold bg-black text-white w-auto md:flex-1"
                  onClick={() => {
                    addToCart(product, selectedColor.value, selectedSize.value);
                    // setProduct((prev) => ({
                    //   ...prev,
                    //   quantity: quantity + 1,
                    // }));
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="border-b w-full my-6" /> {/* horizontal ruler */}
            {/* info */}
            <div>
              <p className="font-medium mb-3">
                Sub Category :{" "}
                <span className="font-light"> {subcategory}</span>
              </p>
              <p className="font-medium ">
                Category : <span className="font-light"> {category}</span>
              </p>
              <p></p>
            </div>
            {/* accordian */}
            <section className="my-5  space-y-3">
              <div className="collapse collapse-plus border-b rounded-none">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title  px-0 text-xl font-medium">
                  Product Description
                </div>
                <div className="collapse-content  px-0 mt-2 tracking-wider">
                  <p className="mb-2">
                    <HtmlText htmlContent={shortDescription} />
                  </p>
                </div>
              </div>
              <div className="collapse collapse-plus border-b rounded-none">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title px-0 text-xl font-medium">
                  Specification
                </div>
                <div className="collapse-content px-0 mt-2 tracking-wider">
                  <p className="mb-2">
                    <HtmlText htmlContent={specification} />
                  </p>
                </div>
              </div>
              <div className="collapse collapse-plus border-b rounded-none">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl  px-0 font-medium">
                  Return Policy
                </div>
                <div className="collapse-content mt-2  px-0 tracking-wider">
                  <p className="mb-2">
                    <HtmlText htmlContent={returnPolicy} />
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
      <RelatedProducts category={category && category} />
    </div>
  );
};

const HtmlText = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
export default ProductDetails;
