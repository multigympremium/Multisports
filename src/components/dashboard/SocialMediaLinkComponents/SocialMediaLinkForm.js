"use client";
import { useForm } from "react-hook-form";

export default function SocialMediaLinksForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // You can send this data to your API here
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md"
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
              defaultValue="https://www.facebook.com"
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
              defaultValue="https://www.twitter.com"
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
              defaultValue="https://www.instagram.com"
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
              defaultValue="https://www.linkedin.com"
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
              defaultValue="https://web.facebook.com"
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
              defaultValue="https://web.whatsapp.com"
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
              defaultValue="https://telegram.com"
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
              defaultValue="https://www.youtube.com"
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
              defaultValue="https://www.tiktok.com/@example"
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
              defaultValue="https://www.pinterest.com"
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
              defaultValue="https://www.viber.com"
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
