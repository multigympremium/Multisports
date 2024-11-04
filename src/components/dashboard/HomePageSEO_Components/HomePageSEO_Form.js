"use client";
import { useForm } from "react-hook-form";

export default function SeoForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Send data to API for processing
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Meta SEO Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Search Engine Optimization for HomePage
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meta Title
            </label>
            <input
              type="text"
              {...register("metaTitle")}
              defaultValue="Online Ecommerce Shopping"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meta Keywords
            </label>
            <input
              type="text"
              {...register("metaKeywords")}
              defaultValue="ecommerce, shopping, online"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meta Description
            </label>
            <textarea
              {...register("metaDescription")}
              defaultValue="Shop the latest trends at Fejmo, your go-to destination for online fashion and lifestyle shopping..."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
        </div>

        {/* Meta Open Graph Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Meta Open Graph for HomePage
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meta OG Title
            </label>
            <input
              type="text"
              {...register("metaOgTitle")}
              defaultValue="Online Ecommerce Shopping"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meta OG Description
            </label>
            <textarea
              {...register("metaOgDescription")}
              defaultValue=""
              placeholder="Write Meta OG Description Here"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meta OG Image
            </label>
            <input
              type="file"
              {...register("metaOgImage")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 flex justify-end mt-6">
          <button
            type="button"
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 mr-4"
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
