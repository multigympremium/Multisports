"use client";
import Image from "next/image";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const initialData = [
  {
    id: 1,
    image: "/images/product1.png",
    product: "Smartphone",
    rating: 4,
    review: "Great product, value for money!",
    reply: "Thank you for your feedback!",
    customer: "John Doe",
    name: "Smartphone X",
    status: "Approved",
  },
  {
    id: 2,
    image: "/images/product2.png",
    product: "Laptop",
    rating: 5,
    review: "Excellent performance!",
    reply: "We are glad you liked it!",
    customer: "Jane Smith",
    name: "Laptop Pro",
    status: "Approved",
  },
  // Add more review entries as needed
];

export default function RatingsReview() {
  const [reviews, setReviews] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter reviews based on the search term
  const filteredReviews = reviews.filter((review) =>
    review.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Ratings & Review</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Review Table */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Review</th>
              <th className="p-2 border">Reply From Admin</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((review, index) => (
                <tr key={review.id} className="border-b">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">
                    <Image
                      src={review.image}
                      alt={review.product}
                      className="w-16 h-16 object-contain"
                    />
                  </td>
                  <td className="p-2 border">{review.product}</td>
                  <td className="p-2 border">{review.rating}</td>
                  <td className="p-2 border">{review.review}</td>
                  <td className="p-2 border">{review.reply}</td>
                  <td className="p-2 border">{review.customer}</td>
                  <td className="p-2 border">{review.name}</td>
                  <td className="p-2 border">{review.status}</td>
                  <td className="p-2 border">
                    <div className="flex space-x-2">
                      <button className="text-yellow-500 hover:text-yellow-700">
                        <FiEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredReviews.length)} of{" "}
            {filteredReviews.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredReviews.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
