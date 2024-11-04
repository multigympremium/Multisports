"use client";
import Image from "next/image";
import { useState } from "react";

export default function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState("Classic");

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">
          Choose Your Default Order Placed Mail Template
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Regular Template */}
          <div
            className={`border-2 rounded-md overflow-hidden cursor-pointer ${
              selectedTemplate === "Regular"
                ? "border-green-500"
                : "border-gray-200"
            }`}
            onClick={() => handleTemplateSelect("Regular")}
          >
            <div className="p-4 flex justify-between items-center bg-gray-100">
              <div className="font-bold">Regular</div>
              <div>
                <input
                  type="checkbox"
                  checked={selectedTemplate === "Regular"}
                  onChange={() => handleTemplateSelect("Regular")}
                  className="toggle-checkbox"
                />
              </div>
            </div>
            <Image
              width={400}
              height={400}
              src="/images/regular-template.png" // This is a placeholder. You can replace this with your actual template image
              alt="Regular Template"
              className="w-full h-auto"
            />
            <div className="p-4 bg-gray-50">
              <p>Your order has been received!</p>
            </div>
          </div>

          {/* Classic Template */}
          <div
            className={`border-2 rounded-md overflow-hidden cursor-pointer ${
              selectedTemplate === "Classic"
                ? "border-green-500"
                : "border-gray-200"
            }`}
            onClick={() => handleTemplateSelect("Classic")}
          >
            <div className="p-4 flex justify-between items-center bg-gray-100">
              <div className="font-bold">Classic</div>
              <div>
                <input
                  type="checkbox"
                  checked={selectedTemplate === "Classic"}
                  onChange={() => handleTemplateSelect("Classic")}
                  className="toggle-checkbox"
                />
              </div>
            </div>
            <Image
              width={400}
              height={400}
              src="/images/classic-template.png" // This is a placeholder. You can replace this with your actual template image
              alt="Classic Template"
              className="w-full h-auto"
            />
            <div className="p-4 bg-gray-50">
              <p>Your order has been received!</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={() =>
              alert(`You have selected the ${selectedTemplate} template.`)
            }
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
