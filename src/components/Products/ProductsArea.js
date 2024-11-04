"use client";
import useGetAllProducts from "@/Hook/GetDataHook/useGetAllProducts";
import React, { useState } from "react";
import ProductCardWithGallery from "../shared/Cards/CardWithGallery/ProductCardWithGallery";
import BgBlurModal from "../shared/Modal/BgBlurModal";
import ProductDetail from "./ProductDetail";

function ProductsArea({ slug, sizeFilter, colorFilter, brandFilter }) {
  const [targetId, setTargetId] = useState("");
  const [isShowDetail, setIsShowDetail] = useState(false);
  const products = useGetAllProducts({
    query: `search=${slug}&color=${colorFilter.join(
      ","
    )}&size=${sizeFilter.join(",")}&brand=${brandFilter.join(",")}`,
  });

  return (
    <>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ">
      {products?.length > 0 &&
        products.map((product, index) => (
          <ProductCardWithGallery key={index} product={product} setTargetId={setTargetId} setIsShowDetail={setIsShowDetail} />
        ))}
    </div>
    <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
      <ProductDetail targetId={targetId} setIsShowDetail={setIsShowDetail} isShowDetail={isShowDetail} />
    </BgBlurModal>
    </>
  );
}

export default ProductsArea;
