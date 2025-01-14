import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import CartItemComponent from "./CartItemComponent";
import { Link, useNavigate } from "react-router-dom";
import calculateDiscounts from "../../helpers/calculateDiscount";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Cart = ({ isShow, setIsShow }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    totalPrice,
    totalCartDiscount,
  } = useContext(AuthContext);

  const [discounts, setDiscounts] = useState({});
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await axiosPublic.get("discount");

      console.log(response, "response");

      if (response?.data) {
        setDiscounts(response?.data?.data[0]);
      }
    };
    fetchDiscounts();
  }, [axiosPublic]);

  const discount = calculateDiscounts(cartItems, discounts)?.totalDiscount;

  return (
    <div className="drawer rounded-none drawer-end z-[99]">
      <input id="my-cart" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-cart"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div
          className={`min-w-[400px] rounded-none bg-white h-screen p-4 absolute top-0 right-0 z-50 transition-all duration-500 px-5 flex flex-col`}
        >
          <div className="text-2xl py-3  font-bold mb-6 border-b pb-5 border-gray-200">
            Shopping cart
          </div>

          <div
            className=" pb-4 h-full overflow-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {cartItems?.length > 0 ? (
              cartItems?.map((item, index) => (
                <CartItemComponent
                  item={item}
                  updateCartQuantity={updateCartQuantity}
                  removeFromCart={removeFromCart}
                  key={index}
                  isCartArea={true}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 h-full w-full">
                <h3>Empty Cart</h3>
                <p>Please Add Product to View</p>
                <Link
                  to={"/products/all"}
                  className="bg-gray-900 text-white hover:bg-neutral-800 rounded-lg py-2 px-5"
                >
                  Go To Shop
                </Link>
              </div>
            )}
          </div>

          {/* <div className="border-b pb-4 mt-auto pt-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>subtotal</span>
              <span className="font-medium">৳{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Per-Product Total Discount</span>
              <span className="font-medium">-৳{totalCartDiscount}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>discounts</span>
              <span className="font-medium">-৳{Number(discount)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>shipping</span>
              <span className="font-medium">free</span>
            </div>
          </div> */}

          {/* <div className="border-b pb-4 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>your total</span>
              <span>৳{totalPrice - Number(discount)}</span>
            </div>
          </div> */}

          <div className="flex gap-3">
            <label
              className=" border text-center border-black rounded-md px-4 py-3 w-full"
              onClick={() => {
                setIsShow(false);
                navigate("/cart");
              }}
              htmlFor="my-cart"
            >
              View Cart
            </label>

            <label
              type="button"
              className="px-4d py-3 bg-black text-center text-white rounded-lg w-full"
              onClick={() => {
                setIsShow(false);
                navigate("/checkout");
              }}
              htmlFor="my-cart"
            >
              Checkout <span className="text-xl ml-2"> ৳</span>{" "}
              {totalPrice - Number(discount)}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
