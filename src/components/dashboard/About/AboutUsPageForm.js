"use client";
// pages/about.js
import React, { useState } from "react";

export default function AboutUsPageForm() {
  const [formData, setFormData] = useState({
    vision: "",
    mission: "",
    about: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Vision Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Vision Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-2">Vision Image</label>
            <input type="file" className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block font-medium mb-2">Vision Title</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              name="vision"
              value={formData.vision}
              onChange={handleChange}
            />
            <label className="block font-medium mb-2">Vision Description</label>
            <textarea
              className="border rounded w-full p-2"
              name="visionDescription"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Mission Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-2">Mission Image</label>
            <input type="file" className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block font-medium mb-2">Mission Title</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
            />
            <label className="block font-medium mb-2">
              Mission Description
            </label>
            <textarea
              className="border rounded w-full p-2"
              name="missionDescription"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div>
        <h2 className="text-2xl font-semibold">About Us Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-2">Banner Image</label>
            <input type="file" className="border rounded w-full p-2" />
            <label className="block font-medium mb-2">Side Image</label>
            <input type="file" className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block font-medium mb-2">Section Title</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
            <label className="block font-medium mb-2">Description</label>
            <textarea
              className="border rounded w-full p-2"
              name="aboutDescription"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
