"use client";
import { useEffect, useState } from "react";
import useGetAllDistrict from "../../../Hook/GetDataHook/useGetAllDistrict";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import AddDistrict from "./Forms/AddDistrict";
import EditDistrict from "./Forms/EditDistrict";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

export default function UpazilaThanaList() {

  const axiosSecure = useAxiosSecure();

  const [isAddModel, setIsAddModel] = useState(false)
  const [isEditModel, setIsEditModel] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const district = useGetAllDistrict({ isShowModal: isAddModel , isEdited: isEditModel, isDeleted })

  console.log(district, "districtdf ")

  const [data, setData] = useState(district);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [targetId, setTargetId] = useState("");

  // Pagination Logic

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  console.log(district, currentData, "currentData", data);

  

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = district.filter(
      (item) =>
        item.upazilaEnglish
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        item.upazilaBangla.includes(e.target.value)
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEditModel(true);
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
            const res = await axiosSecure.delete(`/district/${id}`);
            console.log(res, "res");
            if (res.status === 200 || res.status === 201) {
              setIsDeleted((prev) => !prev);

              toast.success("Brand deleted successfully!");
            }
          } catch (error) {
            console.log(error, "error");
            toast.error("Error deleting user!");
          }
        }
      });
    } catch (error) {
      console.log(error, "error");
      toast.error("Error deleting brand!");
    }
    console.log(`Delete brand with ID: ${id}`);
  };

  useEffect(() => {
    setData(district);
  }, [district]);

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Districts List</h1>

        {/* Search Input */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by District ..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/2 p-2 border rounded-md"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700" onClick={()=> setIsAddModel(true)}>
            + Add District
          </button>
        </div>

        {/* Upazila Thana Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">District</th>
              <th className="p-2 border">Subdistricts</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border">{startIdx + index + 1}</td>
                  <td className="p-2 border">{item.district}</td>
                  <td className="p-2 border">{item.subdistricts.join(",").length > 50 ? item?.subdistricts.join(",").slice(0,50) + "..." : item.subdistricts.join(",")}</td>
                  
                  <td className="p-2 border">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-700 mr-2"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
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

    <BgBlurModal isShowModal={isAddModel} setIsShowModal={setIsAddModel}>
      <AddDistrict setIsShowModal={setIsAddModel} isShowModal={isAddModel} />
    </BgBlurModal>
    <BgBlurModal isShowModal={isEditModel} setIsShowModal={setIsEditModel}>
      <EditDistrict setIsShowModal={setIsEditModel} isShowModal={isEditModel} targetId={targetId} />
    </BgBlurModal>
    </>
  );
}
