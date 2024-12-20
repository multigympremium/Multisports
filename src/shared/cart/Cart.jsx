"use client";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import CartItemComponent from "./CartItemComponent";
import { Link } from "react-router-dom";
import calculateDiscounts from "../../helpers/calculateDiscount";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Cart = ({ isShow, setIsShow }) => {
  const { cartItems, removeFromCart, updateCartQuantity, totalPrice } =
    useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState({});

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

  const discount = calculateDiscounts(
    cartItems,
    discounts,
    discounts.promoCode,
    discounts.promoCodes
  ).totalDiscount;

  return (
    <div
      className={`w-full min-w-[40%] max-w-[60%] bg-white h-screen rounded-lg shadow-lg p-4 absolute top-0 right-0 z-50 transition-all duration-500 pr-10 pl-5 flex flex-col ${
        isShow ? "translate-x-0" : "translate-x-full"
      }`}
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
          <span className="font-medium">${totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>discounts</span>
          <span className="font-medium">-${discount}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>shipping</span>
          <span className="font-medium">free</span>
        </div>
      </div>

      <div className="border-b pb-4 mt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>your total</span>
          <span>${totalPrice - discount}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4 text-center">
        <Link
          to={"/cart"}
          className="col-span-2"
          onClick={() => setIsShow(false)}
        >
          <button className="  text-sm border border-black rounded-md px-5 py-2 w-full">
            View Cart
          </button>
        </Link>

        <Link
          to={"/checkout"}
          className="col-span-2"
          onClick={() => setIsShow(false)}
        >
          <button
            type="button"
            className="px-4 py-2 bg-black text-white rounded w-full"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
