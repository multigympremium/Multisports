
import React from "react";
import FootwearProductsArea from "./components/FootwearProductsArea/FootwearProductsArea";

function Footwear(props) {
  return (
    <>
      <div className="w-full">
        <img
          src={"/shoes_banner.png"}
          width={1200}
          height={500}
          alt=""
          className="h-[500px] w-full object-contain"
        />
      </div>

      <FootwearProductsArea />
    </>
  );
}

export default Footwear;
