// /pages/orders/[id].js

import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import GlobalLoading from "../../../components library/GlobalLoading";
import toast from "react-hot-toast";

export default function OrderDetail({ id, isShow, setIsShow }) {
  const axiosSecure = useAxiosSecure();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/${id}`);
        setOrder(res?.data?.data);
        setStatus(res?.data?.data?.status);
        console.log(res?.data?.data, "res?.data?.data");
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      fetchOrder();
      console.log(isShow, "isShow", id);
    }
  }, [id, isShow]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await axiosSecure.put(`/orders/${id}`, { status: newStatus });
      toast.success("Order status updated successfully!");
      setIsShow(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!order) {
    return <GlobalLoading />;
  }

  return (
    <div className="w-full h-[85vh] overflow-auto mt-6 mx-auto p-6 bg-white rounded-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Order Details
      </h2>

      <div className="w-full grid grid-cols-2 gap-6 mb-8">
        {/* Order Information */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Order Information
          </h3>
          <p className="mb-2">
            <strong>Order ID:</strong> {order?._id}
          </p>
          <p className="mb-2">
            <strong>Total:</strong> {order?.total} BDT
          </p>
          {
            order.courierMethod && 
          <p className="mb-2">
            <strong>Courier Method:</strong> {order?.courierMethod}
          </p>
          }

          {
            order.invoice && 
          <p className="mb-2">
            <strong>Invoice Id:</strong> {order?.invoice}
          </p>
          }

          {
            order.courier_status && 
          <p className="mb-2">
            <strong>Courier Status:</strong> {order?.courier_status}
          </p>
          }
          <p className="mb-2">
            <strong>Payment Method:</strong> {order?.payment_method}
          </p>
          <p className="mb-2">
            <strong>Order Date:</strong>{" "}
            {moment(order?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <p>
            <strong>Status:</strong>
            <select
              value={status}
              onChange={handleStatusChange}
              className=" select ml-4 border-gray-200 outline-none select-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </p>
        </div>

        {/* Shipping Address */}
        <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Shipping Address
          </h3>
          <p className="mb-2">
            <strong>Name:</strong> {order?.name}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {order?.phone}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {order?.address}, {order?.area},{" "}
            {order?.district}, {order?.postCode}
          </p>
          <p className="mb-2">
            <strong>City Name:</strong> {order?.city_name}
          </p>
          <p className="mb-2">
            <strong>City Id:</strong> {order?.city_id}
          </p>
          <p className="mb-2">
            <strong>Zone Name:</strong> {order?.zone_name}
          </p>
          <p className="mb-2">
            <strong>Zone Id:</strong> {order?.zone_id}
          </p>
          <p className="mb-2">
            <strong>Area Name:</strong> {order?.area_name}
          </p>
          <p className="mb-2">
            <strong>Area Id:</strong> {order?.area_id}
          </p>
        </div>
      </div>

      {/* Products */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Products</h3>
        {order?.items.map((product, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 mb-6 flex gap-4 items-start shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="relative w-[150px] h-[150px] rounded-md overflow-hidden">
              <CustomImage
                imageKey={product?.thumbnail}
                alt={"Product image"}
                className="object-cover w-full h-full"
                width={300}
                height={300}
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <p className="mb-2 text-gray-800">
                <strong>Product Name:</strong> {product?.productTitle}
              </p>
              <p className="mb-2">
                <strong>Color:</strong> {order?.productColorValue || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Size:</strong> {order?.productSizeValue || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Quantity:</strong> {product?.quantity}
              </p>
              <p className="text-gray-700 font-semibold">
                <strong>Subtotal:</strong> ${product?.price * product?.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
