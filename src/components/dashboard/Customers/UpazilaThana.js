"use client";
import { useState } from "react";

export default function UpazilaThanaList() {
  const initialData = [
    {
      id: 1,
      district: "Comilla",
      upazilaEnglish: "Debidwar",
      upazilaBangla: "দেবিদ্বার",
      website: "debidwar.comilla.gov.bd",
    },
    {
      id: 2,
      district: "Comilla",
      upazilaEnglish: "Barura",
      upazilaBangla: "বরুড়া",
      website: "barura.comilla.gov.bd",
    },
    {
      id: 3,
      district: "Comilla",
      upazilaEnglish: "Brahmanpara",
      upazilaBangla: "ব্রাহ্মণপাড়া",
      website: "brahmanpara.comilla.gov.bd",
    },
    {
      id: 4,
      district: "Comilla",
      upazilaEnglish: "Chandina",
      upazilaBangla: "চান্দিনা",
      website: "chandina.comilla.gov.bd",
    },
    {
      id: 5,
      district: "Comilla",
      upazilaEnglish: "Chouddagram",
      upazilaBangla: "চৌদ্দগ্রাম",
      website: "chouddagram.comilla.gov.bd",
    },
    {
      id: 6,
      district: "Comilla",
      upazilaEnglish: "Daudkandi",
      upazilaBangla: "দাউদকান্দি",
      website: "daudkandi.comilla.gov.bd",
    },
    {
      id: 7,
      district: "Comilla",
      upazilaEnglish: "Homna",
      upazilaBangla: "হোমনা",
      website: "homna.comilla.gov.bd",
    },
    {
      id: 8,
      district: "Comilla",
      upazilaEnglish: "Laksam",
      upazilaBangla: "লাকসাম",
      website: "laksam.comilla.gov.bd",
    },
    {
      id: 9,
      district: "Comilla",
      upazilaEnglish: "Muradnagar",
      upazilaBangla: "মুরাদনগর",
      website: "muradnagar.comilla.gov.bd",
    },
    {
      id: 10,
      district: "Comilla",
      upazilaEnglish: "Nangalkot",
      upazilaBangla: "নাঙ্গলকোট",
      website: "nangalkot.comilla.gov.bd",
    },
    {
      id: 11,
      district: "Comilla",
      upazilaEnglish: "Comilla Sadar",
      upazilaBangla: "কুমিল্লা সদর",
      website: "comillasadar.comilla.gov.bd",
    },
    {
      id: 12,
      district: "Comilla",
      upazilaEnglish: "Meghna",
      upazilaBangla: "মেঘনা",
      website: "meghna.comilla.gov.bd",
    },
    {
      id: 13,
      district: "Comilla",
      upazilaEnglish: "Monoharganj",
      upazilaBangla: "মনোহরগঞ্জ",
      website: "monoharganj.comilla.gov.bd",
    },
    {
      id: 14,
      district: "Comilla",
      upazilaEnglish: "Sadar South",
      upazilaBangla: "সদর দক্ষিণ",
      website: "sadarsouth.comilla.gov.bd",
    },
    {
      id: 15,
      district: "Comilla",
      upazilaEnglish: "Titas",
      upazilaBangla: "তিতাস",
      website: "titas.comilla.gov.bd",
    },
    // Add more entries as necessary
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = initialData.filter(
      (item) =>
        item.upazilaEnglish
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.upazilaBangla.includes(e.target.value)
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleEdit = (id) => {
    alert(`Edit action triggered for ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete action triggered for ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Upazila & Thana List</h1>

        {/* Search Input */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Upazila/Thana (English or Bangla)..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/2 p-2 border rounded-md"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            + Add Upazila/Thana
          </button>
        </div>

        {/* Upazila Thana Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">District</th>
              <th className="p-2 border">Upazila/Thana (English)</th>
              <th className="p-2 border">Upazila/Thana (Bangla)</th>
              <th className="p-2 border">Website</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.district}</td>
                  <td className="p-2 border">{item.upazilaEnglish}</td>
                  <td className="p-2 border">{item.upazilaBangla}</td>
                  <td className="p-2 border">
                    <a
                      href={`https://${item.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.website}
                    </a>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-700 mr-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No data available in the table
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
