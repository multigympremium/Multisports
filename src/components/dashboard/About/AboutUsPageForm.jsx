"use client";
// pages/about.js
import React, { useState } from "react";
import VisionSection from "./forms/VisionSection";
import MissionSection from "./forms/MissionSection";
import AboutUsSection from "./forms/AboutUsSection";

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
      <VisionSection />

      {/* Mission Section */}
      <MissionSection />

      {/* About Us Section */}
      <AboutUsSection />
    </div>
  );
}
