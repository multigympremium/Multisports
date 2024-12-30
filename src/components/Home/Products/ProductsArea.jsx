import { useState } from "react";
import BgBlurModal from "../../../shared/Modal/BgBlurModal";
import ProductDetail from "./ProductDetail";
import ProductCardWithGallery from "../../../shared/Cards/CardWithGallery/ProductCardWithGallery";
import useGetAllProducts from "../../../Hook/GetPublicDataHook/useGetAllProducts";
import Pagination from "../../partial/Pagination/Pagination";
import { ThreeDots } from "react-loader-spinner";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  console.log(
    query,
    "query",
    slug,
    sizeFilter,
    colorFilter,
    brandFilter,
    "brandFilter"
  );
  const { products, totalItems, loading } = useGetAllProducts({
    query: `search=${slug}&color=${colorFilter.join(
      ","
    )}&size=${sizeFilter.join(",")}&brand=${brandFilter.join(",")}&${
      query.includes("product=") ? "product=" + query.split("=")[1] : ""
    }&subcategory=${subcategoryFilter.join(",")}&category=${categoryFilter.join(
      ","
    )}&currentPage=${currentPage}&limit=${itemsPerPage}`,
  });

  console.log(products, "products", totalItems, "totalItems");

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-screen">
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
      {totalItems > currentPage * itemsPerPage && (
        <button
          className="w-full border py-5 flex justify-center items-center mt-10"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="gray"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Load More"
          )}
        </button>
      )}
      {/* <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        limit={itemsPerPage}
        setCurrentPage={setCurrentPage}
      /> */}
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
