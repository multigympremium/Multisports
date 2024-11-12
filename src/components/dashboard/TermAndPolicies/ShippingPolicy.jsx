"use client";
// components/ShippingPolicy.js
import React, { useEffect, useState } from "react";
import CustomEditor from "../../../shared/CustomEditor/CustomEditor";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ShippingPolicy = () => {
  const [content, setContent] = useState("");
  const [targetId, setTargetId] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosSecure.get("/shipping_policy");
      const data = response?.data?.data;
      console.log(data);
      setContent(data[0]?.content);
      setTargetId(data[0]?._id);
    };

    fetchShippingPolicy();
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend)
    try {
      const res = await axiosSecure.post(`/shipping_policy`, {
        content,
        id: targetId,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4">Shipping Update Form</h2>

        <div className="mb-6">
          <div className="mb-[4rem]">
            <label className="block text-gray-500 text-md font-bold mb-6">
              Write Shipping Policy Here:
            </label>

            <CustomEditor value={content} setValue={setContent} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Terms And Condition
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPolicy;
