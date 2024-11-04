"use client";
import { useForm } from "react-hook-form";

export default function WebsiteThemeColorForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // Handle the form submission, e.g., send data to your API
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">Update Website Theme Color</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Primary Color:
            </label>
            <input
              type="text"
              {...register("primaryColor")}
              defaultValue="#20124d"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Secondary Color:
            </label>
            <input
              type="text"
              {...register("secondaryColor")}
              defaultValue="#5c1036"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Tertiary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tertiary Color:
            </label>
            <input
              type="text"
              {...register("tertiaryColor")}
              defaultValue="#20124d"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Title Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title Color:
            </label>
            <input
              type="text"
              {...register("titleColor")}
              defaultValue="#38761d"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Paragraph Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Paragraph Color:
            </label>
            <input
              type="text"
              {...register("paragraphColor")}
              defaultValue="#741b47"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Border Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Border Color:
            </label>
            <input
              type="text"
              {...register("borderColor")}
              defaultValue="#e06666"
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
            Update Color
          </button>
        </div>
      </form>
    </div>
  );
}
