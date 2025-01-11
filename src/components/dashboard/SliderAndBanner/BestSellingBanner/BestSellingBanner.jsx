import BgBlurModal from "../../../../shared/Modal/BgBlurModal";
import { useState } from "react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import CellImage from "../../../../shared/ImageComponents/CellImage";
import CreateBestSellingBannerForm from "./forms/CreateBestSellingBannerForm";
import UpdateBestSellingBannerForm from "./forms/UpdateBestSellingBannerForm";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DeleteButton from "../../../../components library/DeleteButton";
import EditButton from "../../../../components library/EditButton";
import Mpagination from "../../../../shared/Mpagination";
import useGetAllBestSellingBanner from "../../../../Hook/GetDataHook/useGetAllBestSellingBanner";

const BestSellingBanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);
  const axiosSecure = useAxiosSecure();

  const banners = useGetAllBestSellingBanner({
    isShowModal: showModal,
    isDeleted,
    isEdited: isEdit,
  });

  const { paginatedData, paginationControls } = Mpagination({
    totalData: banners,
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
            const res = await axiosSecure.delete(`/best-selling-banners/${id}`);
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
      toast.error("Error deleting Best Selling!");
    }
    console.log(`Delete Best Selling with ID: ${id}`);
  };

  return (
    <div className="p-6 pt-0">
      <div className="">
        <div className="flex justify-between mb-9 items-center">
          <h1 className="text-3xl font-semibold ">Best Selling Banner List</h1>
          <div>
            <button
              className="customSaveButton"
              onClick={() => setShowModal(true)}
            >
              + Add Best Selling Banner
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead className="bg-gray-200 text-center">
            <tr>
              <td scope="col" className="py-3 px-6">
                SL
              </td>
              <td scope="col" className="py-3 px-6">
                Image
              </td>
              <td scope="col" className="py-3 px-6">
                Title
              </td>
              <td scope="col" className="py-3 px-6">
                Subtitle
              </td>
              <td scope="col" className="py-3 px-6">
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((slider, index) => (
                <tr key={index} className="bg-white border-b text-center">
                  <td className="py-3 border px-6">{index + 1}</td>
                  <td className="py-3 px-6 border">
                    <div className="flex justify-center">
                      <CellImage
                        width={400}
                        height={400}
                        src={slider?.image}
                        alt={slider?.title}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-6 border">{slider.title}</td>
                  <td className="py-3 px-6 border">{slider.subtitle}</td>
                  <td className="py-3 space-x-2 px-6 border">
                    <EditButton
                      onClick={() => handleEdit(slider._id)}
                    ></EditButton>
                    <DeleteButton
                      onClick={() => handleDelete(slider._id, slider.key)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginationControls}

      <BgBlurModal isShowModal={showModal} setIsShowModal={setShowModal}>
        <CreateBestSellingBannerForm setIsShow={setShowModal} />
      </BgBlurModal>
      <BgBlurModal isShowModal={isEdit} setIsShowModal={setIsEdit}>
        <UpdateBestSellingBannerForm
          targetId={targetId}
          isShow={isEdit}
          setIsShow={setIsEdit}
        />
      </BgBlurModal>
    </div>
  );
};

export default BestSellingBanner;