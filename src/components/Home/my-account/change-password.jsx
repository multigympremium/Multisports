import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInTop } from "../../utils/motion/fade-in-top";

const ChangePassword = () => {
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.oldPassword)
      newErrors.oldPassword = "Old password is required";
    if (!formValues.newPassword)
      newErrors.newPassword = "New password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear field error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      console.log("Password Changed:", formValues);
      setIsPending(false);
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col px-5">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        Change Password
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        variants={fadeInTop(0.35)}
        className="w-full flex h-full lg:w-8/12 flex-col"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto flex flex-col justify-center space-y-4"
        >
          {/* Old Password Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Old Password</span>
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formValues.oldPassword}
              onChange={handleChange}
              placeholder="Enter old password"
              className={`input input-bordered w-full ${
                errors.oldPassword ? "input-error" : ""
              }`}
            />
            {errors.oldPassword && (
              <span className="text-sm text-red-500 mt-1">
                {errors.oldPassword}
              </span>
            )}
          </div>

          {/* New Password Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">New Password</span>
            </label>
            <input
              type="password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className={`input input-bordered w-full ${
                errors.newPassword ? "input-error" : ""
              }`}
            />
            {errors.newPassword && (
              <span className="text-sm text-red-500 mt-1">
                {errors.newPassword}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={isPending}
              className={`btn  w-full ${isPending ? "loading" : ""}`}
            >
              {isPending ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
