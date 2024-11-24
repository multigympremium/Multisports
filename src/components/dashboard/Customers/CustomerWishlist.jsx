"use client";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function CustomerWishlist() {
  const initialWishlist = [
    {
      id: 1,
      category: "Electronics",
      image: "/images/product1.jpg",
      product: "Smartphone",
      customerName: "John Doe",
      email: "johndoe@mail.com",
      contact: "1234567890",
      createdAt: "2024-01-29 12:45:00 pm",
    },
    {
      id: 2,
      category: "Home Appliances",
      image: "/images/product2.jpg",
      product: "Air Conditioner",
      customerName: "Jane Doe",
      email: "janedoe@mail.com",
      contact: "0987654321",
      createdAt: "2024-01-29 12:55:00 pm",
    },
    // Add more wishlist items here
  ];

  const [wishlist, setWishlist] = useState(initialWishlist);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter wishlist based on search term
  const filteredWishlist = wishlist.filter(
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">WishList</h1>

        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product, customer name, or email..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Wishlist Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Category</td>
              <td className="p-2 border">Image</td>
              <td className="p-2 border">Product</td>
              <td className="p-2 border">Customer Name</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Contact</td>
              <td className="p-2 border">Created At</td>
            </tr>
          </thead>
          <tbody>
            {filteredWishlist.length > 0 ? (
              filteredWishlist.map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.category}</td>
                  <td className="p-2 border">
                    <img
                      width={400}
                      height={400}
                      src={item.image}
                      alt={item.product}
                      className="w-10 h-10 object-cover"
                    />
                  </td>
                  <td className="p-2 border">{item.product}</td>
                  <td className="p-2 border">{item.customerName}</td>
                  <td className="p-2 border">{item.email}</td>
                  <td className="p-2 border">{item.contact || "-"}</td>
                  <td className="p-2 border">{item.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No data available in the table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
