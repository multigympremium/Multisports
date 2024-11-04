"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function CreatePromoCodeForm() {
  const [promoIcon, setPromoIcon] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPromoIcon(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here (e.g., API call to save the promo code)
    const promoData = {
      promoIcon,
      title,
      description,
      effectiveDate,
      expiryDate,
      type,
      value,
      minOrderAmount,
      code,
    };

    console.log("Promo Data:", promoData);
    setMessage("Promo Code Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Promo Code Entry Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            {/* Promo Icon Upload */}
            <div>
              <label className="block font-bold mb-2">Promo Icon</label>
              <div
                {...getRootProps()}
                className="w-full p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {promoIcon ? (
                  <p>{promoIcon.name}</p>
                ) : (
                  <p>Drag and drop a file here or click</p>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div className="col-span-2">
              <label className="block font-bold mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Promo Title"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-3">
              <label className="block font-bold mb-2">Short Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="3"
                placeholder="Enter Promo Description"
              />
            </div>

            {/* Effective Date */}
            <div>
              <label className="block font-bold mb-2">Effective Date *</label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block font-bold mb-2">Expiry Date *</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Promo Type */}
            <div>
              <label className="block font-bold mb-2">Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Type</option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            {/* Promo Value */}
            <div>
              <label className="block font-bold mb-2">Value *</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Promo Value"
                required
              />
            </div>

            {/* Minimum Order Amount */}
            <div>
              <label className="block font-bold mb-2">
                Minimum Order Amount
              </label>
              <input
                type="number"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Minimum Order Amount"
              />
            </div>

            {/* Promo Code */}
            <div>
              <label className="block font-bold mb-2">Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Promo Code"
                required
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white mt-5 py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Promo Code
          </button>

          {/* Success Message */}
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  );
}
