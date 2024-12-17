import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";
import useGetAllSubCategories from "../../../Hook/GetDataHook/useGetAllSubCategories";
import useGetAllProductColors from "../../../Hook/GetDataHook/useGetAllProductColors";
import useGetAllProductSizes from "../../../Hook/GetDataHook/useGetAllProductSizes";
import GroupLink from "../../../shared/GroupLink";
import ActiveLink from "../../../shared/ActiveLink";
import FilterRadioInput from "../../../shared/FilterRadioInput";
import ProductsArea from "./ProductsArea";
import ReactGA from "react-ga4";
import ProductFilterGroup from "../../../shared/ProductFilterGroup";

const SelectableList = ({ items, labelKey ,toggleSelection }) => {
  

  return (
    <div className="space-y-4">
      {items.length == 0 ? (
        // Loading skeleton when items.length is 0
        Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 animate-pulse"
          >
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-5 bg-gray-200 rounded-full w-2/3"></div>
          </div>
        ))
      ) : (
        // Actual items when items.length > 0
        items.slice(0, 8).map((item, index) => (
          <label
            key={index}
            className="flex items-center cursor-pointer transition-colors group"
          >
            <input
              type="checkbox"
              className="peer hidden"
              checked={selectedItems.includes(item[labelKey])}
              onChange={() => toggleSelection(item[labelKey])}
            />
            <span className="w-5 h-5 border-2 border-gray-200 rounded mr-4 flex items-center justify-center peer-checked:bg-black peer-checked:border-black group-hover:border-gray-700 transition-all duration-300 delay-100">
              {selectedItems.includes(item[labelKey]) && (
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                </svg>
              )}
            </span>
            <p className="transition-all text-sm duration-300 delay-100">
              {item[labelKey]}
            </p>
          </label>
        ))
      )}
    </div>

  );
};



function ProductPage() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (name) => {
    setSelectedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };
  const params = useParams()
  const location = useLocation()
  console.log(location, "searchParams")
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sizeFilter, setSizesFilter] = useState([]);

  const router = useLocation();
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

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "ProductPage.jsx" });

    ReactGA.event({
      category: "Product Visiting",
      action: "ProductPage ",
    });
  }, []);

  console.log(params, router, "search");
  return (
    <div className="flex ml-12 flex-col">
      <div className="flex  flex-1 relative z-[1] ">
        <div
          className={` transition-all duration-500  overflow-auto absolute top-0 left-0 lg:relative pt-8 z-[3] w-[300px]`}
        >
          <ul className="menu gap-3">
            {/* Filtering section */}
            <section className="border-b pb-8">
              <p className="text-sm"><span className="text-gray-500">Home </span>   /   Products</p>
              <div className="mt-12">
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-normal">Filters</p>
                  <p className="text-sm">Clear All</p>
                </div>
                {/* items here */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <p className="border max-w-min py-2 px-4 rounded-2xl bg-slate-50">itfems</p>
                  
                </div>
              </div>
            </section>

            {/* <GroupLink groupName="Categories" icon={<FaUser />}>
              {subcategories.length > 0 &&
                subcategories.map((item, index) => (
                  <ActiveLink key={index} href={`/products/${item.slug}`}>
                    {item.subcategoryName}
                  </ActiveLink>
                ))}
            </GroupLink> */}


            {/* <GroupLink groupName="Brands" icon={<FaUser />}>
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
            </GroupLink> */}


            {/* <GroupLink groupName="Colors" icon={<FaUser />}>
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
            </GroupLink> */}

            {/* <GroupLink groupName="Sizes" icon={<FaUser />}>
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
            </GroupLink> */}
            <div className="space-y-4">
              <ProductFilterGroup groupName="Categories">
                <SelectableList items={subcategories} toggleSelection={toggleSelection} labelKey="subcategoryName" />
              </ProductFilterGroup>

              <ProductFilterGroup groupName="Brands">
                <SelectableList items={productBrands} toggleSelection={toggleSelection} labelKey="brandName" />
              </ProductFilterGroup>

              <ProductFilterGroup groupName="Colors">
                <SelectableList items={productColors} toggleSelection={toggleSelection} labelKey="productColorName" />
              </ProductFilterGroup>

              <ProductFilterGroup groupName="Sizes">
                <SelectableList items={productSizes} toggleSelection={toggleSelection} labelKey="sizeName" />
              </ProductFilterGroup>
            </div>
          </ul>
        </div>
        <div className="flex-1 p-4 overflow-auto dark:bg-white relative">
          <ProductsArea
            slug={params.id}
            sizeFilter={sizeFilter}
            colorFilter={colorFilter}
            brandFilter={brandFilter}
            query={location.search}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
