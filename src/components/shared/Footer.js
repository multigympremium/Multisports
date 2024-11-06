"use client";

import moment from "moment/moment";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaPinterest, FaTiktok, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { ImLocation } from "react-icons/im";

const Footer = () => {
  const currentYear = moment().format("YYYY"); // Using moment.js
  const footerContainerVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        duration: 0.5,
        ease: "linear",
      },
    },
  };

  const footerItem = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
  };

  return (
    <div className="poppins border-t mt-12">
      <footer className="flex flex-wrap p-10    w-[96%] mx-auto justify-center md:justify-between items-start gap-8  text-left">
        <aside>
          <h6 className="footer-title text-lg font-bold mb-4 text-black">
            CONTACT US
          </h6>
          <div>
            <div className="flex gap-2 items-center">
              <FaPhoneAlt className="text-slate-600" />
              <h2 className="font-normal flex gap-3 ">
                <p>+8801313-197435</p>
                <p>+8801313-197427</p>
              </h2>
            </div>
            <div className="flex  gap-2 items-start mt-3 text-lg">
              <div>
                <ImLocation className="text-base text-slate-600 mt-1" />
              </div>
              <div className="text-slate-600">
                <p className="font-semibold text-base">MULTI Sports Premium</p>
                <p>24/1, 24/2 (3rd & 4th floor), Ring Road</p>
                <p>Shia Masjid Mor, Mohammadpur</p>
                <p>Dhaka 1207</p>
              </div>
            </div>
            <p className="text-slate-600 flex  gap-2 items-center mt-3 text-base">
              <span className="font-bold">
                <FiMail className="text-base text-slate-600" />
              </span>{" "}
              info@multigympremium.com
            </p>

          </div>
        </aside>
        <nav>
          <h6 className="footer-title text-lg font-bold mb-4 text-black">
            Company
          </h6>
          <div className="text-slate-600 flex flex-col gap-3 text-base">
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              href="/aboutus/about"
            >
              About us
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              href="/contactus"
            >
              Contact
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              href="#"
            >
              Shop Address
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              href="/blogs"
            >
              Blogs
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
              href="/notice"
            >
              Notice
            </Link>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title text-lg font-bold mb-4 text-black">
            Help
          </h6>
          <div className="text-slate-600 flex flex-col gap-3 text-base">
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              href="#"
            >
              Frequently Asked Questions
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              href="/terms"
            >
              Terms & Conditions
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              href="/Privacy"
            >
              Replacement Policy
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              href="/cookiePolicy"
            >
              Cookie policy
            </Link>
            <Link
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer"
              href="/refundpolicy"
            >
              EMI Terms & Conditions
            </Link>
          </div>
          {/* <Link className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300 cursor-pointer" href="/webadmin">
            Admin Login
          </Link> */}
        </nav>
        <nav>
          <h6 className="footer-title text-lg font-bold mb-4 text-black">
            Customer
          </h6>
          <div className="flex flex-col gap-3 text-slate-600 text-base">
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Register
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Marketplace
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Brands
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Savings for You
            </Link>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title text-lg font-bold mb-4 text-black">
            Social
          </h6>
          <div className="flex flex-col gap-3 text-slate-600 text-base">
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Facebook
            </Link>
            {/* <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              LinkedIn
            </Link> */}
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Youtube
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Instagram
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Tiktok
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Twitter
            </Link>
          </div>
        </nav>
      </footer>

      <div className="mx-auto w-[95%]">
        <footer className="footer flex justify-between items-center py-3  border-t   px-5 text-center text-xl">
          <p className="text-base">
            © {currentYear} MULTI Sports Premium All Rights Reserved
          </p>
          {/* icons */}
          <nav className="flex gap-3 ">
            <a
              href="https://www.facebook.com/MultiGymPremium"
              target="_blank"
              className=""
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a
              href="https://www.instagram.com/multigym.premium"
              target="_blank"
              className=""
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/company/multigympremium"
              target="_blank"
              className=""
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="https://www.pinterest.com/multigympremium"
              target="_blank"
              className=""
              rel="noopener noreferrer"
              aria-label="Pinterest"
            >
              <FaPinterest className="text-lg" />
            </a>
            <a
              href="https://www.tiktok.com/@multigympremium"
              target="_blank"
              className=""
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok className="text-lg" />
            </a>
            <a
              href="https://www.youtube.com/@MultiGymPremium"
              target="_blank"
              className=""
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="text-lg" />
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
