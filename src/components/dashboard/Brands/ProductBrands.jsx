"use client";

import { useState, useEffect, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../../../shared/Modal/Modal";
import CreateBrandForm from "./Forms/CreateBrandForm";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import CellImage from "../../../shared/ImageComponents/CellImage";
import Swal from "sweetalert2";
import EditBrandForm from "./Forms/EditBrandForm";

const ProductBrands = () => {
  // State management
  const [Brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [targetId, setTargetId] = useState("");
  const itemsPerPage = 10;

  // Sort configuration
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Fetch product brands with custom hook
  const productBrands = useGetAllProductBrands({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  // Paginated data
  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    return productBrands.slice(offset, offset + itemsPerPage);
  }, [currentPage, itemsPerPage, productBrands]);

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorted data based on configuration
  const sortedCategories = useCallback(() => {
    const sortedData = [...productBrands];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [productBrands, sortConfig]);

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
            const res = await axiosSecure.delete(`/product-brands/${id}`);
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
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Brand List</h1>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              onClick={() => setIsShowModal(true)}
            >
              Add New Brand
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Rearrange Brand
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    className="border p-2 text-left cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    SL{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th
                    className="border p-2 text-left cursor-pointer"
                    onClick={() => handleSort("brandName")}
                  >
                    Name{" "}
                    {sortConfig.key === "brandName" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="border p-2 text-left">Logo</th>
                  <th className="border p-2 text-left">Banner</th>
                  <th
                    className="border p-2 text-left cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    Category{" "}
                    {sortConfig.key === "category" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th
                    className="border p-2 text-left cursor-pointer"
                    onClick={() => handleSort("subcategory")}
                  >
                    Subcategory{" "}
                    {sortConfig.key === "subcategory" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th
                    className="border p-2 text-left cursor-pointer"
                    onClick={() => handleSort("slug")}
                  >
                    Slug{" "}
                    {sortConfig.key === "slug" &&
                      (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="border p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData()?.length > 0 &&  paginatedData().map((brand, index) => (
                  <tr key={brand.id} className="border-b">
                    <td className="border p-2">
                      {index + 1 + currentPage * itemsPerPage}
                    </td>
                    <td className="border p-2">{brand.brandName}</td>
                    <td className="border p-2">
                      <CellImage
                        width={400}
                        height={400}
                        src={brand.logo}
                        alt="Logo"
                      />
                    </td>
                    <td className="border p-2">
                      <CellImage
                        width={400}
                        height={400}
                        src={brand.banner}
                        alt="Banner"
                      />
                    </td>
                    <td className="border p-2">{brand.category}</td>
                    <td className="border p-2">{brand.subcategory}</td>
                    <td className="border p-2">{brand.slug}</td>
                    <td className="border p-2">
                      <div className="flex space-x-2">
                        <button
                          className="text-yellow-500 hover:text-yellow-700"
                          onClick={() => handleEdit(brand._id)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(brand._id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Adding/Editing Brand */}
      <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <CreateBrandForm
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      </Modal>

      <Modal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditBrandForm
          isShowModal={isEdited}
          setIsShowModal={setIsEdited}
          targetId={targetId}
        />
      </Modal>
    </>
  );
};

export default ProductBrands;
