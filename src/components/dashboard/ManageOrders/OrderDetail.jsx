// /pages/orders/[id].js

import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import GlobalLoading from "../../../components library/GlobalLoading";
import toast from "react-hot-toast";

export default function OrderDetail({
  id,
  isShow,
  setIsShow,
  isStatus = true,
}) {
  const axiosSecure = useAxiosSecure();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [orderDetail, setOrderDetail] = useState([]);

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

  const handlePropertyName = (name) => {
    switch (name) {
      case "deliveryCharge":
        return "delivery Charge";
      case "itemPerDiscount":
        return "item Per Discount";
      case "createdAt":
        return "created At";
      default:
        return name.replaceAll("_", " ");
    }
  };

  const handleSetCurrencySymbol = (name) => {
    switch (name) {
      case "deliveryCharge":
        return "৳";
      case "itemPerDiscount":
        return "৳";
      case "discount":
        return "৳";
      case "total":
        return "৳";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!order) return;
    const newArrayData = Object.entries(order).map(([key, value]) => ({
      name: key,
      value,
    }));
    const itemIndex = newArrayData.findIndex((item) => item.name === "items");
    const _idIndex = newArrayData.findIndex((item) => item.name === "_id");
    const _vIndex = newArrayData.findIndex((item) => item.name === "__v");

    delete newArrayData[itemIndex];
    delete newArrayData[_idIndex];
    delete newArrayData[_vIndex];

    setOrderDetail(newArrayData);
  }, [order]);

  if (!order) {
    return <GlobalLoading />;
  }

  return (
    <div className="w-full h-[85vh] overflow-auto mt-6 mx-auto p-6 bg-white rounded-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Order Details
      </h2>

      <div className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col flex-wrap max-h-[400px] gap-x-2">
        {orderDetail.map((item, index) => {
          if (item.name === "createdAt" || item.name === "updatedAt") {
            return (
              <p
                className="mb-2 w-[48%] flex justify-between items-center gap-3"
                key={index}
              >
                <strong className="uppercase">
                  {handlePropertyName(item.name)}
                </strong>{" "}
                {moment(order?.value).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            );
          } else {
            return (
              <p
                className="mb-2 w-[48%] flex justify-between items-center gap-3"
                key={index}
              >
                <strong className="uppercase">
                  {handlePropertyName(item.name)}
                </strong>{" "}
                {handleSetCurrencySymbol(item.name) + item.value}
              </p>
            );
          }
        })}

        {isStatus && (
          <p className="mb-2 w-[48%] flex justify-between items-center  mt-3">
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
        )}
      </div>

      {/* Products */}
      <div className="mt-5">
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
                <strong>Color Name:</strong> {product?.colorName || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Color:</strong>{" "}
                <span
                  className="w-8 h-3 rounded-sm inline-block"
                  style={{ background: product?.color }}
                ></span>
              </p>
              <p className="mb-2">
                <strong>Size:</strong> {product?.size || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Quantity:</strong> {product?.quantity}
              </p>
              <p className="text-gray-700 font-semibold mb-2">
                <strong>Price:</strong> ৳{product?.price}
              </p>
              <p className="text-gray-700 font-semibold mb-2">
                <strong>Discount Price:</strong> ৳{product?.discountPrice}
              </p>
              <p className="text-gray-700 font-semibold ">
                <strong>Subtotal:</strong> ৳{product?.price * product?.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
