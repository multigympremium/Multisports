import { NavLink, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ROUTES = {
  ACCOUNT: "/account/dashboard",
  ORDERS: "/account/orders",
  ACCOUNT_DETAILS: "/account/details",
  CHANGE_PASSWORD: "/account/change-password",
};

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT,
    name: "text-dashboard",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: "text-orders",
    icon: <IoCartOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_DETAILS,
    name: "text-account-details",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: "text-change-password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
];

export default function AccountNav() {
  const { t } = useTranslation();
  const location = useLocation();

  // Extract the main path (2nd segment of URL)
  const mainPath = `/${location.pathname.split("/")[2] || ""}`;

  const handleLogout = () => {
    console.log("User logged out");
    // Place your logout logic here
  };

  return (
    <nav className="flex flex-col pb-2 md:w-2/6 2xl:w-4/12 ltr:md:pr-8 rtl:md:pl-8 ltr:lg:pr-12 rtl:lg:pl-12 ltr:xl:pr-16 rtl:xl:pl-16 ltr:2xl:pr-20 rtl:2xl:pl-20 md:pb-0">
      {accountMenu.map((item) => {
        const menuPath = `/${item.slug.split("/")[2]}`;

        return (
          <NavLink
            key={item.slug}
            to={item.slug}
            className={({ isActive }) =>
              isActive || mainPath === menuPath
                ? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2"
                : "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
            }
          >
            {item.icon}
            <span className="ltr:pl-2 rtl:pr-2">{t(`${item.name}`)}</span>
          </NavLink>
        );
      })}

      <button
        className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
        onClick={handleLogout}
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span className="ltr:pl-2 rtl:pr-2">{t("text-logout")}</span>
      </button>
    </nav>
  );
}
