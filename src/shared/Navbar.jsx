"use client";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCart } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";

import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdMenu, MdOutlineStore } from "react-icons/md";
import Wishlist from "./Cards/Wishlist/Wishlist";
import BgBlurModal from "./Modal/BgBlurModal";
import Cart from "./cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import ProductSearch from "../components/Home/Products/ProductSearch/ProductSearch";
import SidebarContainer from "./SidebarContainer";
import noUser from "../assets/user.png";
const Navbar = () => {
  const { userRole, logOut, totalItems, user } = useContext(AuthContext);
  const placeholders = ["Shorts", "Watch", "Shirt"];
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const router = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowWishlist, setIsShowWishlist] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const SearchBar = ({ setIsShowSearch }) => {
    useEffect(() => {
      if (isFocused) return;

      let typingTimeout;

      if (isTyping) {
        if (charIndex < placeholders[placeholderIndex].length) {
          typingTimeout = setTimeout(() => {
            setPlaceholderText(
              (prev) => prev + placeholders[placeholderIndex][charIndex]
            );
            setCharIndex((prev) => prev + 1);
          }, 300);
        } else {
          setIsTyping(false);
          setTimeout(() => setIsTyping(false), 2000);
        }
      } else {
        if (charIndex > 0) {
          typingTimeout = setTimeout(() => {
            setPlaceholderText((prev) => prev.slice(0, -1));
            setCharIndex((prev) => prev - 1);
          }, 150);
        } else {
          setIsTyping(true);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }
      }

      return () => clearTimeout(typingTimeout);
    }, [charIndex, isTyping, placeholderIndex, placeholders, isFocused]);

    const handleFocus = () => {
      // setIsFocused(true);
      setIsShowSearch(true);
    };

    const handleBlur = (e) => {
      if (e.target.value.length === 0) {
        setIsFocused(false);
      }
    };

    return (
      <div className="bg-gray-100 rounded-full px-3 w-[70%] md:py-2 py-1 md:gap-2 gap-1 flex-row-reverse justify-between flex">
        <input
          type="text"
          className="outline-none w-full bg-gray-100"
          placeholder={!isFocused ? `Search for "${placeholderText}"` : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <IoIosSearch className="text-2xl text-gray-400" />
      </div>
    );
  };

  const handleLogOut = () => {
    const isLogOut = logOut();
    if (isLogOut) {
      toast.success("User logged out successfully!", {
        duration: 3000,
        position: "top-right",
      });

      router("/", { scroll: false });
    }
  };

  useEffect(() => {
    const header = document.getElementById("header");
    const nav_menu = document.getElementById("nav-menu");
    const logo_name = document.getElementById("logo_name");
    const menu_icon = document.getElementById("menu_icon");
    window.addEventListener("scroll", () => {
      const scrolling = window.scrollY;
      if (scrolling > 300) {
        // navbar style
        header.classList.add(
          "fixed",
          "top-0",
          "bg-[#E9F1FA]",
          "dark:text-neutral-800"
        );
        header.classList.remove(
          "relative",
          "bg-transparent",
          "dark:lg:text-white"
        );
        // navbar menu style
        nav_menu.classList.add("dark:text-neutral-800");
        // nav_menu.classList.remove("dark:text-white");
        logo_name.classList.remove("dark:text-white");
        logo_name.classList.add("dark:text-neutral-800");
        menu_icon.classList.remove("dark:text-white");
        menu_icon.classList.add("dark:text-neutral-800");
      } else {
        header.classList.add("relative", "dark:text-white");
        header.classList.remove(
          "fixed",
          "top-0",
          "bg-blue-200",
          "dark:text-neutral-800"
        );
        nav_menu.classList.add("dark:text-white");
        logo_name.classList.add("dark:text-white");
        logo_name.classList.remove("dark:text-neutral-800");
        menu_icon.classList.add("dark:text-white");
        menu_icon.classList.remove("dark:text-neutral-800");
      }
    });
  }, []);
  return (
    <>
      <header
        className="flex flex-wrap lg:justify-start lg:flex-nowrap w-full items-center z-50 top-0 left-0 text-sm  transition-all duration-500 relative bg-white border-b "
        id="header"
      >
        <div className="navbar w-[94%] mx-auto ">
          <div className="navbar-start">
            <div className="flex items-center gap-3">
              <div role="button" className="" id="menu_icon">
                <div className="drawer z-10">
                  <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className=" drawer-button">
                      <MdMenu className="text-2xl cursor-pointer" />
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                      <SidebarContainer />
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <Link to="/" className="flex justify-center items-center ">
                  <img
                    className="w-28 mix-blend-multiply dark:mix-blend-normal"
                    width={400}
                    height={400}
                    src={
                      "https://multisports.shop/images/site_setting/multi-sports_vi6P5.png"
                    }
                    alt="logo"
                  />{" "}
                </Link>
              </div>
            </div>
          </div>

          {/* <label class="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              class=""
              placeholder="I'm in the market for..."
            />
            <button className="hover:bg-gray-300 p-1 rounded">
              <CiSearch size={30} />
            </button>
          </label> */}

          <SearchBar setIsShowSearch={setIsShowSearch}></SearchBar>

          {/* Menu */}
          <div className="navbar-end flex items-center gap-1 md:gap-3">
            {/* My Store */}
            <button className="flex items-center justify-center flex-col gap-1 md:p-3 p-1 rounded">
              <MdOutlineStore className="md:text-2xl text-base text-gray-600 hover:text-blue-500 hover:scale-110 cursor-pointer transition-all" />
              <span className="hidden md:block">My Store</span>
            </button>

            {/* Wishlist */}
            <button
              className="flex items-center justify-center flex-col gap-1 md:p-3 p-1 rounded"
              onClick={() => setIsShowWishlist(true)}
            >
              <FaRegHeart className="md:text-2xl text-base text-gray-600 hover:text-pink-500 hover:scale-110 cursor-pointer transition-all" />
              <span className="hidden md:block">Wishlist</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsShowModal(true)}
              className="flex items-center justify-center flex-col gap-1 md:p-3 p-1 rounded relative"
            >
              <BsCart className="md:text-2xl text-base text-gray-600 hover:text-orange-500 hover:scale-110 cursor-pointer transition-all" />
              <span className="hidden md:block">Cart</span>
              <div className="badge badge-primary badge-lg absolute top-0 -right-2">
                {totalItems}
              </div>
            </button>

            {/* Sign In */}
            {user ? (
              <details className="dropdown">
                <summary className="avatar w-16 m-1">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img src={user.photourl ? user.photourl : noUser} />
                  </div>
                </summary>
                <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow right-0">
                  <li>
                    <a className="bg-gray-200">Profile</a>
                  </li>
                  <li>
                    <button
                      className="btn bg-gray-400 mt-3"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <Link to="/login">
                <div className="flex items-center justify-center flex-col gap-1 md:p-3 p-1 rounded">
                  <FaRegUser className="md:text-2xl text-base text-gray-600 hover:text-blue-500 hover:scale-110 cursor-pointer transition-all" />
                  <span className="hidden md:block">Sign In</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <Cart isShow={isShowModal} setIsShow={setIsShowModal} />
      </BgBlurModal>
      <BgBlurModal
        isShowModal={isShowWishlist}
        setIsShowModal={setIsShowWishlist}
      >
        <Wishlist isShow={isShowWishlist} setIsShow={setIsShowWishlist} />
      </BgBlurModal>
      <BgBlurModal isShowModal={isShowSearch} setIsShowModal={setIsShowSearch}>
        <ProductSearch isShow={isShowSearch} setIsShow={setIsShowSearch} />
      </BgBlurModal>
    </>
  );
};

export default Navbar;
