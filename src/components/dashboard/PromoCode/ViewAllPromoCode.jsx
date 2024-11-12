"use client";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// Sample promo code data (can be fetched from an API)
const initialPromoCodes = [
  {
    id: 1,
    title: "25% OFF Promo",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    type: "Percentage",
    value: 25,
    minSpend: 1000,
    code: "SAVE25",
    status: "Active",
  },
  {
    id: 2,
    title: "Flat $50 OFF",
    effectiveDate: "2024-02-15",
    expiryDate: "2024-08-15",
    type: "Fixed",
    value: 50,
    minSpend: 500,
    code: "FLAT50",
    status: "Inactive",
  },
  // Add more promo codes as needed
];

export default function ViewAllPromoCode() {
  const [promoCodes, setPromoCodes] = useState(initialPromoCodes);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter promo codes based on the search term
  const filteredPromoCodes = promoCodes.filter(
    (promo) =>
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPromoCodes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setPromoCodes(promoCodes.filter((promo) => promo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Promo Codes</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Promo Codes Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Effective Date</th>
              <th className="p-2 border">Expiry Date</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Value</th>
              <th className="p-2 border">Min. Spend</th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((promo, index) => (
                <tr key={promo.id} className="border-b">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">{promo.title}</td>
                  <td className="p-2 border">{promo.effectiveDate}</td>
                  <td className="p-2 border">{promo.expiryDate}</td>
                  <td className="p-2 border">{promo.type}</td>
                  <td className="p-2 border">
                    {promo.type === "Percentage"
                      ? `${promo.value}%`
                      : `$${promo.value}`}
                  </td>
                  <td className="p-2 border">৳ {promo.minSpend.toFixed(2)}</td>
                  <td className="p-2 border">{promo.code}</td>
                  <td className="p-2 border">{promo.status}</td>
                  <td className="p-2 border">
                    <div className="flex space-x-2">
                      <button className="text-yellow-500 hover:text-yellow-700">
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(promo.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in the table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredPromoCodes.length)} of{" "}
            {filteredPromoCodes.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredPromoCodes.length / itemsPerPage) },
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