import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PasswordInput from "../../UI/PasswordInput";
import Button from "../../UI/Button";
import { fadeInTop } from "../../utils/motion/fade-in-top";

const defaultValues = {
  oldPassword: "",
  newPassword: "",
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [isPending, setIsPending] = useState(false);

  function onSubmit(input) {
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Password Changed:", input);
      setIsPending(false);
    }, 2000);
  }

  return (
    <>
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
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center"
        >
          <div className="flex flex-col space-y-3">
            <PasswordInput
              labelKey="Old Password"
              errorKey={errors.oldPassword?.message}
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              className="mb-4"
            />
            <PasswordInput
              labelKey="New Password"
              errorKey={errors.newPassword?.message}
              {...register("newPassword", {
                required: "New password is required",
              })}
              className="mb-4"
            />

            <div className="relative">
              <Button
                type="submit"
                loading={isPending}
                disabled={isPending}
                className="h-13 mt-3"
              >
                Change Password
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default ChangePassword;
