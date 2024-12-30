import { useState } from "react";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import ProductDetail from "./ProductDetail";
import ProductCardWithGallery from "../../../shared/Cards/CardWithGallery/ProductCardWithGallery";
import useGetAllProducts from "../../../Hook/GetPublicDataHook/useGetAllProducts";

function ProductsArea({
  slug,
  sizeFilter,
  colorFilter,
  brandFilter,
  query,
  subcategoryFilter,
  categoryFilter,
}) {
  const [targetId, setTargetId] = useState("");
  const [isShowDetail, setIsShowDetail] = useState(false);

  console.log(
    query,
    "query",
    slug,
    sizeFilter,
    colorFilter,
    brandFilter,
    "brandFilter"
  );
  const products = useGetAllProducts({
    query: `search=${slug}&color=${colorFilter.join(
      ","
    )}&size=${sizeFilter.join(",")}&brand=${brandFilter.join(",")}&${
      query.includes("product=") ? "product=" + query.split("=")[1] : ""
    }&subcategory=${subcategoryFilter.join(",")}&category=${categoryFilter.join(
      ","
    )}`,
  });

  console.log(products, "products");

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {products && products?.length > 0 ? (
          products.map((product, index) => (
            <ProductCardWithGallery
              key={index}
              product={product}
              setTargetId={setTargetId}
              setIsShowDetail={setIsShowDetail}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-screen col-span-full">
            <h1 className="text-2xl font-bold">No Products Found</h1>
          </div>
        )}
      </div>
      <BgBlurModal isShowModal={isShowDetail} setIsShowModal={setIsShowDetail}>
        <ProductDetail
          targetId={targetId}
          setIsShowDetail={setIsShowDetail}
          isShowDetail={isShowDetail}
        />
      </BgBlurModal>
    </>
  );
}

export default ProductsArea;
