"use client";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
const Navbar = () => {
  const placeholders = ['Shorts', 'Watch', 'Shirt'];
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isFocused, setIsFocused] = useState(false); // Track input focus state
  const SearchBar = () => {


    useEffect(() => {
      if (isFocused) return; // Stop animation if input is focused

      let typingTimeout;

      if (isTyping) {
        // Typing effect: Add one character at a time
        if (charIndex < placeholders[placeholderIndex].length) {
          typingTimeout = setTimeout(() => {
            setPlaceholderText((prev) => prev + placeholders[placeholderIndex][charIndex]);
            setCharIndex((prev) => prev + 1);
          }, 300); // Slowed typing speed
        } else {
          setIsTyping(false); // Pause before deleting
          setTimeout(() => setIsTyping(false), 2000); // Longer pause at end of word
        }
      } else {
        // Deleting effect: Remove one character at a time
        if (charIndex > 0) {
          typingTimeout = setTimeout(() => {
            setPlaceholderText((prev) => prev.slice(0, -1));
            setCharIndex((prev) => prev - 1);
          }, 150); // Slowed deleting speed
        } else {
          // Move to the next word and restart typing
          setIsTyping(true);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }
      }

      return () => clearTimeout(typingTimeout);
    }, [charIndex, isTyping, placeholderIndex, placeholders, isFocused]);

    const handleFocus = () => {
      setIsFocused(true); // Stop placeholder animation immediately when focused
    };

    const handleBlur = (e) => {
      if (e.target.value.length === 0) {
        setIsFocused(false); // Resume placeholder animation if input is empty
      }
    };

    return (
      <div className="bg-gray-100 rounded-full px-3 w-[70%] py-2 gap-2 flex-row-reverse justify-between flex">
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

  const {
    userRole,
    logOut,
    totalItems
  } = useContext(AuthContext);
  const router = useRouter();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowWishlist, setIsShowWishlist] = useState(false);


  const currentUserRoute =
    userRole === "Administrator"
      ? "/dashboard/admin/view_and_edit_admin_information"
      : userRole === "Survey Creator"
        ? "/dashboard/company/creator_profile"
        : "/dashboard/user/participant_profile";



  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("User logged out successfully!", {
          duration: 3000,
          position: "top-right",
        });

        router.push("/", { scroll: false });
      })
      .catch((error) => {
        toast.error("Logout failed. Please try again later.");
        console.error(error);
      });
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
                <MdMenu className="text-2xl" />
              </div>
              // <h3 className="text-xl font-bold">ALL SPORTS</h3>
              <div>
                <Link href="/" className="flex justify-center items-center ">
                  <Image
                    className="w-28 mix-blend-multiply dark:mix-blend-normal"
                    width={400}
                    height={400}
                    src={"https://multisports.shop/images/site_setting/multi-sports_vi6P5.png"}
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

          <SearchBar></SearchBar>

          {/* Menu */}
          <div className="navbar-end flex items-center gap-3">
            {/* My Store */}
            <div className="flex items-center justify-center flex-col gap-1 p-3 rounded">
              <MdOutlineStore className="text-2xl text-gray-600 hover:text-blue-500 hover:scale-110 cursor-pointer transition-all" />
              My Store
            </div>

            {/* Wishlist */}
            <div
              className="flex items-center justify-center flex-col gap-1 p-3 rounded"
              onClick={() => setIsShowWishlist(true)}
            >
              <FaRegHeart className="text-2xl text-gray-600 hover:text-pink-500 hover:scale-110 cursor-pointer transition-all" />
              Wishlist
            </div>

            {/* Cart */}
            <div
              onClick={() => setIsShowModal(true)}
              className="flex items-center justify-center flex-col gap-1 p-3 rounded"
            >
              <BsCart className="text-2xl text-gray-600 hover:text-orange-500 hover:scale-110 cursor-pointer transition-all" />
              Cart
              {/* <div className="badge badge-primary badge-lg">{totalItems}</div> */}
            </div>

            {/* Sign In */}
            <Link href="/login">
              <div className="flex items-center justify-center flex-col gap-1 p-3 rounded">
                <FaRegUser className="text-2xl text-gray-600 hover:text-blue-500 hover:scale-110 cursor-pointer transition-all" />
                Sign In
              </div>
            </Link>
          </div>

        </div>

      </header>
      <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <Cart isShow={isShowModal} setIsShow={setIsShowModal} />
      </BgBlurModal>
      <BgBlurModal isShowModal={isShowWishlist} setIsShowModal={setIsShowWishlist}>
        <Wishlist isShow={isShowWishlist} setIsShow={setIsShowWishlist} />
      </BgBlurModal>
    </>
  );
};

export default Navbar;
