import React from "react";
import LogoArea from "./LogoArea";
import { FaArrowRight } from "react-icons/fa";

function Brands(props) {
  return (
    <div className="container mx-auto bg-gray-100 py-5 px-12 rounded-md">
      <div className="flex justify-between">
        <p>Shop With Brands</p>
        <button className="flex hover:underline justify-between items-center gap-2 text-blue-500 font-semibold"><span className="">See More</span> <FaArrowRight /></button>
      </div>
      <div className="">
        <LogoArea />
      </div>
    </div>
  );
}

export default Brands;
