"use client";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { CSVLink } from "react-csv";

export default function CustomersList() {
  const initialCustomers = [
    {
      id: 1,
      name: "Colette Cooke",
      email: "vavmup@mailinator.com",
      phone: "",
      address: "",
      deleteRequestSubmitted: "",
      wallet: 0,
      createdAt: "2024-01-29 01:59:47 pm",
    },
    {
      id: 2,
      name: "Karina Castro",
      email: "qefobywa@mailinator.com",
      phone: "",
      address: "",
      deleteRequestSubmitted: "",
      wallet: 0,
      createdAt: "2024-01-29 01:52:59 pm",
    },
    // Add more customers here
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle customer deletion
  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    setMessage("Customer deleted successfully!");
  };

  // CSV headers for download
  const csvHeaders = [
    { label: "SL", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "Delete Request Submitted", key: "deleteRequestSubmitted" },
    { label: "Wallet", key: "wallet" },
    { label: "Created At", key: "createdAt" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Customers List</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Download as Excel (CSV) Button */}
        <div className="mb-4 flex justify-end">
          <CSVLink
            data={customers}
            headers={csvHeaders}
            filename="customers_list.csv"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Download as Excel
          </CSVLink>
        </div>

        {/* Customers Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Delete Request Submitted</th>
              <th className="p-2 border">Wallet</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr key={customer.id} className="border-b">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{customer.name}</td>
                  <td className="p-2 border">{customer.email}</td>
                  <td className="p-2 border">{customer.phone || "-"}</td>
                  <td className="p-2 border">{customer.address || "-"}</td>
                  <td className="p-2 border">
                    {customer.deleteRequestSubmitted || "-"}
                  </td>
                  <td className="p-2 border">{customer.wallet}</td>
                  <td className="p-2 border">{customer.createdAt}</td>
                  <td className="p-2 border">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(customer.id)}
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
