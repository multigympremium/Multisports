"use client";
import BgBlurModal from "@/components/shared/Modal/BgBlurModal";
import useGetAllOrders from "@/Hook/GetDataHook/useGetAllOrders";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import OrderDetail from "./OrderDetail";





export default function AllOrders() {
  // const [orders, setOrders] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const itemsPerPage = 5;

  const orders = useGetAllOrders({})

  console.log(orders, "orders");

  // Filter orders based on the search term
  const filteredOrders = orders.filter(
    (order) =>
      order?.products.map(item => item.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const totalPending = orders
  //   .filter((order) => order.status === "Pending")
  //   .reduce((acc, order) => acc + order.total, 0);
  // const totalApproved = orders
  //   .filter((order) => order.status === "Approved")
  //   .reduce((acc, order) => acc + order.total, 0);
  // const totalDelivered = orders
  //   .filter((order) => order.status === "Delivered")
  //   .reduce((acc, order) => acc + order.total, 0);
  // const totalCancelled = orders
  //   .filter((order) => order.status === "Cancelled")
  //   .reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold">Total Pending Orders</h3>
            {/* <p className="text-2xl mt-2">৳ {totalPending.toFixed(2)}</p> */}
            <p className="text-2xl mt-2">৳ 0</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold">Total Approved Orders</h3>
            {/* <p className="text-2xl mt-2">৳ {totalApproved.toFixed(2)}</p> */}
            <p className="text-2xl mt-2">৳ 0</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold">Total Delivered Orders</h3>
            {/* <p className="text-2xl mt-2">৳ {totalDelivered.toFixed(2)} 0</p> */}
            <p className="text-2xl mt-2">৳  0</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-bold">Total Cancelled Orders</h3>
            {/* <p className="text-2xl mt-2">৳ {totalCancelled.toFixed(2)}0</p> */}
            <p className="text-2xl mt-2">৳ 0</p>
          </div>
        </div>

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
                      <button className="text-red-500 hover:text-red-700">
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
        {/* <div className="mt-4 flex justify-between">
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
        </div> */}
      </div>

      <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <OrderDetail id={targetId} isShow={isShowDetail} setIsShow={setIsShowDetail} />
      </BgBlurModal>
    </div>
  );
}
