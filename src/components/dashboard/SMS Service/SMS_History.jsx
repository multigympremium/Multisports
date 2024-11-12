"use client";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

// Sample SMS history data (could be fetched from an API)
const initialSmsHistory = [
  {
    id: 1,
    template: "Order Confirmation",
    sendingType: "Specific Customer",
    contact: "1234567890",
    smsReceivers: 1,
    orderCountRange: "1 - 5",
    orderValueRange: "1000 - 5000",
    sentAt: "2024-03-15 10:30:00 am",
  },
  {
    id: 2,
    template: "Welcome Message",
    sendingType: "Everyone",
    contact: "N/A",
    smsReceivers: 100,
    orderCountRange: "N/A",
    orderValueRange: "N/A",
    sentAt: "2024-03-14 09:00:00 am",
  },
  // Add more SMS history records if needed
];

export default function SmsHistory() {
  const [smsHistory, setSmsHistory] = useState(initialSmsHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Function to filter SMS history based on the search term
  const filteredHistory = smsHistory.filter(
    (sms) =>
      sms.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sms.contact.includes(searchTerm)
  );

  // Function to remove an SMS history entry
  const handleDelete = (id) => {
    const updatedHistory = smsHistory.filter((sms) => sms.id !== id);
    setSmsHistory(updatedHistory);
    setMessage("SMS history deleted successfully!");
  };

  // Function to remove all SMS before 15 days (for simplicity, removing all in this example)
  const handleRemoveAllBefore15Days = () => {
    setSmsHistory([]);
    setMessage("All SMS history before 15 days removed!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">View All SMS History</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by template or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Remove All Button */}
        <div className="mb-4 flex justify-end">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
            onClick={handleRemoveAllBefore15Days}
          >
            Remove All SMS Before 15 Days
          </button>
        </div>

        {/* SMS History Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">SMS Template</th>
              <th className="p-2 border">Sending Type</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">SMS Receivers</th>
              <th className="p-2 border">Order Count Range</th>
              <th className="p-2 border">Order Value Range</th>
              <th className="p-2 border">Sent At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((sms, index) => (
                <tr key={sms.id} className="border-b">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{sms.template}</td>
                  <td className="p-2 border">{sms.sendingType}</td>
                  <td className="p-2 border">{sms.contact}</td>
                  <td className="p-2 border">{sms.smsReceivers}</td>
                  <td className="p-2 border">{sms.orderCountRange}</td>
                  <td className="p-2 border">{sms.orderValueRange}</td>
                  <td className="p-2 border">{sms.sentAt}</td>
                  <td className="p-2 border">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(sms.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No data available in the table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Success/Info Message */}
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}
