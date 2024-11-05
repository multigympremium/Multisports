"use client";
import BgBlurModal from "@/components/shared/Modal/BgBlurModal";
import { useState } from "react";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import CellImage from "@/components/shared/ImageComponents/CellImage";
import CreateShoesBannerForm from "./forms/CreateShoesBannerForm";
import UpdateShoesBannerForm from "./forms/UpdateShoesBannerForm";
import useGetAllShoesBanners from "@/Hook/GetDataHook/useGetAllShoesBanners";

const ShoesBanners = () => {
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);
  const axiosSecure = useAxiosSecure();

  const banners = useGetAllShoesBanners({
    isShowModal: showModal,
    isDeleted,
    isEdited: isEdit,
  });

  // Simulate fetching data

  const handleEdit = (id) => {
    setTargetId(id);
    setIsEdit(true);
  };

  const handleDelete = async (id, file_key) => {
    console.log(file_key, "file_key", id);
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
            const res = await axiosSecure.delete(`/shoes-banners/${id}`);
            console.log(res, "res");
            if (res.status === 200 || res.status === 201) {
              
              setIsDeleted((prev) => !prev);

              toast.success("Banner deleted successfully!");
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shoes Banner List</h1>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            onClick={() => setShowModal(true)}
          >
            Add Shoes Banner
          </button>
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                SL
              </th>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Subtitle
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {banners.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No data available in table
                </td>
              </tr>
            ) : (
              banners.map((slider, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                  <CellImage
                        width={400}
                        height={400}
                        src={slider?.image}
                      alt={slider?.title}
                      />
                  </td>
                  <td className="py-3 px-6">{slider.title}</td>
                  <td className="py-3 px-6">{slider.subtitle}</td>
                  <td className="py-3 px-6">
                    <button
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      onClick={() => handleEdit(slider._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                      onClick={() => handleDelete(slider._id, slider.key)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <BgBlurModal isShowModal={showModal} setIsShowModal={setShowModal}>
        <CreateShoesBannerForm setIsShow={setShowModal} />
      </BgBlurModal>
      <BgBlurModal isShowModal={isEdit} setIsShowModal={setIsEdit}>
        <UpdateShoesBannerForm
          targetId={targetId}
          isShow={isEdit}
          setIsShow={setIsEdit}
        />
      </BgBlurModal>
    </div>
  );
};

export default ShoesBanners;
