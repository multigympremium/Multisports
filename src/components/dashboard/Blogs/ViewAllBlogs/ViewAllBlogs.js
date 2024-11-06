"use client";
import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import CellImage from "@/components/shared/ImageComponents/CellImage";
import toast from "react-hot-toast";
import Modal from "@/components/shared/Modal/Modal";
import BlogEditForm from "./BlogEditForm";
import Swal from "sweetalert2";
import BgBlurModal from "@/components/shared/Modal/BgBlurModal";

export default function ViewAllBlogs() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [blogs, setBlogs] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [BlogId, setBlogId] = useState("");

  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    console.log(blogs, "blogs", offset, offset + itemsPerPage);
    return blogs.slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, blogs]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedblogs = useCallback(() => {
    const sortedData = [...blogs];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [blogs, sortConfig]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    setBlogId(id);
    setIsEdited(true);

    console.log(`Edit Blog with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure you want to delete this member?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.delete(`/blogs/${id}`);
            console.log(res, "res");
            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);
              toast.success("Blog deleted successfully!");
            }
          } catch (error) {
            console.log(error, "error");
            toast.error("Error deleting Item!");
          }
        }
      });
    } catch (error) {
      console.log(error, "error");
      toast.error("Error deleting Blog!");
    }
    console.log(`Delete Blog with ID: ${id}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get("/blog");
        console.log(res, "res", res?.data?.data);
        if (res.status === 200 || res.status === 201) {
          setBlogs(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        throw new Error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, [axiosSecure, isDeleted, isEdited]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Blog List</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="border p-2 text-left cursor-pointer"
                onClick={() => handleSort("id")}
              >
                SL{" "}
                {sortConfig.key === "_id" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th
                className="border p-2 text-left cursor-pointer"
                onClick={() => handleSort("writer")}
              >
                Name{" "}
                {sortConfig.key === "writer" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th
                className="border p-2 text-left cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title{" "}
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </th>
              <th className="border p-2 text-left">Image</th>
             
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData().map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="border p-2">
                  {index + 1 + currentPage * itemsPerPage}
                </td>
                <td className="border p-2">{item.writer}</td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">
                  <CellImage
                    width={400}
                    height={400}
                    src={item.image}
                    alt="icon"
                  />
                </td>
              
                <td className="border p-2">
                  <div className="flex space-x-2">
                    <button
                      className="text-yellow-500 hover:text-yellow-700"
                      onClick={() => handleEdit(item._id)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(blogs.length / itemsPerPage),
          }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageClick(pageIndex)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === pageIndex
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>
      <BgBlurModal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <BlogEditForm
          BlogId={BlogId}
          setIsShowModal={setIsEdited}
          isShowModal={isEdited}
        />
      </BgBlurModal>
    </div>
  );
}
