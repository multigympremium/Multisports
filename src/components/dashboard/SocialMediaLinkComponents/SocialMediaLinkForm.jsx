"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

export default function SocialMediaLinksForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [targetId, setTargetId] = useState("");
  const axiosSecure = useAxiosSecure();


  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
  
      if(targetId){
          const res = await axiosSecure.put(
            `/social-link/${targetId}`,
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
              `/social-link`,
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
        const firstResData = await axiosSecure.get(`/social-link`);
        const res = await axiosSecure.get(`/social-link/${firstResData?.data?.data[0]?._id}`);

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


  return (
    <div className="flex justify-center mt-10 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[1000px]  bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">Update Social Media Links</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Facebook */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Facebook Page Link:
            </label>
            <input
              type="text"
              {...register("facebook")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twitter Link:
            </label>
            <input
              type="text"
              {...register("twitter")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instagram Link:
            </label>
            <input
              type="text"
              {...register("instagram")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile:
            </label>
            <input
              type="text"
              {...register("linkedin")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Messenger */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Messenger:
            </label>
            <input
              type="text"
              {...register("messenger")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              WhatsApp:
            </label>
            <input
              type="text"
              {...register("whatsapp")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Telegram */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telegram:
            </label>
            <input
              type="text"
              {...register("telegram")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              YouTube Channel Link:
            </label>
            <input
              type="text"
              {...register("youtube")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* TikTok */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TikTok Link:
            </label>
            <input
              type="text"
              {...register("tiktok")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Pinterest */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pinterest Link:
            </label>
            <input
              type="text"
              {...register("pinterest")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Viber */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Viber:
            </label>
            <input
              type="text"
              {...register("viber")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
}
