"use client";

import { useState, useEffect } from "react";

export default function FacebookPixelForm() {
  const [pixelId, setPixelId] = useState('');
  

  useEffect(() => {
    const pixelId = localStorage.getItem('facebookPixelId');

    setPixelId(pixelId);

  }, []);

  const handleSave = () => {
    localStorage.setItem('facebookPixelId', pixelId);
    alert('Facebook Pixel ID saved!');
  };

  return (
    <div className="w-full rounded-2xl bg-gray-100 p-10">
      <div className="w-full mx-auto ">
        <h1 className="text-2xl text-center text-gray-700 font-semibold mb-9">Facebook Pixel</h1>
        <form onSubmit={handleSave}>
          {/* Model Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              {/* Size Name */}
            </label>
            <input
              type="text"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              className="customInput"
              placeholder="Facebook Pixel ID"
              required
            />
          </div>
            <button
              type="submit"
              className="customSaveButton w-full"
            >
              Update
            </button>

         
        </form>
      </div>
    </div>
  );
}
