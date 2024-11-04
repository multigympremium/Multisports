"use client";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineStore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import BgBlurModal from "./Modal/BgBlurModal";
import Cart from "./cart/Cart";
import Wishlist from "./Cards/Wishlist/Wishlist";
const Navbar = () => {
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
      className="flex flex-wrap lg:justify-start lg:flex-nowrap w-full items-center z-50 top-0 left-0 text-sm  transition-all duration-500 relative bg-white border-b py-3"
      id="header"
    >
      <div className="navbar w-[94%] mx-auto ">
        <div className="navbar-start">
          <div className="flex items-center gap-4">
            <div role="button" className="" id="menu_icon">
              <MdMenu className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold">ALL SPORTS</h3>
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

        <label class="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            class="grow"
            placeholder="I'm in the market for..."
          />
          <button className="hover:bg-gray-300 p-1 rounded">
            <CiSearch size={30} />
          </button>
        </label>

        <div className="navbar-end flex items-center gap-6">
          <Link href="/login">
            <div className="flex items-center justify-center flex-col gap-1 hover:bg-gray-200 p-3 rounded">
              <FaRegUser className="text-2xl" />
              Sign In
            </div>
          </Link>
          <div className="flex items-center justify-center flex-col gap-1 hover:bg-gray-200 p-3 rounded">
            <MdOutlineStore className="text-2xl" />
            My Store
          </div>
          <div className="flex items-center justify-center flex-col gap-1 hover:bg-gray-200 p-3 rounded" onClick={()=> setIsShowWishlist(true)}>
            <FaRegHeart className="text-2xl" />
            Wishlist
          </div>
          <div onClick={()=> setIsShowModal(true)} className="flex items-center justify-center flex-col gap-1 hover:bg-gray-200 p-3 rounded">
            <BsCart className="text-2xl" />
            Cart
            <div className="badge badge-primary badge-lg">{totalItems}</div>
          </div>
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
