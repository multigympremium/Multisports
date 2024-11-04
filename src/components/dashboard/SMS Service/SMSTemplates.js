"use client";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// Sample SMS templates data (can be fetched from an API)
const initialTemplates = [
  {
    id: 1,
    title: "Welcome Message",
    description: "Thank you for signing up. We are excited to have you!",
    createdAt: "2024-03-01",
  },
  {
    id: 2,
    title: "Order Confirmation",
    description: "Your order has been confirmed and will be processed shortly.",
    createdAt: "2024-03-02",
  },
  // Add more templates if needed
];

export default function SMSTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  // Filter SMS templates based on the search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle deletion of a template
  const handleDelete = (id) => {
    const updatedTemplates = templates.filter((template) => template.id !== id);
    setTemplates(updatedTemplates);
    setMessage("Template deleted successfully!");
  };

  // Handle creating a new template (for simplicity, it just adds a placeholder template)
  const handleCreateNewTemplate = () => {
    const newTemplate = {
      id: templates.length + 1,
      title: "New Template",
      description: "This is a new SMS template.",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTemplates([...templates, newTemplate]);
    setMessage("New template created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">View All SMS Templates</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Create New Template Button */}
        <div className="mb-4 flex justify-end">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
            onClick={handleCreateNewTemplate}
          >
            + Create New Template
          </button>
        </div>

        {/* SMS Templates Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Template Title</th>
              <th className="p-2 border">Template Description</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template, index) => (
                <tr key={template.id} className="border-b">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{template.title}</td>
                  <td className="p-2 border">{template.description}</td>
                  <td className="p-2 border">{template.createdAt}</td>
                  <td className="p-2 border">
                    <div className="flex space-x-2">
                      <button className="text-yellow-500 hover:text-yellow-700">
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(template.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No data available in table
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
