

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SubcategoryLink({
  subcategory,
  childCategoryItem
}) {

    const [childCategories, setChildCategories] = useState([]);
    const [isHover, setIsHover] = useState(false);
    const [activeItem, setActiveItem] = useState("")

    useEffect(() => {
      const filterItems = childCategoryItem.filter((item) => item.subcategory === subcategory.slug);
      
      setChildCategories(filterItems);

    }, [activeItem, childCategoryItem]);
  return (
    <Link
    
    className="hover:text-blue-800 group hover:translate-x-3 pr-10 py-2 transition-all duration-300 text-lg hover:underline relative" to={`/products/${subcategory.slug}`} onMouseOver={()=> {setActiveItem(subcategory.slug); } }  >
    {subcategory.subcategoryName} 

    {
      childCategories?.length > 0 && 
      <ul className={`absolute left-full top-0 bg-white text-neutral-800 rounded-md shadow-lg z-50 px-5 py-4 space-y-3 min-w-[250px] transition-all duration-300 opacity-0 translate-x-4 invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible`}>
        {childCategories.map((item, index) => (
          <li key={index}>
          <Link to={`/products/${item.slug}`} className=" hover:text-blue-500 ">{item.childCategoryName}</Link>
        </li>
        ))}
      </ul>
    }

    
    </Link>
  );
}

export default SubcategoryLink;
