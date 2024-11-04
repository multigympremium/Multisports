"use client";

import ProductsArea from "@/components/Products/ProductsArea";
import ActiveLink from "@/components/shared/ActiveLink";
import FilterRadioInput from "@/components/shared/FilterRadioInput";
import GroupLink from "@/components/shared/GroupLink";
import useGetAllModelOfBrands from "@/Hook/GetDataHook/useGetAllModelOfBrands";
import useGetAllProductBrands from "@/Hook/GetDataHook/useGetAllProductBrands";
import useGetAllProductColors from "@/Hook/GetDataHook/useGetAllProductColors";
import useGetAllProductSizes from "@/Hook/GetDataHook/useGetAllProductSizes";
import useGetAllSubCategories from "@/Hook/GetDataHook/useGetAllSubCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

function Page({ params }) {
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizesFilter] = useState([]);

  const router = useRouter();
  const productBrands = useGetAllProductBrands({});
  const subcategories = useGetAllSubCategories({});
  const productColors = useGetAllProductColors({});
  const productSizes = useGetAllProductSizes({});

  const handleFilterChange = (checked, value, type) => {
    console.log(value, checked, type, "value, checked");
    // setBrandFilter((prev) =>{

    // const   [...prev, value]

    // });

    switch (type) {
      case "brand":
        setBrandFilter((prev) => {
          if (checked) {
            console.log([...prev, value], "prev");
            return [...prev, value];
          } else {
            console.log(
              prev.filter((item) => item !== value),
              "prev"
            );
            return prev.filter((item) => item !== value);
          }
        });
        break;
      case "color":
        setColorFilter((prev) => {
          if (checked) {
            console.log([...prev, value], "prev");
            return [...prev, value];
          } else {
            console.log(
              prev.filter((item) => item !== value),
              "prev"
            );
            return prev.filter((item) => item !== value);
          }
        });
        break;
      case "size":
        setSizesFilter((prev) => {
          if (checked) {
            return [...prev, value];
          } else {
            return prev.filter((item) => item !== value);
          }
        });
        break;
      default:
        break;
    }
  };

  console.log(params, router, "search");
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 relative z-[1] ">
        <div
          className={` transition-all duration-500  h-[90vh] overflow-auto absolute top-0 left-0 lg:relative pt-8 z-[3] bg-gray-100 w-[300px]`}
        >
          <ul className="menu gap-3">
            {/* {currentUserRoute} */}

            <GroupLink groupName="Categories" icon={<FaUser />}>
              {subcategories.length > 0 &&
                subcategories.map((item, index) => (
                  <ActiveLink key={index} href={`/products/${item.slug}`}>
                    {item.subcategoryName}
                  </ActiveLink>
                ))}
            </GroupLink>
            <GroupLink groupName="Brands" icon={<FaUser />}>
              {productBrands?.length > 0 &&
                productBrands?.map((item, index) => (
                  <FilterRadioInput
                    label={item.brandName}
                    id={item.slug}
                    key={index}
                    name={item.slug}
                    value={item.slug}
                    checked={brandFilter.includes(item.slug)}
                    onChange={handleFilterChange}
                    type="brand"
                  />
                ))}
            </GroupLink>

            <GroupLink groupName="Colors" icon={<FaUser />}>
              {productColors?.length > 0 &&
                productColors?.map((item, index) => (
                  <FilterRadioInput
                    label={item.productColorName}
                    id={item.productColorName}
                    key={index}
                    name={item.productColorName}
                    checked={colorFilter.includes(item.productColorName)}
                    onChange={handleFilterChange}
                    type="color"
                  />
                ))}
            </GroupLink>

            <GroupLink groupName="Sizes" icon={<FaUser />}>
              {productSizes?.length > 0 &&
                productSizes?.map((item, index) => (
                  <FilterRadioInput
                    label={item.sizeName}
                    id={item.sizeName}
                    key={index}
                    name={item.sizeName}
                    checked={sizeFilter.includes(item.sizeName)}
                    onChange={handleFilterChange}
                    type="size"
                  />
                ))}
            </GroupLink>
          </ul>
        </div>
        <div className="flex-1 p-4 h-[90vh] overflow-auto dark:bg-white relative">
          <ProductsArea
            slug={params.id}
            sizeFilter={sizeFilter}
            colorFilter={colorFilter}
            brandFilter={brandFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
