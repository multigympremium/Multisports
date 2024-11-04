"use client";
import { useState } from "react";

export default function SocialChatAndScript() {
  const [selectedTab, setSelectedTab] = useState("Google Analytic");
  const [analyticID, setAnalyticID] = useState("");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedTab,
      analyticID,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="w-full mx-auto bg-white shadow-md rounded-lg">
        <div className="flex">
          {/* Left-side Tabs */}
          <div className="w-1/4 p-5 border-r">
            <h2 className="text-lg font-bold mb-4">
              Social Login & Chat Scripts
            </h2>
            <ul>
              {[
                "Google Analytic",
                "Google Tag Manager",
                "Facebook Pixel",
                "Google Recaptcha",
                "Social Login",
                "Messenger Chat Plugin",
                "Tawk.to Live Chat",
                "Crisp Live Chat",
              ].map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer p-3 mb-2 rounded-md text-gray-700 ${
                    selectedTab === tab
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          {/* Right-side Form */}
          <div className="w-3/4 p-5">
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-bold mb-4">{selectedTab}</h3>

              {selectedTab === "Google Analytic" && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Allow Google Analytic
                    </label>
                    <select
                      className="w-full p-2 border rounded-md"
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <option>Disable Google Analytic</option>
                      <option>Enable Google Analytic</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Analytic Tracking ID
                    </label>
                    <input
                      type="text"
                      value={analyticID}
                      onChange={(e) => setAnalyticID(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder="UA-XXXXXXXXX-X"
                    />
                  </div>
                </>
              )}

              {/* Update Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
