"use client";

import { useState } from "react";
import Modal from "../../../shared/Modal/Modal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import DeleteButton from "../../../components library/DeleteButton";
import EditButton from "../../../components library/EditButton";
import TableSkeleton from "../../../components library/TableSkeleton";
import Mpagination from "../../../shared/Mpagination";
import CreateCustomPagesForm from "./Forms/CreateCustomPagesForm";
import EditCustomPagesForm from "./Forms/EditCustomPagesForm";
import useGetAllCustomPages from "../../../Hook/GetDataHook/useGetAllCustomPages";

const CustomPages = () => {
  // State management

  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [targetId, setTargetId] = useState("");
  const itemsPerPage = 10;

  const axiosSecure = useAxiosSecure();

  // Sort configuration
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Fetch product brands with custom hook
  const customPagesData = useGetAllCustomPages({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: customPagesData,
  });

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEdited(true);

    console.log(`Edit brand with ID: ${id}`);
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
            const res = await axiosSecure.delete(`/custom-pages/${id}`);
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

  return (
    <>
      <div className="container mx-auto p-6 pt-0">
        <div className="flex justify-between mb-9 items-center">
          <h1 className="text-3xl header font-semibold ">Custom List</h1>
          <div className="flex gap-4">
            <button
              className="customSaveButton"
              onClick={() => setIsShowModal(true)}
            >
              <span className="flex items-center gap-1">
                <IoAddCircle /> Add New Page
              </span>
            </button>
            {/* <button className="customCancelButton">
              <span className="flex items-center gap-1">
                <FaRetweet /> Rearrange Brand
              </span>
            </button> */}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div>
            <TableSkeleton></TableSkeleton>
          </div>
        ) : (
          <div className="overflow-x-auto relative shadow-sm sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <td
                    className="border flex justify-center items-center gap-2 text-lg p-2 text-center cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    Serial no {"   "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? (
                        <HiArrowCircleUp className="text-[#087D6D] " />
                      ) : (
                        <HiArrowCircleDown className="text-[#E68923]" />
                      ))}
                  </td>
                  <td
                    className="border text-lg p-2 text-center cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Name
                    {sortConfig.key === "title" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </td>

                  <td className="border text-lg p-2 text-center cursor-pointer">
                    Created At
                  </td>
                  <td className="border text-lg p-2 text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.length > 0 &&
                  paginatedData.map((item, index) => (
                    <tr key={item._id} className="border-b">
                      <td className="border p-2 text-center">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="border p-2 text-center">
                        <span className="border border-[#087d6d3a] p-1 px-2 rounded-lg bg font-semibold uppercase">
                          {item.sizeName}
                        </span>
                      </td>
                      <td className="border p-2 text-center">
                        {item.createdAt}
                      </td>
                      <td className="border p-2">
                        <div className="flex justify-center gap-2">
                          <EditButton onClick={() => handleEdit(item._id)} />
                          <DeleteButton
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {paginationControls}
      </div>

      {/* Modal for Adding/Editing Brand */}
      <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateCustomPagesForm
          isShow={isShowModal}
          setIsShow={setIsShowModal}
        />
      </Modal>

      <Modal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditCustomPagesForm
          isShow={isEdited}
          setIsShow={setIsEdited}
          targetId={targetId}
        />
      </Modal>
    </>
  );
};

export default CustomPages;