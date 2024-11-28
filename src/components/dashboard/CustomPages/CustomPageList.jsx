"use client";

// components/CustomPageList.js
import { useState, useEffect } from "react";

import DeleteButton from "../../../components library/DeleteButton";
import EditButton from "../../../components library/EditButton";
const CustomPageList = () => {
  // Example data for custom pages
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Simulate fetching data
  useEffect(() => {
    // Fetch pages data from an API or use a mock
    const mockPages = [
      // Example mock data
      {
        id: 1,
        featureImage: "/path-to-image1.jpg",
        title: "Page 1",
        url: "/page-1",
        status: "Active",
      },
      {
        id: 2,
        featureImage: "/path-to-image2.jpg",
        title: "Page 2",
        url: "/page-2",
        status: "Active",
      },
      // Add more mock pages here...
    ];
    setPages(mockPages);
  }, []);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = pages.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination functionality
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 pt-0">
      <p className="font-semibold text-3xl mb-9">Custom Page list</p>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <td className="py-2 px-4 text-center">SL</td>
              <td className="py-2 px-4 text-center">Feature Image</td>
              <td className="py-2 px-4 text-center">Page Title</td>
              <td className="py-2 px-4 text-center">Page URL</td>
              <td className="py-2 px-4 text-center">Status</td>
              <td className="py-2 px-4 text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {currentPages.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center  py-4">
                  No data available in the table
                </td>
              </tr>
            ) : (
              currentPages.map((page, index) => (
                <tr key={page.id} className="border-b border-gray-200">
                  <td className="py-2 border px-4 text-center">{index + 1 + indexOfFirstItem}</td>
                  <td className="py-2 border px-4 text-center">
                    <img
                      width={400}
                      height={400}
                      src={page.featureImage}
                      alt={page.title}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="py-2 border px-4 text-center">{page.title}</td>
                  <td className="py-2 border px-4 text-center">{page.url}</td>
                  <td className="py-2 border px-4 text-center">{page.status}</td>
                  <td className="py-2 items-center px-4 flex justify-center gap-1 text-center">
                    <EditButton ></EditButton>
                    <DeleteButton></DeleteButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <nav>
          <ul className="flex items-center space-x-2">
            {Array.from(
              { length: Math.ceil(pages.length / itemsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 border rounded-full ${
                      currentPage === i + 1
                        ? "bg-blue-500  text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CustomPageList;
