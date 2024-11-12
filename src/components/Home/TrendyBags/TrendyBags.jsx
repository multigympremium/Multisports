
import React from "react";
import TrendyBagsProductsArea from "./components/TrendyBagsProductsArea/TrendyBagsProductsArea";

function TrendyBags() {
  return (
    <>
      <div className="w-full">
        <img
          src={"/bags.png"}
          width={1200}
          height={500}
          alt=""
          className="h-[500px] w-full object-contain"
        />
      </div>

      <TrendyBagsProductsArea />
    </>
  );
}

export default TrendyBags;
