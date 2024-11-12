"use client"
import useAxiosPublic from '../../../../useAxiosPublic';
import { AuthContext } from '@/providers/AuthProvider';
import Link from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import Swal from 'sweetalert2';

export default function Summary({isCart = false, shippingAddress = null, cartItems = []}) {
    const { totalPrice } =
    useContext(AuthContext);

    const discount = 17.4;
    const axiosSecure = useAxiosPublic();
    const router = useRouter();


    const submitOrder = async () => {
        try {
            const response = await axiosSecure.post('/orders', {
                shipping_address_id: shippingAddress._id,
                products: cartItems,
                payment_method: 'cash',
                total: totalPrice
            });
            console.log(response);

            if (response.data.success) {
               return router.push("/success")
            }

            Swal.fire({
                title: 'Error',
                text: response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } 
    }
  return (
    <div className="border p-6 mt-auto rounded-md shadow-lg w-full max-w-[350px]">
        <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">Order Summary</h2>
    <div className="flex justify-between text-sm text-gray-500">
      <b className='font-bold text-lg'>Total</b>
      <span className="font-medium">${totalPrice}</span>
    </div>
    <div className="flex justify-between text-sm text-gray-500 mt-2">
      <b className='font-bold text-lg'>Discounts</b>
      <span className="font-medium">-${discount.toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-sm text-gray-500 mt-2">
      <b className='font-bold text-lg'>Shipping</b>
      <span className="font-medium">free</span>
    </div>

    <div className="flex justify-between text-sm text-gray-500 mt-2">
      <b className='font-bold text-lg'>Payment Method</b>
      <span className="font-medium">Cash</span>
    </div>
      

    {
      isCart ?
      <Link href="/checkout">
      <button className="bg-black text-white text-sm py-2 px-4 rounded-md mt-4">
        Proceed to Checkout
      </button>
      </Link> : 

      <button onClick={submitOrder} className="bg-black text-white text-sm py-2 px-4 rounded-md mt-4 disabled:bg-gray-200 disabled:text-black" disabled={shippingAddress && cartItems.length > 0 ? false : true}>
        Go To Payment
      </button>
    }
  </div>
  )
}
