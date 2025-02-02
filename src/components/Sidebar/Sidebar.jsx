// Sidebar.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { CiLogout } from "react-icons/ci";
import "./Sidebar.css";
import MenuLink from "./MenuLink/MenuLink";
import toast from "react-hot-toast";

import MenuItems from "./MenuItems";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Sidebar = ({ isCollapsed }) => {
  const { logOut, setUser } = useContext(AuthContext);
  const location = useLocation();

  const navigate = useNavigate();
  const [permissionData, setPermissionData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const UserRole = "admin"; // add later
  const user = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser == "undefined" || storedUser == null
      ? null
      : JSON.parse(storedUser);
  };

  // const UserRole = user()?.role; // add later
  // const UserRole = "Coffee Shop Staff"; // add later
  // const UserRole = "Operation Manager"; // add later

  const handleLogOut = () => {
    const isSuccess = logOut();
    if (isSuccess) {
      toast.success("User logged out successfully");

      setUser(null);
      navigate("/", { replace: true });
    }
  };

  const isActiveLink = (pathName, currentPath) => {
    const splitPath = currentPath.split("/")[2];
    if (pathName === splitPath) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={`sidebar border-r border-gray-400 border-dashed h-dvh overflow-auto p-4 poppins text-[#737373] ${
        isCollapsed ? "w-[80px] hidden md:block" : "w-[280px] md:w-[270px]"
      } bg-white shadow-lg transition-all duration-300`}
    >
      <div className="flex flex-col items-start mb-6">
        {!isCollapsed && (
          <img src="/logo.png" alt="Logo" className="w-[80%]  mb-4" />
        )}
      </div>

      {/* Menu */}
      <nav className="text-base font-normal">
        <ul>
          {MenuItems(UserRole)?.length > 1
            ? MenuItems(UserRole).map((cat) => (
                <li key={cat.title} className="mb-2">
                  <div className="collapse focus:border bg-gray-50 p-1 pt-3 hover:shadow rounded-xl">
                    <input
                      type="checkbox"
                      id={`collapse-${cat.title}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`collapse-${cat.title}`}
                      className="font-medium flex items-center gap-2 cursor-pointer pl-4"
                    >
                      {!isCollapsed && cat.icon}
                      {!isCollapsed && cat.title}
                    </label>
                    <div className="collapse-content px-1 pt-2">
                      {cat.list &&
                        cat.list.map((item) => (
                          <MenuLink
                            item={item}
                            key={item.title}
                            location={location}
                            isCollapsed={isCollapsed}
                          />
                        ))}
                    </div>
                  </div>
                </li>
              ))
            : MenuItems(UserRole).map((cat) => (
                <li key={cat.title} className="mb-2">
                  <div className=" px-1 pt-2">
                    {cat.list &&
                      cat.list.map((item) => (
                        <Link
                          key={item.title}
                          to={"/dashboard/" + item.path}
                          className={`flex items-center text-[24px] gap-2 p-2 rounded-lg transition-colors mb-3 ${
                            isActiveLink(item.path, location.pathname)
                              ? "bg-red-300 text-white shadow"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {/* <span className="text-2xl">{item.icon}</span> */}
                          {item.icon}
                          {!isCollapsed && <span>{item.title}</span>}
                        </Link>
                      ))}
                  </div>
                </li>
              ))}
        </ul>
      </nav>

      {/* Logout part */}
      <div className="mt-auto">
        <button
          onClick={handleLogOut}
          className="w-full p-3 flex font-semibold items-center justify-center gap-2 rounded-lg bg-[#E68923] text-white hover:bg-[#c7751e] transition-colors"
        >
          <CiLogout size={24} />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
