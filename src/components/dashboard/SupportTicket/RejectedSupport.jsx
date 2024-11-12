"use client";
import { useState } from "react";

export default function RejectedSupport() {
  // Sample data (replace this with your actual data or fetch from an API)
  const initialData = [
    {
      id: 1,
      ticketNo: "TICKET-123",
      customer: "John Doe",
      subject: "Login issue",
      attachment: "screenshot.png",
      status: "Pending",
    },
    {
      id: 2,
      ticketNo: "TICKET-456",
      customer: "Jane Smith",
      subject: "Payment failure",
      attachment: "payment.png",
      status: "Resolved",
    },
    // Add more support ticket entries here
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = initialData.filter(
      (item) =>
        item.ticketNo.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.customer.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.subject.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Support List</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by ticket number, customer name, or subject..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Support List Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Ticket No</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Attachment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.ticketNo}</td>
                  <td className="p-2 border">{item.customer}</td>
                  <td className="p-2 border">{item.subject}</td>
                  <td className="p-2 border">
                    <a
                      href={`/${item.attachment}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.attachment}
                    </a>
                  </td>
                  <td className="p-2 border">{item.status}</td>
                  <td className="p-2 border">
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
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
