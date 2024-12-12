"use client";
import { HiArrowCircleUp, HiArrowCircleDown } from "react-icons/hi";
import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import TableSkeleton from "../../../components library/TableSkeleton";
import CellImage from "../../../shared/ImageComponents/CellImage";
import useGetAllProducts from "../../../Hook/GetDataHook/useGetAllProducts";
import EditProductForm from "./EditProductForm";
import Modal from "../../../shared/Modal/Modal";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import Pagination from "../../partial/Pagination/Pagination";

const ProductFlag = () => {
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
  const { products, totalItems, totalPages } = useGetAllProducts({
    isEdited,
    isDeleted,
    setLoading,
    isShowModal,
  });

  // Paginated data
  const paginatedData = useCallback(() => {
    const offset = currentPage * itemsPerPage;
    return (
      products?.length > 0 && products.slice(offset, offset + itemsPerPage)
    );
  }, [currentPage, itemsPerPage, products]);

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
    const sortedData = [...products];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [products, sortConfig]);

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
            const res = await axiosSecure.delete(`/products/${id}`);
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
      <div className="container  mx-auto p-6 pt-0">
        <div className="flex justify-between items-center mb-9">
          <h1 className="text-3xl font-semibold header">Product List</h1>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center">
            <TableSkeleton></TableSkeleton>
          </div>
        ) : (
          <div className="overflow-x-auto relative shadow sm:rounded-lg">
            <table className="w-full text-center text-lg text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <td
                    className="border p-2 text-center text-base cursor-pointer"
                    onClick={() => handleSort("_id")}
                  >
                    <div className="flex  justify-center items-center gap-1">
                      SL
                      {sortConfig.key === "_id" &&
                        (sortConfig.direction === "asc" ? (
                          <HiArrowCircleUp className="text-[#087D6D] " />
                        ) : (
                          <HiArrowCircleDown className="text-[#E68923]" />
                        ))}
                    </div>
                  </td>
                  <td
                    className="border p-2 text-center text-base cursor-pointer"
                    onClick={() => handleSort("thumbnail")}
                  >
                    <div className="flex justify-center items-center gap-1">
                      Thumbnail
                      {sortConfig.key === "thumbnail" &&
                        (sortConfig.direction === "asc" ? (
                          <HiArrowCircleUp className="text-[#087D6D]" />
                        ) : (
                          <HiArrowCircleDown className="text-[#E68923]" />
                        ))}
                    </div>
                  </td>
                  <td
                    className="border p-2 text-center text-base cursor-pointer"
                    onClick={() => handleSort("productTitle")}
                  >
                    <div className="flex justify-center items-center gap-1">
                      Product Title
                      {sortConfig.key === "productTitle" &&
                        (sortConfig.direction === "asc" ? (
                          <HiArrowCircleUp className="text-[#087D6D]" />
                        ) : (
                          <HiArrowCircleDown className="text-[#E68923]" />
                        ))}
                    </div>
                  </td>
                  <td
                    className="border p-2 text-center text-base cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex justify-center items-center gap-1">
                      Price
                      {sortConfig.key === "price" &&
                        (sortConfig.direction === "asc" ? (
                          <HiArrowCircleUp className="text-[#087D6D]" />
                        ) : (
                          <HiArrowCircleDown className="text-[#E68923]" />
                        ))}
                    </div>
                  </td>
                  <td
                    className="border p-2 text-center text-base cursor-pointer"
                    onClick={() => handleSort("discountPrice")}
                  >
                    <div className="flex justify-center items-center gap-1">
                      Discount
                      {sortConfig.key === "discountPrice" &&
                        (sortConfig.direction === "asc" ? (
                          <HiArrowCircleUp className="text-[#087D6D]" />
                        ) : (
                          <HiArrowCircleDown className="text-[#E68923]" />
                        ))}
                    </div>
                  </td>
                  <td
                    className="border p-2 text-center text-base cursor-pointer"
                    onClick={() => handleSort("stock")}
                  >
                    <div className="flex justify-center items-center gap-1">
                      Stock
                      {sortConfig.key === "stock" &&
                        (sortConfig.direction === "asc" ? (
                          <HiArrowCircleUp className="text-[#087D6D]" />
                        ) : (
                          <HiArrowCircleDown className="text-[#E68923]" />
                        ))}
                    </div>
                  </td>
                  <td
                    className="border p-2 text-center text-base cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex justify-center items-center gap-1">
                      Category
                      {sortConfig.key === "category" &&
                        (sortConfig.direction === "asc" ? (
                          <HiArrowCircleUp className="text-[#087D6D]" />
                        ) : (
                          <HiArrowCircleDown className="text-[#E68923]" />
                        ))}
                    </div>
                  </td>
                  <td className="border p-2 text-center text-base">Action</td>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 &&
                  products.map((item, index) => (
                    <tr key={item._id} className="border-b">
                      <td className="border p-2">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="border p-2">
                        <CellImage
                          width={400}
                          height={400}
                          src={item.thumbnail}
                          alt="Image"
                        />
                      </td>
                      <td className="border p-2">{item.productTitle}</td>
                      <td className="border p-2">{item.price}</td>
                      <td className="border p-2">{item.discountPrice}</td>
                      <td className="border p-2">{item.stock}</td>
                      <td className="border p-2">{item.category}</td>
                      <td className="border p-2">
                        <div className="flex justify-center space-x-2">
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

        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Modal for Adding/Editing Brand */}
      <Modal isShowModal={isEdited} setIsShowModal={setIsEdited}>
        <EditProductForm
          targetId={targetId}
          isShowModal={isEdited}
          setIsShowModal={setIsEdited}
        />
      </Modal>
    </>
  );
};

export default ProductFlag;
