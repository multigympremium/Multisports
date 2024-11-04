"use client";
import Image from "next/image";
import { useState } from "react";
import CustomImage from "../ImageComponents/CustomImage";
import { IoMdClose } from "react-icons/io";

const CartItemComponent = ({ updateCartQuantity, item , removeFromCart, isCartArea = false}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => {
      updateCartQuantity(item._id, prev + 1);
      return prev + 1;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        updateCartQuantity(item._id, prev - 1);
        return prev - 1;
      });
    }
  };

  

  return (
    <div className="flex items-center mb-4 relative border rounded-md p-2">
      <div className="max-w-[100px] w-full">

      <CustomImage
        imageKey={item.thumbnail}
        alt="Product Card"
        className="w-[100px] object-cover"
        width={100}
        height={100}
      />
      </div>
      <div className="flex w-full ml-4 ">
        <div>

        <span className="font-bold text-black">{item.productTitle}</span>
        {
          !isCartArea &&
        <>
        {item?.shortDescription &&
        (item?.shortDescription?.length > 100) &
          (item?.shortDescription?.length < 200) ? (
            <p
            className="text-sm text-gray-600"
            dangerouslySetInnerHTML={{
              __html: item?.shortDescription?.slice(0, 100) + "...",
            }}
            />
          ) : (
          <p
            className="text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: item?.shortDescription }}
          />
        )}
        </>
        }
        </div>


        <div className={`flex items-center mt-2 ${!isCartArea ? 'ml-14' : 'ml-4'}`}>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => decreaseQuantity(item._id)}
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => increaseQuantity(item._id)}
          >
            +
          </button>
        </div>
      </div>
      <span className="font-bold text-lg ml-auto">${item?.price * quantity}</span>
      <button
        className="absolute top-1 right-1"
        onClick={() => removeFromCart(item._id)}
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default CartItemComponent;
