"use client";
import Image from "next/image";
import { useState } from "react";

export default function RemoveDemoProducts() {
  const handleRemove = () => {
    alert("All demo products have been removed!");
    // Add your remove logic here (API calls, etc.)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-between">
        {/* Image Section */}
        <div className="w-1/2">
          <Image
            width={400}
            height={400}
            src="/path-to-your-image.png" // Replace with your image path
            alt="Remove Demo Products"
            className="w-full h-auto"
          />
        </div>

        {/* Text and Button Section */}
        <div className="w-1/2 pl-6">
          <h2 className="text-2xl font-bold mb-4">Remove Demo Products</h2>
          <p className="mb-6 text-gray-600">
            Demo products involve showcasing the features, benefits, and
            functionality of the products in a way that helps stakeholders
            understand the system better. But remember, you shouldn’t take
            actual orders based on these products as they are not actually real.
            To remove all the demo products, please click the button below.
          </p>

          <button
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-7 7-7-7"
              />
            </svg>
            Remove Demo Products
          </button>
        </div>
      </div>
    </div>
  );
}
