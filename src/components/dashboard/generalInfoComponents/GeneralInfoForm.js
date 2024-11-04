"use client";
// src/app/dashboard/(dashboard)/social-media-links/page.js

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for form validation
const schema = z.object({
  companyName: z.string().nonempty("Company Name is required"),
  phoneNo: z.string().nonempty("Phone Number is required"),
  companyEmail: z.string().email("Invalid email").nonempty("Email is required"),
  shortDescription: z.string().nonempty("Short Description is required"),
  companyAddress: z.string().nonempty("Company Address is required"),
  googleMapLink: z.string().url("Invalid Google Map Link").optional(),
  playStoreLink: z.string().url("Invalid Play Store Link").optional(),
  appStoreLink: z.string().url("Invalid App Store Link").optional(),
  tradeLicenseNo: z.string().nonempty("Trade License No is required"),
  tinNo: z.string().nonempty("TIN No is required"),
  binNo: z.string().nonempty("BIN No is required"),
  footerText: z.string().nonempty("Footer Text is required"),
});

const GeneralInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section 1: General Information */}
      <h2 className="text-2xl font-bold mb-4">General Information Form</h2>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          {...register("companyName")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.companyName && (
          <span className="text-red-600 text-sm">
            {errors.companyName.message}
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          {...register("phoneNo")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.phoneNo && (
          <span className="text-red-600 text-sm">{errors.phoneNo.message}</span>
        )}
      </div>

      {/* Company Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Email
        </label>
        <input
          type="email"
          {...register("companyEmail")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.companyEmail && (
          <span className="text-red-600 text-sm">
            {errors.companyEmail.message}
          </span>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Short Description
        </label>
        <textarea
          {...register("shortDescription")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.shortDescription && (
          <span className="text-red-600 text-sm">
            {errors.shortDescription.message}
          </span>
        )}
      </div>

      {/* Company Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company Address
        </label>
        <input
          type="text"
          {...register("companyAddress")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.companyAddress && (
          <span className="text-red-600 text-sm">
            {errors.companyAddress.message}
          </span>
        )}
      </div>

      {/* Google Map Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Google Map Link
        </label>
        <input
          type="text"
          {...register("googleMapLink")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.googleMapLink && (
          <span className="text-red-600 text-sm">
            {errors.googleMapLink.message}
          </span>
        )}
      </div>

      {/* Play Store Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Play Store Link
        </label>
        <input
          type="text"
          {...register("playStoreLink")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.playStoreLink && (
          <span className="text-red-600 text-sm">
            {errors.playStoreLink.message}
          </span>
        )}
      </div>

      {/* Section 2: Social Media Links */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Social Media Links</h2>

      {/* App Store Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          App Store Link
        </label>
        <input
          type="text"
          {...register("appStoreLink")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.appStoreLink && (
          <span className="text-red-600 text-sm">
            {errors.appStoreLink.message}
          </span>
        )}
      </div>

      {/* Trade License No */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Trade License No
        </label>
        <input
          type="text"
          {...register("tradeLicenseNo")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.tradeLicenseNo && (
          <span className="text-red-600 text-sm">
            {errors.tradeLicenseNo.message}
          </span>
        )}
      </div>

      {/* TIN No */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          TIN No
        </label>
        <input
          type="text"
          {...register("tinNo")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.tinNo && (
          <span className="text-red-600 text-sm">{errors.tinNo.message}</span>
        )}
      </div>

      {/* BIN No */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          BIN No
        </label>
        <input
          type="text"
          {...register("binNo")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.binNo && (
          <span className="text-red-600 text-sm">{errors.binNo.message}</span>
        )}
      </div>

      {/* Footer Copyright Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Footer Copyright Text
        </label>
        <input
          type="text"
          {...register("footerText")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.footerText && (
          <span className="text-red-600 text-sm">
            {errors.footerText.message}
          </span>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Info
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GeneralInfoForm;
