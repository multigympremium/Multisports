"use client";
import { useState } from "react";

export default function CustomCSSJSForm() {
  const [customCSS, setCustomCSS] = useState("");
  const [headerScript, setHeaderScript] = useState("");
  const [footerScript, setFooterScript] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      customCSS,
      headerScript,
      footerScript,
    });
  };

  return (
    <div className="min-h-screen  bg-gray-100  p-5">
      <div className="w-full h-full  bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Custom CSS & JS Form</h1>
        <form
          onSubmit={handleSubmit}
          className=" grid grid-cols-3 gap-4 justify-between items-center "
        >
          {/* Custom CSS */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Write Custom CSS
            </label>
            <textarea
              className="w-full  p-2 border rounded-md bg-gray-800 text-white min-h-[600px]"
              value={customCSS}
              onChange={(e) => setCustomCSS(e.target.value)}
            ></textarea>
          </div>

          {/* Header Custom Script */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 ">
              Header Custom Script
            </label>
            <textarea
              className="w-full  p-2 border rounded-md bg-gray-800 text-white min-h-[600px]"
              value={headerScript}
              onChange={(e) => setHeaderScript(e.target.value)}
            ></textarea>
          </div>

          {/* Footer Custom Script */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Footer Custom Script
            </label>
            <textarea
              className="w-full h-40 p-2 border rounded-md bg-gray-800 text-white min-h-[600px]"
              value={footerScript}
              onChange={(e) => setFooterScript(e.target.value)}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={() => {
                setCustomCSS("");
                setHeaderScript("");
                setFooterScript("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
