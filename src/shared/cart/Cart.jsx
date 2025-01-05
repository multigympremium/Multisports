"use client";
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
    <div className="drawer drawer-end z-[99]">
      <input id="my-cart" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-cart"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div
          className={`w-full min-w-[40%] max-w-[60%] bg-white h-screen rounded-lg shadow-lg p-4 absolute top-0 right-0 z-50 transition-all duration-500 pr-10 pl-5 flex flex-col`}
        >
          <div className="text-sm text-gray-500 mb-2 border-b border-gray-300">
            your shopping cart
          </div>

          <div
            className="border-b pb-4 h-full overflow-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {cartItems?.length > 0 ? (
              cartItems?.map((item) => (
                <CartItemComponent
                  item={item}
                  updateCartQuantity={updateCartQuantity}
                  removeFromCart={removeFromCart}
                  key={item._id}
                  isCartArea={true}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 h-full w-full">
                <h3>Empty Cart</h3>
                <p>Please Add Product to View</p>
                <Link
                  to={"/products/all"}
                  className="bg-blue-500 text-white hover:bg-neutral-800 rounded-lg py-2 px-5"
                >
                  Go To Shop
                </Link>
              </div>
            )}
          </div>

          <div className="border-b pb-4 mt-auto pt-2">
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
          </div>

          <div className="border-b pb-4 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>your total</span>
              <span>৳{totalPrice - Number(discount)}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <label
              className="  text-sm border border-black rounded-md px-5 py-2 w-full"
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
              className="px-4 py-2 bg-black text-white rounded w-full"
              onClick={() => {
                setIsShow(false);
                navigate("/checkout");
              }}
              htmlFor="my-cart"
            >
              Checkout
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
