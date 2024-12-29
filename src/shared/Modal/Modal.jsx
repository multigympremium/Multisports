import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { IoClose } from "react-icons/io5";

const Modal = ({
  id,
  title,
  object_id,
  price,
  description,
  image,
  sizes,
  colors,
  setIsShowModal,
  isShowModal,
  product,
}) => {
  console.log(colors, "colors");
  const [trackingProduct, setTrackingProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  // const [sizes, setSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail || "");
  const axiosPublic = useAxiosPublic();
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
      cartItems.find((item) => item._id === object_id)?.quantity || 0
    );

    if (isShowModal === false) {
      setSelectedColor({});
      setSelectedSize({});
    }
    if (isShowModal === true && cartItems.length == 0) {
      setSelectedColor(colors[0]?.color || {});
      setSelectedSize(colors[0]?.size[0] || {});
      setSizeArray(colors[0]?.size || []);
    }
  }, [cartItems, object_id, isShowModal, colors]);

  useEffect(() => {
    const currentItem = cartItems.find(
      (item) =>
        item._id === object_id &&
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

  console.log(selectedSize, selectedColor, "size, color", product, "product");
  return (
    <dialog id={id} className="modal relative">
      <div className=" modal-box p-0 rounded max-w-4xl w-[90%] mx-auto md:w-full flex flex-col md:flex-row">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute focus:outline-none right-2 top-2">
            ✕
          </button>
        </form>

        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 px-4 py-4 md:p-6 flex flex-col justify-between">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-500 mb-2 text-xs md:text-sm">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </p>

          <div className="text-xl md:text-2xl font-semibold mb-4">
            BDT {price}.00
          </div>

          {/* Size Options */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size</h3>
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

          {/* Color Options */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Color {colors.length}</h3>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`border flex items-center border-gray-100 duration-300 ease-in-out  hover:border-gray-400 justify-center p-[3px] md:p-1 rounded-md ${
                    selectedColor?.value === color?.color?.value
                      ? "bg-neutral-500 text-white"
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

          <div className="flex md:block ">
            {/* Quantity and Actions */}
            <div className="flex flex-row w-full items-center gap-4 mb-4">
              <div className="flex items-center border rounded-lg">
                <button
                  className="w-7 text-center py-2 md:h-11"
                  onClick={() =>
                    updateCartQuantity(
                      trackingProduct._id,
                      quantity - 1,
                      selectedColor.value,
                      selectedSize.value
                    )
                  }
                  disabled={
                    product?.stock <= 0 || quantity == 1

                    // product?.quantity >= product?.stock ||
                  }
                >
                  -
                </button>
                <span className="w-10 border-x text-center">{quantity}</span>
                <button
                  className="w-7"
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
                className="md:py-3 py-2 rounded-lg text-sm md:text-base font-semibold bg-black text-white w-full md:flex-1"
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

          <Link to={`/product_details/${object_id}`}>
            <button className="md:py-3 font-semibold text-sm py-2 md:text-base rounded-lg text-white w-full  bg-black">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
