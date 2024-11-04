"use client";
import Image from "next/image";
import { useState } from "react";

export default function GenerateDemoProducts() {
  const [productType, setProductType] = useState("");
  const [numberOfProducts, setNumberOfProducts] = useState(100);

  const handleGenerate = () => {
    alert(
      `Generating ${numberOfProducts} demo products of type ${productType}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          {/* Image Section */}
          <div className="w-1/2">
            <Image
              width={400}
              height={400}
              src="/path-to-your-image.png"
              alt="Demo Products"
              className="w-full h-auto"
            />
          </div>

          {/* Form Section */}
          <div className="w-1/2 pl-6">
            <h2 className="text-2xl font-bold mb-4">Generate Demo Products</h2>
            <p className="mb-6">
              {`Demo products involve showcasing the features, benefits, and
              functionality of the products in a way that helps stakeholders
              understand the system better. These are just dummies, so please
              don’t rely on them. But remember, you shouldn't take actual orders
              based on these products as they do not actually exist. Upload your
              own products by following these demos.`}
            </p>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                Demo Products Type
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select One</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                No of Demo Products to be Generated
              </label>
              <input
                type="number"
                value={numberOfProducts}
                onChange={(e) => setNumberOfProducts(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of products"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md"
            >
              Generate Demo Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
