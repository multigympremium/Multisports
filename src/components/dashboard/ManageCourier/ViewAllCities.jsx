"use client";
import { useState, useEffect, useCallback } from "react";

import CellImage from "../../../shared/ImageComponents/CellImage";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";

export default function ViewAllCities() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;
  const [courierCities, setCourierCities] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const axiosSecure = useAxiosSecure();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [categoryId, setCategoryId] = useState("");


  const sortedcourierCities = useCallback(() => {
    const sortedData = [...courierCities];
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
  }, [courierCities, sortConfig]);

  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    console.log(courierCities, "courierCities", offset, offset + itemsPerPage);
    return sortedcourierCities().slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, courierCities, sortedcourierCities]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };



  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    setCategoryId(id);
    setIsEdited(true);

    console.log(`Edit category with ID: ${id}`);
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
            const res = await axiosSecure.delete(`/courierCities/${id}`);
            console.log(res, "res");
            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);
              toast.success("Category deleted successfully!");
            }
          } catch (error) {
            console.log(error, "error");
            toast.error("Error deleting Item!");
          }
        }
      });
    } catch (error) {
      console.log(error, "error");
      toast.error("Error deleting category!");
    }
    console.log(`Delete category with ID: ${id}`);
  };

  useEffect(() => {
    const fetchCourierCities = async () => {
      try {
        const res = await axiosSecure.get("/courier/cities");
        console.log(res, "res", res?.data?.data);
        if (res.status === 200 || res.status === 201) {
          setCourierCities(res.data?.data?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching courierCities:", error);
        throw new Error("Failed to fetch courierCities");
      }
    };

    fetchCourierCities();
  }, [axiosSecure, isDeleted, isEdited]);

  return (
    <div className="p-6 pt-0">
      <div className="">
        <h1 className="text-3xl header font-semibold mb-9">Category List</h1>
        <table className="min-w-full shadow table-auto border-collapse">
          <thead className="text-lg">
            <tr>
              <td
                className="border flex justify-center items-center gap-2 text-lg p-2 text-center cursor-pointer"
                
              >
                SL{" "}
                
              </td>
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("city_name")}
              >
                City Name{" "}
                {sortConfig.key === "city_name" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
              
              <td
                className="border p-2 text-center cursor-pointer"
                onClick={() => handleSort("city_id")}
              >
                City ID{" "}
                {sortConfig.key === "city_id" &&
                  (sortConfig.direction === "asc" ? "🔼" : "🔽")}
              </td>
             
              
            </tr>
          </thead>
          <tbody>
            {paginatedData()?.length > 0 && paginatedData().map((category, index) => (
              <tr key={category.id} className="border-b text-center">
                <td className="border p-2 ">
                  {index + 1 + currentPage * itemsPerPage}
                </td>
                <td className="border p-2">{category.city_name}</td>
                <td className="border p-2">{category.city_id}</td>
               
               
                
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(courierCities.length / itemsPerPage),
          }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageClick(pageIndex)}
              className={`px-3 py-1 border rounded-md ${currentPage === pageIndex
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
                }`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>
     
    </div>
  );
}
