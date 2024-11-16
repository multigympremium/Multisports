"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useGetAllOrders from "../../../Hook/GetDataHook/useGetAllOrders";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import OrderDetail from "./OrderDetail";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

// Sample pending orders data (could be fetched from API)
const initialData = [
  {
    id: 1,
    orderNo: "ORD12345",
    orderDate: "2024-09-25",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    status: "Pending",
    payment: "Unpaid",
    total: 1500,
  },
  {
    id: 2,
    orderNo: "ORD12346",
    orderDate: "2024-09-26",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    status: "Pending",
    payment: "Unpaid",
    total: 2500,
  },
  // Add more pending order data if needed
];

export default function CancelOrders() {
  // const [orders, setOrders] = useState(initialData);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const orders = useGetAllOrders({query:`status=Cancelled`, isDeleted, isShowModal: isShowDetail})

  console.log(orders, "orders");

  // Filter orders based on the search term
  let filteredOrders = orders;

  useEffect(() => {
    if(searchTerm === ""){
      // setOrders(orders);
      return;
    }
     filteredOrders = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // setData(filteredOrders);
  }, [orders, searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            const res = await axiosSecure.delete(`/orders/${id}`);
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

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-5">Canceled Orders</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Orders Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Order No</th>
              <th className="p-2 border">Order Date</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className="border-b">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">{order._id}</td>
                  <td className="p-2 border">{order.createdAt}</td>
                  <td className="p-2 border">{order?.shipping_address_id?.recipientName}</td>
                  <td className="p-2 border">{order?.shipping_address_id?.email || "N/A"}</td>
                  <td className="p-2 border">{order?.shipping_address_id?.contactNumber}</td>
                  <td className="p-2 border">{order?.status}</td>
                  <td className="p-2 border">{order?.payment_method}</td>
                  <td className="p-2 border">৳ {order?.total}</td>
                  <td className="p-2 border">
                    <div className="flex space-x-2">
                      <button className="text-yellow-500 hover:text-yellow-700" onClick={()=> {setIsShowDetail(true); setTargetId(order._id)}}>
                        <FiEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={()=> handleDelete(order._id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
            {filteredOrders.length} entries
          </span>
          <div className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(filteredOrders.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <OrderDetail id={targetId} isShow={isShowDetail} setIsShow={setIsShowDetail} />
      </BgBlurModal>
    </div>
  );
}
