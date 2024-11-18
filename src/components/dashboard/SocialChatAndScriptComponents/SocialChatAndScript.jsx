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
    <div className=" p-6 pt-0">
      <div className="w-full">
        <h2 className="text-3xl font-semibold mb-9">
          Social Login & Chat Scripts
        </h2>
        <div className="flex">
          {/* Left-side Tabs */}
          <div className="w-1/4 pr-5 border-r border-gray-300">

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
                  className={`cursor-pointer p-3 rounded-2xl text-gray-700 transition-colors duration-200 ${selectedTab === tab
                      ? "bg-green-500 text-white font-semibold"
                      : "hover:bg-green-100"
                    }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </li>



              ))}
            </ul>
          </div>

          {/* Right-side Form */}
          <div className="w-3/4 pl-8 pt-0">
            <form onSubmit={handleSubmit}>
              <h3 className="text-2xl text-gray-700 mb-6">{selectedTab}</h3>

              {selectedTab === "Google Analytic" && (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-700  ">
                      Allow Google Analytic
                    </label>
                    <select
                      className="customInput select"
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <option>Disable Google Analytic</option>
                      <option>Enable Google Analytic</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700  ">
                      Analytic Tracking ID
                    </label>
                    <input
                      type="text"
                      value={analyticID}
                      onChange={(e) => setAnalyticID(e.target.value)}
                      className="customInput"
                      placeholder="UA-XXXXXXXXX-X"
                    />
                  </div>
                </>
              )}

              {/* Update Button */}
              <button
                type="submit"
                className="customSaveButton"
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
