import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCart } from "react-icons/bs";

import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdMenu, MdOutlineStore } from "react-icons/md";
import Wishlist from "../Cards/Wishlist/Wishlist";
import BgBlurModal from "../Modal/BgBlurModal";
import Cart from "../cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import ProductSearch from "../../components/Home/Products/ProductSearch/ProductSearch";
import SidebarContainer from "../SidebarContainer";
import {
  IoCartOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import CustomImage from "../ImageComponents/CustomImage";
import SearchArea from "./SearchArea";
const Navbar = () => {
  const { userRole, logOut, totalItems, user } = useContext(AuthContext);
  const placeholders = ["Shorts", "Watch", "Shirt"];

  const [isFocused, setIsFocused] = useState(false);
  const router = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowWishlist, setIsShowWishlist] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);

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

  const ROUTES = {
    ACCOUNT: "/account/dashboard",
    ORDERS: "/account/orders",
    ACCOUNT_DETAILS: "/account/details",
    CHANGE_PASSWORD: "/account/change-password",
  };

  const accountMenu = [
    {
      slug: ROUTES.ACCOUNT,
      name: "Account",
      icon: <IoHomeOutline className="w-5 h-5" />,
    },
    {
      slug: ROUTES.ORDERS,
      name: "Orders",
      icon: <IoCartOutline className="w-5 h-5" />,
    },
    {
      slug: ROUTES.ACCOUNT_DETAILS,
      name: "Details",
      icon: <IoPersonOutline className="w-5 h-5" />,
    },
    {
      slug: ROUTES.CHANGE_PASSWORD,
      name: "Password",
      icon: <IoSettingsOutline className="w-5 h-5" />,
    },
  ];
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
                    <ul className="menu bg-white text-base-content min-h-full w-96">
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
                    src={"/logo.png"}
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

          <SearchArea
            setIsShowSearch={setIsShowSearch}
            placeholders={placeholders}
            setIsFocused={setIsFocused}
          />

          {/* Menu */}
          <div className="navbar-end flex items-center gap-1 md:gap-3">
            {/* My Store */}
            <button className="flex items-center justify-center flex-col gap-1 md:p-3 p-1 rounded">
              <MdOutlineStore className="md:text-2xl text-base text-gray-600 hover:text-blue-500 hover:scale-110 cursor-pointer transition-all" />
              <span className="hidden md:block">My Store</span>
            </button>

            {/* Wishlist */}
            <button
              className=" md:p-3 p-1 rounded"
              onClick={() => setIsShowWishlist(true)}
            >
              <label
                htmlFor="my-wishlist"
                className=" drawer-button flex items-center justify-center flex-col gap-1"
              >
                <FaRegHeart className="md:text-2xl text-base text-gray-600 hover:text-pink-500 hover:scale-110 cursor-pointer transition-all" />
                <span className="hidden md:block">Wishlist</span>
              </label>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsShowModal(true)}
              className=" md:p-3 p-1 rounded relative"
            >
              <label
                htmlFor="my-cart"
                className=" drawer-button flex items-center justify-center flex-col gap-1"
              >
                <BsCart className="md:text-2xl text-base text-gray-600 hover:text-orange-500 hover:scale-110 cursor-pointer transition-all" />
                <span className="hidden md:block">Cart</span>
              </label>
              <div className="bg-gray-800 text-white rounded-full px-2 absolute top-1 -right-1">
                {totalItems}
              </div>
            </button>

            {/* Sign In */}
            {user ? (
              <details className="dropdown">
                <summary className="avatar w-16 m-1">
                  <div className="bg-neutral text-neutral-content w-16 rounded-full !flex justify-center items-center mx-auto">
                    {user?.photourl ? (
                      <CustomImage imageKey={user?.photourl} />
                    ) : (
                      <span className="text-3xl">{user?.username[0]}</span>
                    )}
                  </div>
                </summary>
                <ul className="menu dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow right-0 gap-1">
                  {accountMenu.map((item, index) => (
                    <li key={item.slug}>
                      <Link
                        to={item.slug}
                        className="flex items-center text-[13px] gap-2 p-2 rounded-lg transition-colors  "
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  ))}

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
      {/* <BgBlurModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
      </BgBlurModal> */}
      <Cart isShow={isShowModal} setIsShow={setIsShowModal} />
      <Wishlist isShow={isShowWishlist} setIsShow={setIsShowWishlist} />
      {/* <BgBlurModal
        isShowModal={isShowWishlist}
        setIsShowModal={setIsShowWishlist}
      >
      </BgBlurModal> */}
      <BgBlurModal isShowModal={isShowSearch} setIsShowModal={setIsShowSearch}>
        <ProductSearch
          isShow={isShowSearch}
          setIsShow={setIsShowSearch}
          isFocused={isFocused}
        />
      </BgBlurModal>
    </>
  );
};

export default Navbar;
