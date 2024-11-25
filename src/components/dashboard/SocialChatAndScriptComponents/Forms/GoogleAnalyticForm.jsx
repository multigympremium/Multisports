"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { set } from "react-hook-form";

export default function GoogleAnalyticForm() {
  const [isEnableAnalytic, setIsEnableAnalytic] = useState(false);
  const [trackingID, setTrackingID] = useState("");

  useEffect(() => {
    

   const googleAnalytic = localStorage.getItem("googleAnalytic");
    const googleAnalyticData = JSON.parse(googleAnalytic);
    console.log(googleAnalyticData, "googleAnalyticData");

    setTrackingID(googleAnalyticData?.trackingID);
    setIsEnableAnalytic(googleAnalyticData?.isEnableAnalytic);

  }, []);  Login


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem("googleAnalytic", JSON.stringify({
      isEnableAnalytic,
      trackingID,
    }));

    
  };

  

  return (
    <form onSubmit={handleSubmit}>
              <h3 className="text-2xl text-gray-700 mb-6">Google Analytic</h3>
                  <div className="mb-6">
                    <label className="block text-gray-700  ">
                      Allow Google Analytic
                    </label>
                    <select
                      className="customInput select"
                      value={isEnableAnalytic}
                      onChange={(e) => setIsEnableAnalytic(e.target.value === "true" ? true : false)}
                    >
                      <option value={false}>Disable Google Analytic</option>
                      <option value={true}>Enable Google Analytic</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700  ">
                      Analytic Tracking ID
                    </label>
                    <input
                      type="text"
                      value={trackingID}
                      onChange={(e) => setTrackingID(e.target.value)}
                      className="customInput"
                      placeholder="G-XXXXXXXXX-X"
                    />
                  </div>


            <button
              type="submit"
              className="customSaveButton w-full"
              >
              Update
            </button>
            </form>
  );
}
