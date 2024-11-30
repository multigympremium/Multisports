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
