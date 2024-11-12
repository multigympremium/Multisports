"use client";
import ProductCardWithGallery from "../../../shared/Cards/CardWithGallery/ProductCardWithGallery";
import useGetAllProducts from "../../../Hook/GetDataHook/useGetAllProducts";

function PopularProducts() {
  const products = useGetAllProducts({ });

  return (
    <div className="container mx-auto mt-16 mb-10">
      <h2 className=" text-3xl font-bold text-gray-800 mb-3">
        Most Popular Products
      </h2>
      <h4 className="px-6 py-2 bg-yellow-400 uppercase inline-block font-bold">
        {" "}
        Latest Price Best Value
      </h4>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
        {
          products?.length > 0 &&  products.slice(0, 6)?.map((product, index) => (
            <ProductCardWithGallery key={index} product={product} />
          ))
        }
      </div>
    </div>
  );
}

export default PopularProducts;
