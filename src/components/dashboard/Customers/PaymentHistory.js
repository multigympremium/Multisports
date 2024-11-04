"use client";
import { useState } from "react";

export default function PaymentHistory() {
  const initialData = [
    {
      id: 1,
      paymentThrough: "Visa",
      transactionId: "TXN123456",
      cardType: "Credit",
      cardBrand: "Visa",
      amount: "BDT 500",
      storeAmount: "BDT 480",
      currency: "BDT",
      bankTranId: "BANK123",
      datetime: "2024-01-01 12:30:00",
      status: "Success",
    },
    {
      id: 2,
      paymentThrough: "MasterCard",
      transactionId: "TXN654321",
      cardType: "Debit",
      cardBrand: "MasterCard",
      amount: "BDT 800",
      storeAmount: "BDT 780",
      currency: "BDT",
      bankTranId: "BANK654",
      datetime: "2024-01-02 14:30:00",
      status: "Success",
    },
    // Add more payment entries as needed
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
        item.transactionId
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.bankTranId.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.paymentThrough.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Order Payment History</h1>

        {/* Search Input */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by transaction ID, bank tran ID, or payment method..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Payment History Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Payment Through</th>
              <th className="p-2 border">Transaction ID</th>
              <th className="p-2 border">Card Type</th>
              <th className="p-2 border">Card Brand</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Store Amount</th>
              <th className="p-2 border">Currency</th>
              <th className="p-2 border">Bank Tran ID</th>
              <th className="p-2 border">Datetime</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.paymentThrough}</td>
                  <td className="p-2 border">{item.transactionId}</td>
                  <td className="p-2 border">{item.cardType}</td>
                  <td className="p-2 border">{item.cardBrand}</td>
                  <td className="p-2 border">{item.amount}</td>
                  <td className="p-2 border">{item.storeAmount}</td>
                  <td className="p-2 border">{item.currency}</td>
                  <td className="p-2 border">{item.bankTranId}</td>
                  <td className="p-2 border">{item.datetime}</td>
                  <td className="p-2 border">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-4">
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
