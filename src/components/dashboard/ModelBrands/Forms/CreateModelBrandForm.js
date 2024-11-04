"use client";
import SwitchInput from "@/components/shared/SwitchInput";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import useGetAllModelOfBrands from "@/Hook/GetDataHook/useGetAllModelOfBrands";
import useGetAllProductBrands from "@/Hook/GetDataHook/useGetAllProductBrands";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateModelBrandForm({ isShowModal, setIsShowModal }) {
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [code, setCode] = useState("");
  const productBrands = useGetAllProductBrands({});

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(brand, "brand", modelName, "modelName", slug, "slug", code);

    if (!brand || !modelName || !slug || !code) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("modelName", modelName);
    formData.append("slug", slug);
    formData.append("isActive", isActive);
    formData.append("code", code);

    try {
      const res = await axiosSecure.post("/model-brands", formData);

      if (res.status === 200 || res.status === 201) {
        handleCloseModal();
        Swal.fire({
          title: "Success!",
          text: "Brand created successfully",
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

  const handleCloseModal = () => {
    setIsShowModal(false);
    setBrand("");
    setModelName("");
    setSlug("");
    setIsActive(false);
    setCode("");
  };

  const handleModelNameInput = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
    setModelName(input);
  };
  const handleSlugInput = (input) => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, "_");
    setSlug(sanitizedInput);
  };

  return (
    <div className="w-[80%] bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Create Brand Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Brand Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Brand *
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Brand</option>
              {productBrands.map((brand) => (
                <option key={brand._id} value={brand.slug}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Model Name *
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => handleModelNameInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Model Name"
              required
            />
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Slug"
              required
            />
          </div>

          <SwitchInput
            label="Active"
            checked={isActive}
            setChecked={setIsActive}
          />

          {/* Code */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Code *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Code"
              required
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
              Save Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
