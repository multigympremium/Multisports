"use client";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import useAxiosPublic from "@/Hook/useAxiosPublic";
export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const pathName = usePathname();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  console.log(pathName, "pathName");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);

    try {
      const res = await axiosPublic.post("/users/send-otp", { email });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("otp_expiry", res?.data?.otp_expiry);
        localStorage.setItem("otp_limit_time", res?.data?.otp_limitation_time);
        router.push("/verify-otp");
        toast.success("OTP sent successfully!", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-[750px] relative mx-auto  ">
      {/* Back Arrow */}
      <Image
        src={"/d.png"}
        width={300}
        height={300}
        alt="dot"
        className="mx-auto"
      />

      <div className="w-full py-5 absolute top-5 left-8">
        <Link href="/">
          <button className="flex items-center justify-center rounded-full shadow-lg w-[50px] h-[50px] bg-white ml-10">
            <MdOutlineKeyboardBackspace size={30} />
          </button>
        </Link>
      </div>

      {/* Sign Up Section */}

      <div className="w-full py-5 flex justify-center items-center gap-3">
        <Link href="/login">
          <button
            className={`flex items-center justify-center px-8 py-2 shadow-lg rounded-md border-2 border-black text-2xl  ml-10 ${
              pathName === "/login"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Log In
          </button>
        </Link>
        <Link href="/send-otp">
          <button
            className={`flex items-center justify-center rounded-md px-8 py-2 shadow-lg border-2 border-black   ml-10 text-2xl ${
              pathName === "/send-otp"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Register
          </button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white shadow-lg p-3 w-[94%] mx-auto rounded-lg"
      >
        {/* Email Input */}
        <div className="mb-4 border-b border-gray-200 pb-5">
          <label htmlFor="email" className="block text-gray-700 py-3 text-xl">
            Email/Phone No
          </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            className="mt-1 block w-full p-2 border border-black bg-white rounded-lg text-xl py-3 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div
          type="submit"
          className="mt-4 text-center text-sm text-gray-500  w-full flex flex-col gap-4 py-4 pb-10"
        >
          <button
            type="submit"
            className="block bg-black text-white text-center text-2xl py-3 rounded-lg font-semibold mb-4 hover:scale-[0.95] transition-all duration-300 w-[94%] mx-auto"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
