"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAllowSetPassword, setIsAllowSetPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const router = useNavigate();

  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);

    try {
      if (!isAllowSetPassword) {
        const res = await axiosPublic.get(`/users/is_user_exist/${email}`);
        console.log(res?.data?.user, "res jkjkjkkkllk");
        if (res?.data?.isExist) {
          setIsAllowSetPassword(true);
        }
      } else {
        if (password !== confirmPassword) {
          setConfirmPasswordError("password did not match");
          return;
        }
        const res = await axiosPublic.post(`/users/forgot-password`, {
          password,
          email,
        });
        console.log(res, "res jkjkjkkkllk");
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Password updated successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });

          router("/login");
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    // utils/validatePassword.js

    const validatePassword = () => {
      const lengthCriteria = password.length >= 8;
      const uppercaseCriteria = /[A-Z]/.test(password);
      const lowercaseCriteria = /[a-z]/.test(password);
      const numberCriteria = /[0-9]/.test(password);
      const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const isValid =
        lengthCriteria &&
        uppercaseCriteria &&
        lowercaseCriteria &&
        numberCriteria &&
        specialCharacterCriteria;

      if (!lengthCriteria)
        setPasswordError("Password must be at least 8 characters long");
      if (!specialCharacterCriteria)
        setPasswordError(
          "Password must contain at least one special character"
        );
      if (!numberCriteria)
        setPasswordError("Password must contain at least one number");
      if (!lowercaseCriteria)
        setPasswordError("Password must contain at least one lowercase letter");
      if (!uppercaseCriteria)
        setPasswordError("Password must contain at least one uppercase letter");

      if (isValid) setPasswordError("");
    };

    validatePassword();
  }, [password]);

  return (
    <div className="min-h-screen flex flex-col items-center w-[750px] relative mx-auto bg-gray-50 ">
      {/* Back Arrow */}
      <img
        src={"/logo.png"}
        width={300}
        height={300}
        alt="dot"
        className="mx-auto"
      />

      <div className="w-full py-5 absolute top-5 left-8">
        <Link to="/login">
          <button className="flex items-center justify-center rounded-full shadow-lg w-[50px] h-[50px] bg-white ml-10">
            <MdOutlineKeyboardBackspace size={30} />
          </button>
        </Link>
      </div>

      {/* Sign Up Section */}
      <h1 className="text-4xl font-semibold text-center">Forgot Password</h1>
      <p className="text-center text-gray-500 mt-2 text-xl mb-5">
        Enter your Email to reset your password.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white shadow-lg p-3 w-[94%] mx-auto rounded-lg"
      >
        {!isAllowSetPassword && (
          <div className="mb-4 border-b border-gray-200 pb-5">
            <label htmlFor="email" className="block text-gray-700 py-3 text-xl">
              Email
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
        )}
        {isAllowSetPassword && (
          <>
            {/* Password Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 py-3 text-xl"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="password"
                className="mt-1 block w-full p-2 border border-black rounded-lg text-xl py-3 px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError.length > 0 && (
                <p className="text-red-500 text-md mt-4">{passwordError}</p>
              )}
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-[68px] text-3xl"
              >
                {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {/* Password Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 py-3 text-xl"
              >
                Confirm Password
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="password"
                className="mt-1 block w-full p-2 border border-black rounded-lg text-xl py-3 px-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError.length > 0 && (
                <p className="text-red-500 text-md mt-4">
                  {confirmPasswordError}
                </p>
              )}
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-2 top-[68px] text-3xl"
              >
                {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </>
        )}
        <div className="mt-4 text-center text-sm text-gray-500  w-full flex flex-col gap-4 py-4 ">
          <button
            type="submit"
            className="block bg-black text-white text-center text-2xl py-3 rounded-lg font-semibold mb-4 hover:scale-[0.95] transition-all duration-300 w-[94%] mx-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
