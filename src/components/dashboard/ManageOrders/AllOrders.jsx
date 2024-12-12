"use client";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import useGetAllOrders from "../../../Hook/GetDataHook/useGetAllOrders";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import OrderDetail from "./OrderDetail";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import EditButton from "../../../components library/EditButton";
import DeleteButton from "../../../components library/DeleteButton";
import CourierMethodModal from "../../../shared/cart/viewCart/CourierMethodModal";
import { set } from "react-hook-form";
import Pagination from "../../partial/Pagination/Pagination";

export default function AllOrders() {
  // const [orders, setOrders] = useState(initialData);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const [isShowCourier, setIsShowCourier] = useState(false);
  const [courierMethod, setSetCourierMethod] = useState("");
  const itemsPerPage = 5;

  const { orders, totalItems } = useGetAllOrders({
    isDeleted,
    isShowModal: isShowDetail,
    query: `page=${currentPage}`,
  });

  console.log(orders, "orders");

  // Filter orders based on the search term
  const filteredOrders = orders.filter((order) =>
    order?.items.map((item) =>
      item.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  const totalPending = parseFloat(
    orders
      .filter((order) => order.status === "Pending")
      .reduce((acc, order) => acc + order.total, 0)
  );
  const totalApproved = parseFloat(
    orders
      .filter((order) => order.status === "Approved")
      .reduce((acc, order) => acc + order.total, 0)
  );
  const totalDelivered = parseFloat(
    orders
      .filter((order) => order.status === "Delivered")
      .reduce((acc, order) => acc + order.total, 0)
  );
  const totalCancelled = parseFloat(
    orders
      .filter((order) => order.status === "Cancelled")
      .reduce((acc, order) => acc + order.total, 0)
  );

  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to accept this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#087D6D",
      cancelButtonColor: "#E68923",
      confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete");
        setTargetId(id);
        setIsShowCourier(true);
      }
    });
    console.log(id, "id");
  };

  return (
    <div className="p-6 pt-0">
      <div className="max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#087D6D] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Delivered Orders</h3>
            <p className="text-2xl mt-2">৳ {totalDelivered.toFixed(2)}</p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>

          <div className="bg-[#E68923] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Pending Orders</h3>
            <p className="text-2xl mt-2">৳ {totalPending.toFixed(2)}</p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>

          <div className="bg-[#31B349] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Approved Orders</h3>
            <p className="text-2xl mt-2">৳ {totalApproved.toFixed(2)}</p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>

          <div className="bg-[#EB1C24] p-6 text-white font-semibold  rounded-2xl">
            <h3 className="text-xl ">Total Cancelled Orders</h3>
            <p className="text-2xl mt-2">৳ {totalCancelled.toFixed(2)}</p>
            {/* <p className="text-2xl mt-2">৳ 0</p> */}
          </div>
        </div>

        {/* Search Input */}
        <div className="bg-white border rounded-full px-3 mb-6 md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
          <input
            type="text"
            className="outline-none w-full bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here ..."
          />
          <IoIosSearch className="text-2xl text-gray-400" />
        </div>

        {/* Orders Table */}
        <table className="min-w-full table-auto border-collapse bg-white  rounded-md">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="p-2 border">SL</td>
              <td className="p-2 border">Order No</td>
              <td className="p-2 border">Order Date</td>
              <td className="p-2 border">Name</td>
              <td className="p-2 border">Email</td>
              <td className="p-2 border">Phone</td>
              <td className="p-2 border">Status</td>
              <td className="p-2 border">Payment</td>
              <td className="p-2 border">Total</td>
              <td className="p-2 border">Action</td>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders?.map((order, index) => (
                <tr key={order._id} className="border-b text-center">
                  <td className="p-2 border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="p-2 border">{order._id}</td>
                  <td className="p-2 border">{order.createdAt}</td>
                  <td className="p-2 border">
                    {order?.shipping_address_id?.recipientName}
                  </td>
                  <td className="p-2 border">
                    {order?.shipping_address_id?.email || "N/A"}
                  </td>
                  <td className="p-2 border">
                    {order?.shipping_address_id?.contactNumber}
                  </td>
                  <td className="p-2 border ">
                    <span className="bg-red-500 text-white  px-3 rounded-lg  py-1">
                      {order?.status}
                    </span>
                  </td>
                  <td className="p-2 border">{order?.payment_method}</td>
                  <td className="p-2 border">৳ {order?.total}</td>
                  <td className="p-2 border">
                    <div className="flex justify-center space-x-2">
                      {order?.status === "Pending" && (
                        <button
                          onClick={() => handleAccept(order._id)}
                          className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold"
                        >
                          Accept Order
                        </button>
                      )}
                      <EditButton
                        onClick={() => {
                          setIsShowDetail(true);
                          setTargetId(order._id);
                        }}
                      />

                      <DeleteButton onClick={() => handleDelete(order._id)} />
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
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <OrderDetail
          id={targetId}
          isShow={isShowDetail}
          setIsShow={setIsShowDetail}
        />
      </BgBlurModal>

      <BgBlurModal
        isShowModal={isShowCourier}
        setIsShowModal={setIsShowCourier}
      >
        <CourierMethodModal
          setCourierMethod={setSetCourierMethod}
          setIsShowPaymentMethod={setIsShowPaymentMethod}
          setIsShow={setIsShowCourier}
          targetId={targetId}
        />
      </BgBlurModal>
    </div>
  );
}
