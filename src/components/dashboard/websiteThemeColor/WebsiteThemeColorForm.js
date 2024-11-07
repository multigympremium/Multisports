"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function WebsiteThemeColorForm() {
  const { register, handleSubmit, getValues, setValue, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission, e.g., send data to an API
  };

  // Set default colors on mount
  useEffect(() => {
    setValue("primaryColor", "#20124d");
    setValue("secondaryColor", "#5c1036");
    setValue("tertiaryColor", "#20124d");
    setValue("titleColor", "#38761d");
    setValue("paragraphColor", "#741b47");
    setValue("borderColor", "#e06666");
  }, [setValue]);

  console.log(watch("primaryColor"), watch("secondaryColor"), watch("tertiaryColor"), watch("titleColor"), watch("paragraphColor"), watch("borderColor"));

  function getContrastingColor(color) {
    let r, g, b;
  
    if (color.startsWith('#')) {
      // Hex format
      color = color.slice(1);
      r = parseInt(color.slice(0, 2), 16);
      g = parseInt(color.slice(2, 4), 16);
      b = parseInt(color.slice(4, 6), 16);
    } else if (color.startsWith('rgb')) {
      // RGB format
      [r, g, b] = color.match(/\d+/g).map(Number);
    } else {
      throw new Error('Unsupported color format');
    }
  
    // Calculate brightness
    const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b);
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

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
                <label
                  className="h-10 w-full rounded flex justify-center items-center text-gray-600"
                  style={{ background: getValues(color), color: getContrastingColor(getValues(color)) }}
                  htmlFor={color}
                >{ getValues(color)}</label>
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
