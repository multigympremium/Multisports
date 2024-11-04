"use client";
import DragEditUploadImageInput from "@/components/shared/DragEditUploadImageInput";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function EditProductFlagForm({
  targetId,
  setIsShowModal,
  isShowModal,
}) {
  const [flagName, setFlagName] = useState("");
  const [flagIcon, setFlagIcon] = useState(null);
  const [flagIconPreview, setFlagIconPreview] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    async function fetchProductFlagData() {
      try {
        const res = await axiosSecure.get(`/product-flag/${targetId}`);
        const ProductFlagData = res?.data?.data;

        // Populate form fields with existing data
        setFlagName(ProductFlagData.flagName);
        setFlagIconPreview(ProductFlagData.flagIcon);
      } catch (error) {
        console.error("Error fetching sizeName data:", error);
      }
    }

    if (targetId) {
      fetchProductFlagData();
    }

    if (!isShowModal) {
      handleCloseModal();
    }
  }, [targetId, axiosSecure, isShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("flagName", flagName);

    if (!flagName) {
      Swal.fire({
        title: "Error!",
        text: "Please fill the flag name field",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (flagIcon) {
      formData.append("flagIcon", flagIcon);
    }

    try {
      const res = await axiosSecure.put(`/product-flag/${targetId}`, formData);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "product flag updated successfully",
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

  const onDropIcon = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming one file for simplicity

    // Create a local URL for the dropped image
    const previewUrl = URL.createObjectURL(file);
    // Set the state with the URL
    setFlagIconPreview(previewUrl);
    setFlagIcon(acceptedFiles[0]);
  };

  const { getRootProps: getIconRootProps, getInputProps: getIconInputProps } =
    useDropzone({
      onDrop: onDropIcon,
      accept: "image/*",
      multiple: false,
    });

  const handleCloseModal = () => {
    setIsShowModal(false);
    setFlagName("");
    setFlagIcon(null);
    setFlagIconPreview("");
  };

  return (
    <div className="w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Edit Flag Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Flag Name *
            </label>
            <input
              type="text"
              value={flagName}
              onChange={(e) => setFlagName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Model Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Icon *</label>

            <DragEditUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={flagIcon}
              imagePreview={flagIconPreview}
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
              Update Flag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
