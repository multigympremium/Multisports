// /pages/orders/[id].js

import { useState, useEffect } from "react";
import moment from "moment";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import GlobalLoading from "../../../components library/GlobalLoading";

import { useParams } from "react-router-dom";

export default function MyOrder() {
  const axiosSecure = useAxiosSecure();
  const id = useParams()?.id;
  console.log(id, "id my order");

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/single/${id}`);
        setOrder(res?.data?.data);
        setStatus(res?.data?.data?.status);
        console.log(res?.data?.data, "res?.data?.data");
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [axiosSecure, id]);

  const handlePropertyName = (name) => {
    switch (name) {
      case "deliveryCharge":
        return "delivery Charge";
      case "itemPerDiscount":
        return "item Per Discount";
      case "createdAt":
        return "created At";
      case "totalItems":
        return "Total Items";
      case "updatedAt":
        return "updated At";
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

  //   if (!order) {
  //     return <GlobalLoading />;
  //   }

  return (
    <div className="w-full  mt-6 mx-auto p-6 bg-white rounded-2xl">
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
                <span
                  className={`${
                    (item.name == "status" && "text-yellow-600 font-bold") ||
                    (item.name == "deliveryCharge" &&
                      "text-red-600 font-bold") ||
                    (item.name == "itemPerDiscount" &&
                      "text-green-600 font-bold") ||
                    (item.name == "discount" && "text-green-600 font-bold") ||
                    (item.name == "total" && "text-green-600 font-bold")
                  }`}
                >
                  {handleSetCurrencySymbol(item.name) + item.value}
                </span>
              </p>
            );
          }
        })}
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
