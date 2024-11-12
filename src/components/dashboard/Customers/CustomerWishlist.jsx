"use client";

import { useState } from "react";

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
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">WishList</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Wishlist Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredWishlist.length > 0 ? (
              filteredWishlist.map((item, index) => (
                <tr key={item.id} className="border-b">
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
