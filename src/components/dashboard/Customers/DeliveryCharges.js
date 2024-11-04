"use client";
import { useState, useEffect } from "react";

export default function DeliveryCharges() {
  const initialData = [
    {
      id: 1,
      division: "Chattogram",
      district: "Comilla",
      districtBn: "কুমিল্লা",
      charge: "BDT 100/=",
    },
    {
      id: 2,
      division: "Chattogram",
      district: "Feni",
      districtBn: "ফেনী",
      charge: "BDT 100/=",
    },
    {
      id: 3,
      division: "Chattogram",
      district: "Brahmanbaria",
      districtBn: "ব্রাহ্মণবাড়িয়া",
      charge: "BDT 100/=",
    },
    {
      id: 4,
      division: "Chattogram",
      district: "Rangamati",
      districtBn: "রাঙ্গামাটি",
      charge: "BDT 100/=",
    },
    {
      id: 5,
      division: "Chattogram",
      district: "Noakhali",
      districtBn: "নোয়াখালী",
      charge: "BDT 100/=",
    },
    {
      id: 6,
      division: "Chattogram",
      district: "Chandpur",
      districtBn: "চাঁদপুর",
      charge: "BDT 100/=",
    },
    {
      id: 7,
      division: "Chattogram",
      district: "Lakshmipur",
      districtBn: "লক্ষ্মীপুর",
      charge: "BDT 100/=",
    },
    {
      id: 8,
      division: "Chattogram",
      district: "Chattogram",
      districtBn: "চট্টগ্রাম",
      charge: "BDT 100/=",
    },
    {
      id: 9,
      division: "Chattogram",
      district: "Coxsbazar",
      districtBn: "কক্সবাজার",
      charge: "BDT 100/=",
    },
    {
      id: 10,
      division: "Chattogram",
      district: "Khagrachari",
      districtBn: "খাগড়াছড়ি",
      charge: "BDT 100/=",
    },
    {
      id: 11,
      division: "Chattogram",
      district: "Bandarban",
      districtBn: "বান্দরবান",
      charge: "BDT 100/=",
    },
    {
      id: 12,
      division: "Rajshahi",
      district: "Sirajganj",
      districtBn: "সিরাজগঞ্জ",
      charge: "BDT 100/=",
    },
    {
      id: 13,
      division: "Rajshahi",
      district: "Pabna",
      districtBn: "পাবনা",
      charge: "BDT 100/=",
    },
    {
      id: 14,
      division: "Rajshahi",
      district: "Bogura",
      districtBn: "বগুড়া",
      charge: "BDT 100/=",
    },
    {
      id: 15,
      division: "Rajshahi",
      district: "Rajshahi",
      districtBn: "রাজশাহী",
      charge: "BDT 100/=",
    },
    // Add more entries as required
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = initialData.filter(
      (item) =>
        item.district.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.districtBn.includes(e.target.value)
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page when search is performed
  };

  const handleEdit = (id) => {
    alert(`Edit action triggered for ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Delivery Charge List</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by district or district (Bangla)..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Delivery Charge Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Division</th>
              <th className="p-2 border">District</th>
              <th className="p-2 border">District (Bangla)</th>
              <th className="p-2 border">Delivery Charge</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.division}</td>
                  <td className="p-2 border">{item.district}</td>
                  <td className="p-2 border">{item.districtBn}</td>
                  <td className="p-2 border">{item.charge}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-700"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
