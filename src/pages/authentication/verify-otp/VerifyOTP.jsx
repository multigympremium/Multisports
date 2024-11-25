"use client";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import OTPInput from "react-otp-input";
import { useTimer } from "react-timer-hook";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const axiosPublic = useAxiosPublic();
  const [isActiveOtpInput, setIsActiveOtpInput] = useState(false);
  const router = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  
  const [otp_expiry, setOtp_expiry] = useState(new Date().getTime());
  const [otp_expiryDate, setOtp_expiryDate] = useState(new Date());
  // let expiryTimestamp = null;

  // if (!isNaN(new Date(otp_expiry).getTime())) {
  //   expiryTimestamp =
  //     new Date().getTime() < new Date(otp_expiry).getTime()
  //       ? new Date(otp_expiry).getTime()
  //       : new Date().getTime();
  //   console.log(
  //     expiryTimestamp,
  //     "expiryTimestamp",
  //     new Date(otp_expiry).getTime(),
  //     new Date() > new Date(otp_expiry),
  //     isNaN(new Date(otp_expiry).getTime())
  //   );
  // }

  const {
    // totalSeconds,
    seconds,
    minutes,
    // hours,
    // days,
    // isRunning,
    // start,
    // pause,
    // resume,
    restart,
  } = useTimer({
    expiryTimestamp: otp_expiry,
    // otp_expiry,
    onExpire: () => {
      console.warn("onExpire called");

      if (new Date().getTime() < new Date(otp_expiryDate).getTime()) {
        setOtp_expiry(new Date(otp_expiryDate).getTime());
        restart(new Date(otp_expiryDate).getTime());
        console.log("restart");
      } else {
        setOtp_expiry(new Date().getTime());
        console.log("end");
      }
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
        sessionStorage.setItem("otp_expiry", res?.data?.otp_expiry);
        sessionStorage.setItem("otp_limit_time", res?.data?.otp_limitation_time);

        // setOtp_limit_time(res?.data?.otp_limitation_time);
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
      try {
      const res = await axiosPublic.post("/users/verify-otp", {
        otp,
        email: userEmail,
      });
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        return router("/signup");
      }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    };

    if (otp.length === 6) {
      validatePassword();
    }

    const userEmailData = localStorage.getItem("userEmail");
    setUserEmail(userEmailData);
    const otp_expiryDateData = sessionStorage.getItem("otp_expiry") || "";
    // const otp_limitation_timeData =
    //   sessionStorage.getItem("otp_limit_time") || "";

    setOtp_expiryDate(new Date(otp_expiryDateData));

    if (new Date().getTime() < new Date(otp_expiryDateData).getTime()) {
      setOtp_expiry(new Date(otp_expiryDateData).getTime());
      restart(new Date(otp_expiryDateData).getTime());
    } else {
      setOtp_expiry(new Date().getTime());
    }
  }, [axiosPublic, router, otp, userEmail]);

  return (
    <div className="min-h-screen flex flex-col items-center w-[750px] relative mx-auto bg-gray-50 ">
      {/* Back Arrow */}
      <div className="  w-full">
        <img
          src={"/logo.png"}
          width={300}
          height={300}
          alt="dot"
          className="mx-auto mt-10"
        />

        <div className="w-full py-5">
          <Link to="/signup">
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
