"use client";


import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function WebsiteThemeColorForm() {
  const { register, handleSubmit, getValues, setValue, watch } = useForm();
  const [targetId, setTargetId] = useState("");
  const [isExistData, setIsExistData] = useState(false);
  const axiosSecure = useAxiosSecure();

  

  console.log(watch("primaryColor"), watch("secondaryColor"), watch("tertiaryColor"), watch("titleColor"), watch("paragraphColor"), watch("borderColor"));

  function getContrastingColor(color) {
    let r, g, b;

    if(color){
      if (color.startsWith('#')) {
        // Hex format

        if (color.length < 4) {
          // #rgb format
          color = color.slice(1);
          r = parseInt(color.slice(0, 1), 16);
          g = parseInt(color.slice(1, 2), 16);
          b = parseInt(color.slice(2, 3), 16);

          return "#000" 
        } else {
          // #rrggbb format
          color = color.slice(1);
          r = parseInt(color.slice(0, 2), 16);
          g = parseInt(color.slice(2, 4), 16);
          b = parseInt(color.slice(4, 6), 16);
        }
      } else if (color.startsWith('rgb')) {
        // RGB format
        [r, g, b] = color.match(/\d+/g).map(Number);
      } else {
        return "#000000"
      }
    
      // Calculate brightness
      const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b);
      return brightness > 128 ? '#000000' : '#FFFFFF';

    }else {
      return "#000000"
    }
  
  }


  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
  
      if(targetId){
          const res = await axiosSecure.put(
            `/website-theme-color/${targetId}`,
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
              `/website-theme-color`,
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
        const firstResData = await axiosSecure.get(`/website-theme-color`);
        const res = await axiosSecure.get(`/website-theme-color/${firstResData?.data?.data[0]?._id}`);

        if(res.status === 200 || res.status === 201) {
            
            const data = res?.data?.data;

            console.log(data, "data");
    
            // Set form values with the testimonial data
            for(let key in data){
              console.log(key, data[key], "data[key]");
                setValue(key, data[key]);
            }
            setTargetId(data?._id)
            
        }else {
          handleDefaultColor()
        }
      } catch (error) {
        handleDefaultColor()
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchTestimonial();


  }, [axiosSecure, setValue ]);

  const handleDefaultColor = useCallback(() => {
    setValue("primaryColor", "#20124d");
    setValue("secondaryColor", "#5c1036");
    setValue("tertiaryColor", "#20124d");
    setValue("titleColor", "#38761d");
    setValue("paragraphColor", "#741b47");
    setValue("borderColor", "#e06666");
  }, [setValue]);

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">Update Website Theme Color</h2>
        <div className="grid grid-cols-2 gap-4">

          {/* Color inputs */}
          {["primaryColor", "secondaryColor", "tertiaryColor", "titleColor", "paragraphColor", "borderColor"].map((color) => (
            <div key={color}>
              <label className="block text-sm font-medium text-gray-700">
                {color.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </label>
                <input
                  type={"text"}
                  className="h-10 w-full px-2 rounded flex justify-center items-center text-gray-600"
                  style={{ background: getValues(color), color: getContrastingColor(getValues(color)) }}
                  // htmlFor={color}
                  {...register(color, { onChange: (e) => setValue(color, e.target.value) })}
                 />
              <input
                type="color"
                {...register(color, { onChange: (e) => setValue(color, e.target.value) })}
                id={color}
                hidden={true}
                className=" block w-0 h-0 opacity-0 overflow-hidden border border-gray-300 rounded-md"
              />
              
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex mt-6">
          {/* <button
            type="button"
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="bg-blue-500 text-white w-full font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Color
          </button>
        </div>
      </form>
    </div>
  );
}
