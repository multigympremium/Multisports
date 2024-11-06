"use client";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function EditBlogCategoryForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [blogCategoryName, setBlogCategoryName] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchblogCategoryNameData() {
      try {
        const res = await axiosSecure.get(`/blog-category/${targetId}`);
        const blogCategoryNameData = res?.data?.data;

        // Populate form fields with existing data
        setBlogCategoryName(blogCategoryNameData.name);
      } catch (error) {
        console.error("Error fetching blogCategoryName data:", error);
      }
    }

    if (targetId) {
      fetchblogCategoryNameData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", blogCategoryName);

    try {
      const res = await axiosSecure.put(`/blog-category/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "blogCategoryName updated successfully",
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
    setBlogCategoryName("");
  };

  return (
    <div className="w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Edit blogCategory Name Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              blogCategory Name *
            </label>
            <input
              type="text"
              value={blogCategoryName}
              onChange={(e) => setBlogCategoryName(e.target.value)}
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
              Update blogCategory Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
