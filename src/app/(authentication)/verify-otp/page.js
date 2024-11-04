"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import useAxiosPublic from "@/Hook/useAxiosPublic";
import { useTimer } from "react-timer-hook";
import toast from "react-hot-toast";
import Image from "next/image";
export default function Page() {
  const [otp, setOtp] = useState("");
  const axiosPublic = useAxiosPublic();
  const [isActiveOtpInput, setIsActiveOtpInput] = useState(false);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [otp_expiryDate, setOtp_expiryDate] = useState("");
  const [otp_limitation_time, setOtp_limitation_time] = useState("");

  const [otp_expiry, setOtp_expiry] = useState("");

  const expiryTimestamp =
    new Date() < new Date(otp_expiry)
      ? new Date(otp_expiry).getTime()
      : new Date().getTime();

  console.log(expiryTimestamp, otp_expiry, "otp_expiry");
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsActiveOtpInput(true);
      setOtp("");
    },
  });

  const ResendOtp = async (e) => {
    console.log("Email:", userEmail);

    try {
      const res = await axiosPublic.post("/users/send-otp", {
        email: userEmail,
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("otp_expiry", res?.data?.otp_expiry);
        localStorage.setItem("otp_limit_time", res?.data?.otp_limitation_time);

        setOtp_limit_time(res?.data?.otp_limitation_time);
        setOtp_expiry(res?.data?.otp_expiry);

        setOtp("");
        setIsActiveOtpInput(false);
        restart(new Date(res?.data?.otp_expiry).getTime());

        toast.success("OTP sent successfully!", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    // utils/validatePassword.js

    const validatePassword = async () => {
      const res = await axiosPublic.post("/users/verify-otp", {
        otp,
        email: userEmail,
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        router.push("/signup");
      }
    };

    if (otp.length === 6) {
      validatePassword();
    }

    const userEmailData = localStorage.getItem("userEmail");
    const otp_expiryDateData = localStorage.getItem("otp_expiry") || "";
    const otp_limitation_timeData =
      localStorage.getItem("otp_limit_time") || "";

    setUserEmail(userEmailData);
    setOtp_expiryDate(otp_expiryDateData);
    setOtp_expiry(otp_expiryDateData);
    setOtp_limitation_time(otp_limitation_timeData);
  }, [axiosPublic, router, otp, userEmail]);

  return (
    <div className="min-h-screen flex flex-col items-center w-[750px] relative mx-auto bg-gray-50 ">
      {/* Back Arrow */}
      <div className="  w-full">
        <Image
          src={"/d.png"}
          width={300}
          height={300}
          alt="dot"
          className="mx-auto"
        />

        <div className="w-full py-5">
          <Link href="/signup">
            <button className="flex items-center justify-center rounded-full shadow-lg w-[50px] h-[50px] bg-white ml-10">
              <MdOutlineKeyboardBackspace size={30} />
            </button>
          </Link>
        </div>

        {/* Sign Up Section */}
        <h1 className="text-4xl font-semibold text-center">Verify OTP</h1>
        <p className="text-center text-gray-500 mt-2 text-xl mb-5">
          Enter your OTP to continue.
        </p>
        <div className="backdrop-blur min-w-[600px] p-10 rounded-lg bg-white w-[95%] mx-auto shadow-lg">
          <h2 className="text-2xl text-center font-bold mb-4">
            Enter Verification Code
          </h2>
          <form className="flex flex-col items-center gap-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="px-4"></span>}
              inputStyle={{
                width: "55px",
                height: "60px",
                borderRadius: "6px",
                color: "black",
                fontWeight: "bold",
                // border: "2px solid black",
                boxShadow: "0 0 10px 0px rgba(0,0,0,0.4)",
              }}
              renderInput={(props) => (
                <input
                  type="text"
                  placeholder="Enter your code"
                  className="w-full h-32 rounded-lg p-4 text-black font-bold border-2 border-black"
                  disabled={isActiveOtpInput}
                  {...props}
                />
              )}
            />
            <div className="grid grid-cols-3 gap-2 mt-4 justify-between w-full  items-center">
              <p className="col-span-2">
                OTP Expires in
                <span
                  className={`countdown font-mono text-2xl px-2 ${
                    minutes > 3 ? "text-blue-500" : "text-red-500"
                  } font-bold`}
                >
                  {/* <span style={{ "--value": 10 }}></span>h */}
                  <span style={{ "--value": minutes }}></span>:
                  <span style={{ "--value": `${seconds}` }}></span>
                </span>
                min
              </p>

              <button
                className=" text-blue-500 rounded-lg px-4 py-2 font-bold hover:underline"
                onClick={ResendOtp}
                type="button"
              >
                {" "}
                Resend OTP{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
