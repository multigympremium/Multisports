import React from "react";
import LogoArea from "./LogoArea";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Brands(props) {
  return (
    <div className=" mx-auto bg-gray-100 pt-3 md:pt-9 md:px-16 px-4 w-full rounded-md">
      <div className="flex justify-between mb-6">
        <p className="text-xl text-gray-500">Shop With Brands</p>
        <Link to="/all-brands" className="flex hover:underline justify-between items-center gap-2 text-blue-500 font-semibold"><span className="">See More</span> <FaArrowRight /></Link>
      </div>
      <div className="">
        <LogoArea />
      </div>
    </div>
  );
}

export default Brands;
