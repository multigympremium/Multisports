"use client";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import BgBlurModal from "../../Modal/BgBlurModal";
import PaymentMethodModal from "./PaymentMethodModal";
import { set } from "react-hook-form";
import CourierMethodModal from "./CourierMethodModal";

export default function Summary({
  isCart = false,
  shippingAddress = null,
  cartItems = [],
}) {
  const { totalPrice } = useContext(AuthContext);

  const discount = 17.4;
  const axiosSecure = useAxiosPublic();
  const router = useNavigate();
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isShowCourier, setIsShowCourier] = useState(false);
  const [courierMethod, setSetCourierMethod] = useState("");

  // store_id: item.store_id,
  //     merchant_order_id: generateInvoiceId(),
  //     recipient_name: data.name,
  //     recipient_phone: data.contact_number,
  //     recipient_secondary_phone: data.secondary_contact,
  //     recipient_address: data.address,
  //     recipient_city: data.city_id,
  //     recipient_zone: data.zone_id,
  //     recipient_area: data.area_id,
  //     delivery_type: 48,
  //     is_point_delivery: false,
  //     item_type: 2,
  //     special_instruction: data.special_instruction,
  //     item_quantity: item.itemCount,
  //     item_weight: item.weight,
  //     item_description: item.itemDescription,
  //     amount_to_collect: item.total,

  

  // const submitOrder = async () => {
  //   const submitOrderData = {
  //     recipient_name: shippingAddress.name,
  //     recipient_phone: shippingAddress.contact_number,
  //     recipient_secondary_phone: shippingAddress.secondary_contact,
  //     recipient_address: shippingAddress.address,
  //     recipient_city: shippingAddress.city_id,
  //     recipient_zone: shippingAddress.zone_id,
  //     recipient_area: shippingAddress.area_id,
  //     special_instruction: shippingAddress.special_instruction,
  //     items: items,
  //     payment_method: "cash",
  //     total: totalPrice,
  //   };
  //   try {
  //     const response = await axiosSecure.post("/orders", submitOrderData);
  //     console.log(response);

  //     if (response.data.success) {
  //       return router("/success");
  //     }

  //     Swal.fire({
  //       title: "Error",
  //       text: response.data.message,
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       title: "Error",
  //       text: error.message,
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };
  return (
    <>
      <div className="border p-6 mt-auto rounded-md shadow-lg w-full max-w-[350px]">
        <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
          Order Summary
        </h2>
        <div className="flex justify-between text-sm text-gray-500">
          <b className="font-bold text-lg">Total</b>
          <span className="font-medium">${totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <b className="font-bold text-lg">Discounts</b>
          <span className="font-medium">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <b className="font-bold text-lg">Shipping</b>
          <span className="font-medium">free</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <b className="font-bold text-lg">Payment Method</b>
          <span className="font-medium">Cash</span>
        </div>

        {isCart ? (
          <Link href="/checkout">
            <button className="bg-black text-white text-sm py-2 px-4 rounded-md mt-4">
              Proceed to Checkout
            </button>
          </Link>
        ) : (
          <button
            onClick={() => setIsShowCourier(true)}
            className="bg-black text-white text-sm py-2 px-4 rounded-md mt-4 disabled:bg-gray-200 disabled:text-black"
            disabled={shippingAddress && cartItems.length > 0 ? false : true}
          >
            Go To Payment
          </button>
        )}
      </div>

      <BgBlurModal
        isShowModal={isShowPaymentMethod}
        setIsShowModal={setIsShowPaymentMethod}
      >
        <PaymentMethodModal
          setIsShowPaymentMethod={setIsShowPaymentMethod}
          isShowPaymentMethod={isShowPaymentMethod}
          courierMethod={courierMethod}
          shippingAddress={shippingAddress}
          cartItems={cartItems}
        />
      </BgBlurModal>

      <BgBlurModal
        isShowModal={isShowCourier}
        setIsShowModal={setIsShowCourier}
      >
        <CourierMethodModal
          setCourierMethod={setSetCourierMethod}
          setIsShowPaymentMethod={setIsShowPaymentMethod}
          setIsShow={setIsShowCourier}
        />
      </BgBlurModal>
    </>
  );
}
