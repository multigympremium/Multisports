import React from 'react';

const Modal = ({ id, title, price, description, image }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box p-0 rounded max-w-4xl flex">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        {/* Left Section - Image without padding */}
        <div className="w-1/2 h-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Right Section - Content */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-500 mb-2 text-sm">{description}</p>

          <div className="text-2xl font-semibold mb-4">{price}</div>

          {/* Size Options */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button key={size} className="border w-10 h-10 hover:border-gray-500 duration-300 ease-in-out rounded-lg">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex gap-2">
              {['bg-orange-500', 'bg-pink-300', 'bg-purple-500', 'bg-red-500'].map((color, index) => (
                <button key={index} className={`w-8 h-8 rounded ${color}`}></button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-lg">
              <button className="w-7 text-center h-11">-</button>
              <span className="w-10 border-x text-center">3</span>
              <button className="w-7">+</button>
            </div>
            <button className="btn hover:bg-gray-900 bg-black  text-white flex-1">Add To Cart</button>
          </div>

          <button className="btn  text-white w-full hover:bg-gray-900 bg-black">View Details</button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
