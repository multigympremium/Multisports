"use client";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { CSVLink } from "react-csv";
import { IoIosSearch } from "react-icons/io";
import { RxDownload } from "react-icons/rx";
import DeleteButton from "../../../components library/DeleteButton";

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
    <div className="p-6 pt-0">
      <div className="">
        <div className="flex items-center mb-9 justify-between">
          <h1 className="text-3xl font-semibold ">Customers List</h1>
          {/* Download as Excel (CSV) Button */}
          <div className=" flex justify-end">
            <CSVLink
              data={customers}
              headers={csvHeaders}
              filename="customers_list.csv"
              className="customSaveButton"
            >
               <span className="flex items-center gap-2"><RxDownload />
               Download as Excel</span>
            </CSVLink>
          </div>
        </div>
        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here ..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>


        {/* Customers Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Name</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Phone</td>
              <td className="p-2 border">Address</td>
              <td className="p-2 border">Delete Request Submitted</td>
              <td className="p-2 border">Wallet</td>
              <td className="p-2 border">Created At</td>
              <td className="p-2 border">Action</td>
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
                    <DeleteButton onClick={() => handleDelete(customer.id)}></DeleteButton>
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
