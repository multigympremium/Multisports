"use client"
import Summary from '@/components/shared/cart/viewCart/Summary'
import ViewCart from '@/components/shared/cart/viewCart/ViewCart'
import Container from '@/components/shared/Container'
import { AuthContext } from '@/providers/AuthProvider'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { IoHome } from 'react-icons/io5'

export default function Page() {
  const {cartItems} = useContext(AuthContext)
  return (
    <Container>
      {cartItems.length > 0 ?

      <>
      <div className="text-sm text-gray-500 mb-2 border-b border-gray-300 flex gap-3 items-center mt-10 pb-4">
        <IoHome /> Multisports {`>`} Cart
      </div>
        <div className='w-full grid grid-cols-4 py-6 gap-8'>
            <div className='col-span-3 max-h-[500px] overflow-auto' style={{scrollbarWidth : "thin"}}>
                <ViewCart />
            </div>
            <div className='col-span-1'><Summary isCart={true} cartItems={cartItems} /></div>
        </div>
      </>
      : 
      <div className='flex justify-center items-center flex-col h-full gap-4 py-20' >
        <Image src={"/nodata.jpg"} alt={"No Data"} width={400} height={400} />
        <h3>Empty Cart</h3>
        <p>Please Add Product to View</p>
        <Link href={"/products/all"} className="bg-blue-500 text-white hover:bg-neutral-800 rounded-lg py-2 px-5">Go To Shop</Link>
      </div>
      }
    </Container>
  )
}
