"use client";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// Sample SMTP configurations (can be fetched from an API)
const initialConfigurations = [
  {
    id: 1,
    hostServer: "smtp.gmail.com",
    port: 587,
    email: "getupadgency@gmail.com",
    password: "xrdjusszqmqjgpvn",
    mailFromName: "Getup",
    mailFromEmail: "sales@fejmo.com",
    encryption: "TLS",
    status: "Active",
  },
  // Add more configurations if needed
];

export default function EmailConfigurations() {
  const [configurations, setConfigurations] = useState(initialConfigurations);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Filter configurations based on the search term
  const filteredConfigurations = configurations.filter(
    (config) =>
      config.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.hostServer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete action
  const handleDelete = (id) => {
    const updatedConfigurations = configurations.filter(
      (config) => config.id !== id
    );
    setConfigurations(updatedConfigurations);
    setMessage("Email configuration deleted successfully!");
  };

  // Handle adding new email server configuration (for simplicity, adding a static one)
  const handleAddEmailServer = () => {
    const newConfig = {
      id: configurations.length + 1,
      hostServer: "smtp.newserver.com",
      port: 465,
      email: "newemail@domain.com",
      password: "newpassword123",
      mailFromName: "New Server",
      mailFromEmail: "mail@domain.com",
      encryption: "SSL",
      status: "Inactive",
    };
    setConfigurations([...configurations, newConfig]);
    setMessage("New email server configuration added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">SMTP Email Configurations</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by host server or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Add Email Server Button */}
        <div className="mb-4 flex justify-end">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
            onClick={handleAddEmailServer}
          >
            + Add Email Server
          </button>
        </div>

        {/* Email Configurations Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Host Server</th>
              <th className="p-2 border">Port</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Password</th>
              <th className="p-2 border">Mail From Name</th>
              <th className="p-2 border">Mail From Email</th>
              <th className="p-2 border">Encryption</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredConfigurations.length > 0 ? (
              filteredConfigurations.map((config, index) => (
                <tr key={config.id} className="border-b">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{config.hostServer}</td>
                  <td className="p-2 border">{config.port}</td>
                  <td className="p-2 border">{config.email}</td>
                  <td className="p-2 border">{config.password}</td>
                  <td className="p-2 border">{config.mailFromName}</td>
                  <td className="p-2 border">{config.mailFromEmail}</td>
                  <td className="p-2 border">{config.encryption}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        config.status === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {config.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    <div className="flex space-x-2">
                      <button className="text-yellow-500 hover:text-yellow-700">
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(config.id)}
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

        {/* Success/Info Message */}
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}
