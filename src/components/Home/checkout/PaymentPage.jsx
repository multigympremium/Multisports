import { useContext, useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { AuthContext, useAuth } from "../../../providers/AuthProvider";
import Container from "../../../shared/Container";
import ShippingForm from "../Shipping/ShippingForm";
import ViewCart from "../../../shared/cart/viewCart/ViewCart";
import Summary from "../../../shared/cart/viewCart/Summary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import AccountAddress from "../my-account/AccountAddress";
import PromotionalBanner from "../../UI/PromotionalBanner";

export default function PaymentPage() {
  const { cartItems } = useContext(AuthContext);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [totalCartDiscount, setTotalCartDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const [shippingAddress, setShippingAddress] = useState(null);
  const [isShippingEdit, setIsShippingEdit] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

  useEffect(() => {
    setTotalPrice(location?.state?.order?.total);
    setTotalCartDiscount(location?.state?.order?.itemPerDiscount);
    setDiscount(location?.state?.order?.discount);
    setDeliveryCharge(location?.state?.order?.deliveryCharge);
  }, [location]);

  const submitOrder = async () => {
    navigate(`/order_summary`, {
      state: {
        order: location?.state?.order,
      },
    });
  };

  return (
    <Container>
      <div>
        <div className="text-base text-gray-500 md:mb-8 border-b border-gray-300 flex gap-3 items-center mt-10 pb-4 ">
          <IoHome /> Multisports {`>`} Payment
        </div>
        <div className="w-full md:max-w-[75%] inline-block ">
          <div className="w-full shadow-lg p-6 rounded-md mb-4 bg-white">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
              Select Payment Method
            </h2>
            <div className="space-y-4">
              <div
                className="w-full"
                onClick={() => setSelectedPaymentMethod("cash")}
              >
                <button
                  className="p-8 rounded-md border border-gray-200 bg-white hover:bg-gray-100 w-full flex gap-5 items-center"
                  //   onClick={submitOrder}
                >
                  <span
                    className={`w-5 h-5 rounded-full border border-black ${
                      selectedPaymentMethod === "cash" ? "bg-black" : ""
                    }`}
                  ></span>
                  <img src="tk.png" alt="bkash" className="w-16 border" /> Cash
                  On Delivery
                </button>
                {/* <button
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={submitBkash}
        >
          <img src="bkash.webp" alt="bkash" className="w-16" />
        </button> */}
              </div>
              {/* <div
                className="w-full"
                onClick={() => setSelectedPaymentMethod("bkash")}
              >
                <button
                  className="p-8 rounded-md border border-gray-200 bg-white hover:bg-gray-100 w-full flex gap-5 items-center"
                  //   onClick={submitOrder}
                >
                  <span
                    className={`w-5 h-5 rounded-full border border-black ${
                      selectedPaymentMethod === "bkash" ? "bg-black" : ""
                    }`}
                  ></span>
                  <img src="bkash.webp" alt="bkash" className="w-16 border" />{" "}
                  Bkash
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-full md:max-w-[23%] md:sticky md:top-[150px]  md:inline-block md:float-right">
          <div className="border p-6 md:mt-auto rounded-md shadow-lg w-full mt-6  md:max-w-[350px]">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Per-Product Total Discount</span>
              <span className="font-medium text-red-400">
                -${totalCartDiscount}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <b className="font-bold text-lg">Discounts</b>
              <span className="font-medium text-red-400">-${discount}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <b className="font-bold text-lg">Shipping</b>
              <span className="font-medium">৳{deliveryCharge || 0}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <b className="font-bold text-lg">Total</b>
              <span className="font-medium">৳{totalPrice - discount}</span>
            </div>
            <button
              // onClick={() => setIsShowPaymentMethod(true)}
              onClick={submitOrder}
              className="bg-green-500 text-white text-sm py-2 px-4 rounded-md mt-4 disabled:bg-gray-200 disabled:text-black w-full"
            >
              Go To Order
            </button>
          </div>
        </div>
      </div>

      <BgBlurModal
        isShowModal={isShippingEdit}
        setIsShowModal={setIsShippingEdit}
      >
        {user ? (
          <AccountAddress setIsShow={setIsShippingEdit} />
        ) : (
          <ShippingForm
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            setIsShowModal={setIsShippingEdit}
            isShowModal={isShippingEdit}
          />
        )}
      </BgBlurModal>
    </Container>
  );
}
