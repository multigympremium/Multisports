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
}) => {
  console.log(colors, "colors");
  const [product, setProduct] = useState({});
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

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    setQuantity(cartItems.find((item) => item._id === object_id)?.quantity);

    if (isShowModal === false) {
      setColor("");
      setSize("");
    }
  }, [cartItems, object_id, isShowModal]);

  useEffect(() => {
    const copy_product = { ...product, quantity: 1 };
    copy_product.color = color;
    copy_product.size = size;
    setProduct(copy_product);
  }, [size, color]);

  console.log(size, color, "size, color", product, "product");
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
              {sizes.map((size) => (
                <button
                  key={size}
                  className="border text-xs md:text-sm shadow-sm w-7 h-7 md:w-10 md:h-10 hover:border-gray-500 duration-300 ease-in-out rounded-lg"
                >
                  {size}
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
                  className="border flex items-center border-gray-100 duration-300 ease-in-out  hover:border-gray-400 justify-center p-[3px] md:p-1 rounded-md"
                >
                  <button
                    style={{ backgroundColor: color }}
                    className={`md:w-8 md:h-8 w-7 h-7 rounded-md`}
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
                      product._id,
                      product?.quantity + 1,
                      color,
                      size
                    )
                  }
                  disabled={
                    (product?.stock <= 0 && color === "") || size === ""
                    // product?.quantity >= product?.stock ||
                  }
                >
                  -
                </button>
                <span className="w-10 border-x text-center">{quantity}</span>
                <button
                  className="w-7"
                  onClick={() =>
                    updateCartQuantity(
                      product._id,
                      product?.quantity + 1,
                      color,
                      size
                    )
                  }
                  disabled={
                    (product?.stock <= 0 && color === "") || size === ""
                    // product?.quantity >= product?.stock ||
                  }
                >
                  +
                </button>
              </div>
              <button
                className="md:py-3 py-2 rounded-lg text-sm md:text-base font-semibold bg-black text-white w-full md:flex-1"
                onClick={() => {
                  addToCart(product, color, size);
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
