"use client";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CustomCSSJSForm() {
  const [customCSS, setCustomCSS] = useState("");
  const [headerScript, setHeaderScript] = useState("");
  const [footerScript, setFooterScript] = useState("");
  const [targetId, setTargetId] = useState("");
  const axiosSecure = useAxiosSecure()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      css: customCSS,
      headerJs: headerScript,
      footerJs: footerScript,
    };
    console.log(data, "data");
    try {
  
      if(targetId){
          const res = await axiosSecure.put(
            `/custom-css-js/${targetId}`,
            data
          );
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "About Us updated successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
          
      }else {
         const res = await axiosSecure.post(
              `/custom-css-js`,
              data
          );
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "About Us Created successfully",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }

      }

   

  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: err.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const firstResData = await axiosSecure.get(`/custom-css-js`);
        const res = await axiosSecure.get(`/custom-css-js/${firstResData?.data?.data[0]?._id}`);

        console.log(firstResData, res, "res ljlj")

        if(res.status === 200 || res.status === 201) {
            
            const data = res?.data?.data;

            console.log(data, "data");
    
            // Set form values with the testimonial data

            setCustomCSS(data.css)
            setHeaderScript(data.headerJs)
            setFooterScript(data.footerJs)

            console.log(data?._id, "targetId useEffect")
            
            setTargetId(data?._id)
            
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();


  }, [axiosSecure ]);

  console.log(targetId, "targetId")

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
