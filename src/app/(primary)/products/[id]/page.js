

import ProductsArea from "@/components/Products/ProductsArea";
import ProductSidebar from "@/components/Products/ProductSidebar/ProductSidebar";
// import ActiveLink from "@/components/shared/ActiveLink";
// import FilterRadioInput from "@/components/shared/FilterRadioInput";
// import GroupLink from "@/components/shared/GroupLink";
// import useGetAllModelOfBrands from "@/Hook/GetDataHook/useGetAllModelOfBrands";
// import useGetAllProductBrands from "@/Hook/GetDataHook/useGetAllProductBrands";
// import useGetAllProductColors from "@/Hook/GetDataHook/useGetAllProductColors";
// import useGetAllProductSizes from "@/Hook/GetDataHook/useGetAllProductSizes";
// import useGetAllSubCategories from "@/Hook/GetDataHook/useGetAllSubCategories";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FaUser } from "react-icons/fa";




async function Page({ params, search }) { 

 const res_products = await fetch(`http://localhost:3000/api/products?search=${params.id}`);
 const products = await res_products.json();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 relative z-[1] ">
        <ProductSidebar query={search} params={params} />
        <div className="flex-1 p-4 h-[90vh] overflow-auto dark:bg-white relative">
          <ProductsArea
            slug={params.id}
            // sizeFilter={sizeFilter}
            // colorFilter={colorFilter}
            // brandFilter={brandFilter}
            products={products.data}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;



