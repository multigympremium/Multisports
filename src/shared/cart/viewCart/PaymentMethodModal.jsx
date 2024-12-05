import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosCourier from "../../../Hook/useAxiosCourier";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";

export default function PaymentMethodModal({
  isShow,
  setIsShow,
  shippingAddress,
  courierMethod,
  cartItems,
}) {
  const axiosSecure = useAxiosPublic();
  const axiosCourier = useAxiosCourier();
  const router = useNavigate();

  const { totalPrice } = useContext(AuthContext);

  // const accessToken = useCourierAccessToken()

  // console.log(accessToken, "accessToken")

  // const submitOrder = async () => {
  //   try {
  //       const response = await axiosSecure.post('/orders', {
  //           shipping_address_id: shippingAddress._id,
  //           products: cartItems,
  //           payment_method: 'cash',
  //           total: totalPrice
  //       });
  //       console.log(response);

  //       if (response.data.success) {
  //          return router("/success")
  //       }

  //       Swal.fire({
  //           title: 'Error',
  //           text: response.data.message,
  //           icon: 'error',
  //           confirmButtonText: 'OK'
  //       })
  //   } catch (error) {
  //       console.log(error);
  //       Swal.fire({
  //           title: 'Error',
  //           text: error.message,
  //           icon: 'error',
  //           confirmButtonText: 'OK'
  //       })
  //   }
  // }

  const items = [
    {
      productTitle: "MENS CASUAL SHIRT",
      shortDescription: "Short Description",
      fullDescription:
        '<p><strong style="color: rgb(55, 65, 81);">Full Description</strong></p>',
      price: 522,
      discountPrice: 5,
      rewardPoints: 5,
      stock: 5,
      productCode: "54545",
      metaTitle: "kk",
      metaKeywords: "hg",
      metaDescription: "hg",
      specialOffer: true,
      hasVariants: true,
      thumbnail: "1728189072154-58acca94f0313e0f56c2b0aab45c9257.webp",
      category: "Running",
      brandValue: "Apple",
      productColorValue: "#2aa73be8",
      productSizeValue: "lg",
      productFlagValue: "Flag Name Testing",
      modelOfBrandValue: "one_t_5",
      store_id: 126,
      quantity: 1,
      weight: "0.5",
      size: "lg",
      color: "black",
    },
  ];

  const submitOrder = async () => {
    const submitOrderData = {
      name: shippingAddress.recipientName,
      phone: shippingAddress.contact_number,
      secondary_phone: shippingAddress.secondaryContactNumber,
      address: shippingAddress.address,
      city_id: shippingAddress.city_id,
      city_name: shippingAddress.city_name,
      zone_id: shippingAddress.zone_id,
      area_id: shippingAddress.area_id,
      area_name: shippingAddress.area_name,
      special_instruction: shippingAddress.special_instruction,
      items: items,
      payment_method: "cash",
      total: totalPrice,
      // courierMethod: courierMethod,
      itemCount: items.length,
    };
    try {
      const response = await axiosSecure.post("/orders", submitOrderData);
      console.log(response);

      if (response.data.success) {
        return router("/success");
      }

      Swal.fire({
        title: "Error",
        text: response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const submitBkash = async () => {
    // try {
    //     const response = await axiosSecure.post('/orders', {
    //         shipping_address_id: shippingAddress._id,
    //         products: cartItems,
    //         payment_method: 'bkash',
    //         total: totalPrice
    //     });
    //     console.log(response);

    //     if (response.data.success) {
    //        return router("/success")
    //     }

    //     Swal.fire({
    //         title: 'Error',
    //         text: response.data.message,
    //         icon: 'error',
    //         confirmButtonText: 'OK'
    //     })
    // } catch (error) {
    //     console.log(error);
    //     Swal.fire({
    //         title: 'Error',
    //         text: error.message,
    //         icon: 'error',
    //         confirmButtonText: 'OK'
    //     })
    // }
    const options = {
      method: "POST",
      url: "https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/payment/create",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        amount: "string",
        currency: "string",
        intent: "string",
        merchantInvoiceNumber: "string",
        merchantAssociationInfo: "string",
      },
    };

    axios
      .request(options)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message, "bkash error"));
  };
  return (
    <div className="w-full shadow-lg p-6 rounded-md mt-40 bg-white">
      <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
        Select Payment Method
      </h2>

      <div className="flex gap-4 justify-center">
        <button
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={submitOrder}
        >
          <img src="tk.png" alt="bkash" className="w-16" />
        </button>
        <button
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={submitBkash}
        >
          <img src="bkash.webp" alt="bkash" className="w-16" />
        </button>
      </div>
    </div>
  );
}
