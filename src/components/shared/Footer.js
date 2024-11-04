"use client";

import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { FiMail } from "react-icons/fi";
import moment from "moment/moment";
import Link from "next/link";
import Image from "next/image";

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
    <div className="poppins">
      <footer className="flex flex-wrap p-10 justify-center md:justify-between items-start gap-8  text-left">
        <aside>
          <h6 className="footer-title text-xl font-bold mb-4 text-black">
            CONTACT US
          </h6>
          <div>
            <h2 className="font-bold text-2xl text-blue-900">
              <p>+8801313-197435</p>
              <p>+8801313-197427</p>
            </h2>
            <div className="flex  gap-2 items-start mt-3 text-lg">
              <div>
                <ImLocation className="text-2xl text-slate-600 mt-2" />
              </div>
              <div className="text-slate-600">
                <p className="font-semibold text-xl">MULTI Sports Premium</p>
                <p>24/1, 24/2 (3rd & 4th floor), Ring Road</p>
                <p>Shia Masjid Mor, Mohammadpur</p>
                <p>Dhaka 1207</p>
              </div>
            </div>
            <p className="text-slate-600 flex gap-2 items-start mt-3 text-lg">
              <span className="font-bold">
                <FiMail className="text-2xl text-slate-600" />
              </span>{" "}
              info@multigympremium.com
            </p>
            <nav className="flex gap-4 mt-5 ">
              <a
                href="https://www.facebook.com/MultiGymPremium"
                target="_blank"
                className="rounded-full bg-gray-300 p-2 hover:bg-blue-300 "
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook size={25} class />
              </a>
              <a
                href="https://www.instagram.com/multigym.premium"
                target="_blank"
                className="rounded-full bg-gray-300 p-2 hover:bg-blue-300 "
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={25} class />
              </a>
              <a
                href="https://www.linkedin.com/company/multigympremium"
                target="_blank"
                className="rounded-full bg-gray-300 p-2 hover:bg-blue-300 "
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={25} class />
              </a>
              <a
                href="https://www.pinterest.com/multigympremium"
                target="_blank"
                className="rounded-full bg-gray-300 p-2 hover:bg-blue-300 "
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <FaPinterest size={25} class />
              </a>
              <a
                href="https://www.tiktok.com/@multigympremium"
                target="_blank"
                className="rounded-full bg-gray-300 p-2 hover:bg-blue-300 "
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok size={25} class />
              </a>
              <a
                href="https://www.youtube.com/@MultiGymPremium"
                target="_blank"
                className="rounded-full bg-gray-300 p-2 hover:bg-blue-300 "
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube size={25} class />
              </a>
            </nav>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title text-xl font-bold mb-4 text-black">
            Company
          </h6>
          <div className="text-slate-600 flex flex-col gap-4 text-lg">
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
          <h6 className="footer-title text-xl font-bold mb-4 text-black">
            Help
          </h6>
          <div className="text-slate-600 flex flex-col gap-4 text-lg">
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
          <h6 className="footer-title text-xl font-bold mb-4 text-black">
            Customer
          </h6>
          <div className="flex flex-col gap-4 text-slate-600 text-lg">
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
          <h6 className="footer-title text-xl font-bold mb-4 text-black">
            Social
          </h6>
          <div className="flex flex-col gap-4 text-slate-600 text-lg">
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              Facebook
            </Link>
            <Link
              href={"#"}
              className="hover:text-blue-800 hover:translate-x-3 transition-all duration-300"
            >
              LinkedIn
            </Link>
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
              X (Twitter)
            </Link>
          </div>
        </nav>
      </footer>

      <div className="mx-auto">
        <footer className="footer flex justify-center items-center py-7  border-t bg-neutral-800 text-white  px-5 text-center text-xl">
          <p className="">
            © {currentYear} MULTI Sports Premium All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
