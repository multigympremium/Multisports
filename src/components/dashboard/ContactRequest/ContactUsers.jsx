import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import DeleteButton from "../../../components library/DeleteButton";

export default function ContactRequestsList() {
  // Sample data (replace with actual data from an API or database)
  const initialData = [
    {
      id: 1,
      name: "Hales Carrillo",
      email: "lutame@mailinator.com",
      phone: "+1 (238) 579-6555",
      company: "Company A",
      message: "Nam ex libero sint",
      status: "Served",
    },
    {
      id: 2,
      name: "Mikayla McMillan",
      email: "nivlyy@mailinator.com",
      phone: "+1 (303) 745-8039",
      company: "Company B",
      message: "Voluptatem libero u",
      status: "Served",
    },
    {
      id: 3,
      name: "Griffith Kelly",
      email: "fexuqabex@mailinator.com",
      phone: "+1 (797) 977-6063",
      company: "Company C",
      message: "Sunt corrupti ab su",
      status: "Not Served",
    },
    {
      id: 4,
      name: "Adria Marshall",
      email: "ryha@mailinator.com",
      phone: "+1 (753) 106-1658",
      company: "Company D",
      message: "Dolor repudiandae ea",
      status: "Served",
    },
    // Add more entries as needed
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
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.company.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl font-semibold mb-9">Contact Requests List</h1>

        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            value={searchTerm}
            className="outline-none w-full bg-white"
            onChange={handleSearch}
            placeholder="Search by title or description..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>
        {/* Contact Requests Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Name</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Phone</td>
              <td className="p-2 border">Company</td>
              <td className="p-2 border">Message</td>
              <td className="p-2 border">Status</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b text-center">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.email}</td>
                  <td className="p-2 border">{item.phone}</td>
                  <td className="p-2 border">{item.company}</td>
                  <td className="p-2 border">{item.message}</td>
                  <td className="p-2 border">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        item.status === "Served"
                          ? "bg-[#A8CE3A] text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2 border ">
                    <DeleteButton></DeleteButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
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
