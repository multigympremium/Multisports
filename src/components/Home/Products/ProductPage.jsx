import { useEffect, useRef, useState } from "react";
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
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { PiSlidersHorizontal } from "react-icons/pi";

const SelectableList = ({ items, labelKey, toggleSelection, selectedItems }) => {


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

const DrawerComponent = ({ children , setSelectedItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = () => setIsOpen(true);
  const handleCloseDrawer = () => setIsOpen(false);

  return (
    <div className="drawer">
      <input
        id="my-filter"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={handleOpenDrawer}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-filter" className="border border-gray-300 rounded-lg flex items-center max-w-min gap-2 px-4 py-1 font-semibold drawer-button" onClick={handleOpenDrawer}>
        <PiSlidersHorizontal />
        Filters
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="my-filter" aria-label="close sidebar" className="drawer-overlay" onClick={handleCloseDrawer}></label>
        <ul className="menu bg-base-200 text-base-content w-full p-4 relative">
          {/* Close Button */}
          <div className="flex justify-between items-center">
            <p className="text-2xl gap-3 font-normal flex items-center"><IoMdArrowBack onClick={handleCloseDrawer}  className="text-2xl" /> Filters</p>
            <p onClick={() => { setSelectedItems([]) }} className="text-sm cursor-pointer">Clear All</p>
          </div>
          {/* Sidebar content here */}
          {children}
        </ul>
      </div>
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

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems((prevSelected) => prevSelected.filter((item) => item !== itemToRemove));
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
      <div className="block md:hidden mt-3">
        <DrawerComponent setSelectedItems={setSelectedItems}>
          <div
            className={`md:hidden block transition-all duration-500  overflow-auto`}
          >
            <ul className="menu gap-3">
              {/* Filtering section */}
              <section className="border-b">
                <div>
                  {/* items here */}
                  {selectedItems &&
                    <div className="my-4 flex flex-wrap gap-1">
                      {/* <p className="border max-w-min py-2 px-4 rounded-2xl bg-slate-50">itfems</p> */}
                      {selectedItems.map((item, indx) => {
                        return <p
                          key={indx}
                          onClick={() => handleRemoveItem(item)}
                          className="border py-2 px-3 rounded-xl bg-slate-50 text-xs hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 flex items-center gap-2"
                        >
                          {item} <RiDeleteBin7Line className="transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                        </p>

                      })}
                    </div>
                  }
                </div>
              </section>
              <div className="space-y-3">
                <ProductFilterGroup groupName="Categories">
                  <SelectableList items={subcategories} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="subcategoryName" />
                </ProductFilterGroup>

                <ProductFilterGroup groupName="Brands">
                  <SelectableList items={productBrands} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="brandName" />
                </ProductFilterGroup>

                <ProductFilterGroup groupName="Colors">
                  <SelectableList items={productColors} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="productColorName" />
                </ProductFilterGroup>

                <ProductFilterGroup groupName="Sizes">
                  <SelectableList items={productSizes} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="sizeName" />
                </ProductFilterGroup>
              </div>
            </ul>
          </div>
        </DrawerComponent>
      </div>
      <div className="flex  flex-1 relative z-[1] ">
        <div
          className={`hidden md:block transition-all duration-500  overflow-auto absolute top-0 left-0 lg:relative pt-8 z-[3] w-[300px]`}
        >
          <ul className="menu gap-3">
            {/* Filtering section */}
            <section className="border-b">
              <p className="text-sm"><span className="text-gray-500">Home </span>   /   Products</p>
              <div className="mt-12">
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-normal">Filters</p>
                  <p onClick={() => { setSelectedItems([]) }} className="text-sm cursor-pointer">Clear All</p>
                </div>
                {/* items here */}
                {selectedItems &&
                  <div className="my-7 flex flex-wrap gap-2">
                    {/* <p className="border max-w-min py-2 px-4 rounded-2xl bg-slate-50">itfems</p> */}
                    {selectedItems.map((item, indx) => {
                      return <p
                        key={indx}
                        onClick={() => handleRemoveItem(item)}
                        className="border py-2 px-4 rounded-2xl bg-slate-50 hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 flex items-center gap-2"
                      >
                        {item} <RiDeleteBin7Line className="transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                      </p>

                    })}
                  </div>
                }
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
                <SelectableList items={subcategories} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="subcategoryName" />
              </ProductFilterGroup>

              <ProductFilterGroup groupName="Brands">
                <SelectableList items={productBrands} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="brandName" />
              </ProductFilterGroup>

              <ProductFilterGroup groupName="Colors">
                <SelectableList items={productColors} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="productColorName" />
              </ProductFilterGroup>

              <ProductFilterGroup groupName="Sizes">
                <SelectableList items={productSizes} toggleSelection={toggleSelection} selectedItems={selectedItems} labelKey="sizeName" />
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
