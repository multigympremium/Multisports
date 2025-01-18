import { useContext, useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { AuthContext, useAuth } from "../../../providers/AuthProvider";
import Container from "../../../shared/Container";
import ShippingForm from "../Shipping/ShippingForm";
import ViewCart from "../../../shared/cart/viewCart/ViewCart";
import Summary from "../../../shared/cart/viewCart/Summary";
import { Link } from "react-router-dom";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import AccountAddress from "../my-account/AccountAddress";
import PromotionalBanner from "../../UI/PromotionalBanner";

export default function CheckoutPage() {
  const { cartItems } = useContext(AuthContext);
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(null);
  const [isShippingEdit, setIsShippingEdit] = useState(false);

  useEffect(() => {
    const localShippingAddress = localStorage.getItem("shippingAddress");
    if (localShippingAddress) {
      setShippingAddress(JSON.parse(localShippingAddress));
    }
  }, [isShippingEdit]);

  return (
    <Container>
      {cartItems.length > 0 ? (
        <div>
          <div className="text-base text-gray-500 md:mb-8 border-b border-gray-300 flex gap-3 items-center mt-10 pb-4 ">
            <IoHome /> Multisports {`>`} Cart
          </div>
          <div className="w-full md:max-w-[75%] inline-block">
            {shippingAddress ? (
              <div className="w-full mx-auto p-6 border rounded-md mb-12 relative">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 rounded-md">
                  <div className="border p-6 rounded-md border-r border-gray-200">
                    <div className="flex justify-between text-sm text-gray-500">
                      <b className="font-bold text-lg">Name</b>
                      <span className="font-medium">
                        {shippingAddress.recipientName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 ">
                      <b className="font-bold text-lg">Phone</b>
                      <span className="font-medium">
                        {shippingAddress.contact_number}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 ">
                      <b className="font-bold text-lg">City</b>
                      <span className="font-medium">
                        {shippingAddress.city_name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 ">
                      <b className="font-bold text-lg">Zone</b>
                      <span className="font-medium">
                        {shippingAddress.zone_name}
                      </span>
                    </div>
                  </div>
                  <div className="border p-6 rounded-md border-r border-gray-200">
                    <div className="flex justify-between text-sm text-gray-500">
                      <b className="font-bold text-lg">Area</b>
                      <span className="font-medium">
                        {shippingAddress.area_name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 ">
                      <b className="font-bold text-lg">Address</b>
                      <span className="font-medium">
                        {shippingAddress.address}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 ">
                      <b className="font-bold text-lg">Secondary Number</b>
                      <span className="font-medium">
                        {shippingAddress.secondaryContactNumber}
                      </span>
                    </div>
                  </div>

                  <button
                    className="px-3 py-1 border border-blue-400 rounded-md absolute top-5 right-5"
                    onClick={() => setIsShippingEdit(true)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <ShippingForm
                setShippingAddress={setShippingAddress}
                shippingAddress={shippingAddress}
                setIsShippingEdit={setIsShippingEdit}
              />
            )}

            <div
              className="w-full max-h-[500px] overflow-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              <ViewCart />
            </div>
          </div>
          <div className="w-full md:max-w-[23%] md:sticky md:top-[150px]  md:inline-block md:float-right">
            <Summary shippingAddress={shippingAddress} cartItems={cartItems} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-full gap-4 py-20">
          <img src={"/nodata.jpg"} alt={"No Data"} width={400} height={400} />
          <h3>Empty Cart</h3>
          <p>Please Add Product to View</p>
          <Link
            to={"/products/all"}
            className="bg-blue-500 text-white hover:bg-neutral-800 rounded-lg py-2 px-5"
          >
            Go To Shop
          </Link>

          <PromotionalBanner />
        </div>
      )}

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
