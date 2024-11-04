"use client";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function EditProductColorForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [productColor, setProductColor] = useState("");
  const [productColorName, setProductColorName] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchproductColorData() {
      try {
        const res = await axiosSecure.get(`/product-color/${targetId}`);
        const productColorData = res?.data?.data;

        // Populate form fields with existing data
        setProductColor(productColorData.productColor);
        setProductColorName(productColorData.productColorName);
      } catch (error) {
        console.error("Error fetching productColor data:", error);
      }
    }

    if (targetId) {
      fetchproductColorData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productColor", productColor);
    formData.append("productColorName", productColorName);

    try {
      const res = await axiosSecure.put(`/product-color/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "productColor updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      setIsShowModal(false);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setProductColor("");
  };

  return (
    <div className="w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Edit Product Color Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Color Code *
            </label>
            <input
              type="text"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Model Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Color Name *
            </label>
            <input
              type="text"
              value={productColorName}
              onChange={(e) => setProductColorName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Model Name"
              required
            />
          </div>

          <div className="flex justify-end mt-4 gap-6">
            <button
              type="button"
              className="w-full p-3 bg-gray-500 text-white font-bold rounded-md"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-md"
            >
              Update Size Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
