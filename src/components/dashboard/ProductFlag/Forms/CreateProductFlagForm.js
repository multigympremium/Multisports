"use client";
import DragUploadImageInput from "@/components/shared/DragUploadImageInput";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function CreateProductFlagForm({ isShowModal, setIsShowModal }) {
  const [flagName, setFlagName] = useState("");
  const [flagIcon, setFlagIcon] = useState(null);
  const [flagIconPreview, setFlagIconPreview] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(flagName, "flagName");

    if (!flagName) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

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
      const res = await axiosSecure.post("/product-flag", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "flagName created successfully",
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
  };

  return (
    <div className="w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Create flag Form</h1>
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
            <label className="block text-gray-700 font-bold mb-2">Icon</label>

            <DragUploadImageInput
              getRootProps={getIconRootProps}
              getInputProps={getIconInputProps}
              image={flagIcon}
              imagePreview={flagIconPreview}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save flag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
