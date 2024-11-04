"use client";
// components/CustomPageCreateForm.js
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import react-quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CustomPageCreateForm = () => {
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [featureImage, setFeatureImage] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFeatureImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    const formData = new FormData();
    formData.append("content", content);
    formData.append("metaTitle", metaTitle);
    formData.append("metaKeywords", metaKeywords);
    formData.append("metaDescription", metaDescription);
    formData.append("pageTitle", pageTitle);
    if (featureImage) {
      formData.append("featureImage", featureImage);
    }

    // Example API call to send data
    try {
      const response = await axios.post("/api/save-custom-page", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Page saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving the page:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6">Custom Page Create Form</h2>

        {/* Page Feature Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Page Feature Image (1112px x 400px):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Meta Title */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaTitle"
          >
            Page Meta Title (SEO):
          </label>
          <input
            id="metaTitle"
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Meta Title"
          />
        </div>

        {/* Meta Keywords */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaKeywords"
          >
            Page Meta Keywords (SEO):
          </label>
          <input
            id="metaKeywords"
            type="text"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Meta Keywords"
          />
        </div>

        {/* Meta Description */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="metaDescription"
          >
            Page Meta Description (SEO):
          </label>
          <textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Meta Description Here"
          />
        </div>

        {/* Page Title */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pageTitle"
          >
            Page Title:
          </label>
          <input
            id="pageTitle"
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Page Title"
          />
        </div>

        {/* Page Description (Rich Text Editor) */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Page Description:
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="border rounded-lg p-2 w-full"
            style={{ height: "200px" }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Custom Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomPageCreateForm;
