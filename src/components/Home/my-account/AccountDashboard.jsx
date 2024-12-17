import React from "react";
import { ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";

export default function AccountDashboard() {
  return (
    <div className="px-5">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
        Dashboard
      </h2>
      <p className=" text-sm leading-7 md:text-base md:leading-loose lowercase">
        From your account dashboard you can view your
        <Link
          to={ROUTES.ORDERS}
          className="text-heading underline font-semibold"
        >
          recent orders
        </Link>
        , manage your
        <Link
          to={ROUTES.ACCOUNT_DETAILS}
          className="text-heading underline font-semibold"
        >
          Account Details
        </Link>
        and
        <Link
          to={ROUTES.CHANGE_PASSWORD}
          className="text-heading underline font-semibold"
        >
          change your password
        </Link>
        .
      </p>
    </div>
  );
}
