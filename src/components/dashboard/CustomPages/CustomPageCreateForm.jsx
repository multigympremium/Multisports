"use client";
// components/CustomPageCreateForm.js
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { lazy, Suspense } from "react";

// Dynamically import react-quill to prevent SSR issues
const ReactQuill = lazy(() => import("react-quill"), { ssr: false });

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
    <div className="p-6 pt-0">
      <form
        onSubmit={handleSubmit}
        className=""
      >
        <h2 className="text-3xl font-semibold mb-9">Custom Page Create Form</h2>

        {/* Page Feature Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm">
            Page Feature Image (1112px x 400px):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="customInput"
          />
        </div>

        {/* Meta Title */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm"
            htmlFor="metaTitle"
          >
            Page Meta Title (SEO):
          </label>
          <input
            id="metaTitle"
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="customInput"
            placeholder="Meta Title"
          />
        </div>

        {/* Meta Keywords */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm"
            htmlFor="metaKeywords"
          >
            Page Meta Keywords (SEO):
          </label>
          <input
            id="metaKeywords"
            type="text"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="customInput"
            placeholder="Meta Keywords"
          />
        </div>

        {/* Meta Description */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm"
            htmlFor="metaDescription"
          >
            Page Meta Description (SEO):
          </label>
          <textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="customInput resize-none"
            placeholder="Meta Description Here"
          />
        </div>

        {/* Page Title */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm"
            htmlFor="pageTitle"
          >
            Page Title:
          </label>
          <input
            id="pageTitle"
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className="customInput"
            placeholder="Page Title"
          />
        </div>

        {/* Page Description (Rich Text Editor) */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="content"
          >
            Page Description:
          </label>
          <Suspense fallback={<div>Loading...</div>}>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className=" rounded-lg  w-full"
            style={{ height: "200px" }}
          />
          </Suspense>
        </div>

        {/* Submit Button */}
        <div className="flex items-center mt-16 justify-end">
          <button
            type="submit"
            className="customSaveButton"
          >
            Save Custom Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomPageCreateForm;
