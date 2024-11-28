import React from 'react'
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosCourier from '../../../Hook/useAxiosCourier';
import useCourierAccessToken from '../../../Hook/useCourierAccessToken';

export default function PaymentMethodModal({submitOrder, isShow, setIsShow}) {

  const axiosSecure = useAxiosPublic();
  const axiosCourier = useAxiosCourier()
  const router = useNavigate();

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
  

// const createOrder = async () => {
//   const url = '/aladdin/api/v1/orders'; // Replace with actual base URL
//   // const accessToken = '<access_token>'; // Replace with your access token


//   const requestData = {
//     store_id: '239581',                    // Example store ID
//     // merchant_order_id: 'ORD123456',         // Example merchant order ID (optional)
//     recipient_name: 'John Doe',             // Example recipient name
//     recipient_phone: '123-456-7890',       // Example recipient phone number
//     recipient_address: '123 Main St, City XYZ', // Example recipient address
//     recipient_city: 'City XYZ',            // Example recipient city
//     recipient_zone: 'Zone 1',              // Example recipient zone
//     recipient_area: 'Area A',              // Example recipient area
//     delivery_type: 'Standard',             // Example delivery type (e.g., 'Standard', 'Express')
//     item_type: 'Electronics',              // Example item type (e.g., 'Electronics', 'Clothing')
//     special_instruction: 'Handle with care', // Example special instruction
//     item_quantity: 2,                      // Example item quantity
//     item_weight: 1.5,                      // Example item weight in kg
//     amount_to_collect: 500,                // Example amount to collect (e.g., in local currency)
//     item_description: 'Smartphone, Model XYZ', // Example item description
//   };
  

//   try {
//     const response = await axiosCourier.post(url, requestData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     });
//     console.log('Order created successfully:', response.data);
//   } catch (error) {
//     console.error('Error creating order:', error.response?.data || error.message);
//   }
// };

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
      method: 'POST',
      url: 'https://checkout.sandbox.bka.sh/v1.2.0-beta/checkout/payment/create',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      data: {
        amount: 'string',
        currency: 'string',
        intent: 'string',
        merchantInvoiceNumber: 'string',
        merchantAssociationInfo: 'string'
      }
    };
    
    axios
      .request(options)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message, "bkash error"));

  }
  return (
    <div className="flex gap-4 w-full shadow-lg p-6 rounded-md mt-12 bg-white">
      <button className='p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100' onClick={submitOrder}>Cash</button>
      <button className='p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100' onClick={submitBkash} >Bkash</button>
      
    </div>
  )
}
