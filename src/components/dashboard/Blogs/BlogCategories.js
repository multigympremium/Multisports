"use client";
import { useState } from "react";

export default function BlogCategories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Fashion Blogs",
      slug: "fashion-blogs705819778",
      featured: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Health & Beauti Tips",
      slug: "health-beauti-tips705819790",
      featured: true,
      status: "Active",
    },
    {
      id: 3,
      name: "Grooming Blogs",
      slug: "grooming-blogs705819813",
      featured: true,
      status: "Active",
    },
    // Add more categories here as needed
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 10 items per page

  // Get current categories to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination buttons logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Categories</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Categories"
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-left border-b bg-gray-100">
              <th className="p-2">SL</th>
              <th className="p-2">Name</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Featured</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category, index) => (
              <tr key={category.id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{category.name}</td>
                <td className="p-2">{category.slug}</td>
                <td className="p-2">
                  {category.featured ? (
                    <span className="bg-teal-500 text-white px-2 py-1 rounded">
                      Featured
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white px-2 py-1 rounded">
                      Not Featured
                    </span>
                  )}
                </td>
                <td className="p-2">{category.status}</td>
                <td className="p-2 flex space-x-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-white py-1 px-4 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <span className="mx-4">
          Page {currentPage} of {Math.ceil(categories.length / itemsPerPage)}
        </span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}
          className={`bg-blue-500 text-white py-1 px-4 rounded ${
            currentPage === Math.ceil(categories.length / itemsPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
