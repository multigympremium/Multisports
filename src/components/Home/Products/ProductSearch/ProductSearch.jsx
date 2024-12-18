import  { useState, useCallback, useEffect } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { useAuth } from "../../../../providers/AuthProvider";
import CustomImage from "../../../../shared/ImageComponents/CustomImage";
import { useNavigate } from "react-router-dom";


// Debounce function to delay API calls until the user stops typing
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ProductSearch = ({ setIsShow, isShow, diet_id, setUserId, setDietId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {branch} = useAuth()
  const navigate = useNavigate()

  // Handle search with debouncing to avoid frequent API calls
  const handleSearch = useCallback(
    debounce(async (value) => {
      try {
        const res = await axiosSecure.get(
          `/products?search=${value}&branch=${branch}`
        );
        setSearchData(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }, 300),
    [axiosSecure]
  );

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      handleSearch("a"); // Fetch default users if no search term is provided
    }
  }, [searchTerm, handleSearch]);

  const handleNavigate = (id) => {
    setIsShow(false);
    navigate(`products/0?product=${id}`)
  }


  return (
    <div className="p-6 px-0 pt-4 bg-white rounded-lg">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="focus:border-gray-300 appearance-none text-gray-700 border shadow-sm rounded-xl w-[95%] mx-auto block py-3 px-3 leading-tight focus:outline-none focus:shadow-outline mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      
        <div className="flex flex-col gap-4 max-h-[80dvh] overflow-auto" style={{scrollbarWidth: "thin"}}>
          {searchData.length > 0 ? (
            searchData.map((product) => (
              <button onClick={()=> handleNavigate(product._id)}  key={product._id} className="hover:bg-slate-100 w-full cursor-pointer grid grid-cols-3 gap-4 items-center border-b">
                <div className="py-2 px-4 ">
                  <CustomImage
                    imageKey={product.thumbnail}
                    alt={product.productTitle}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="py-2 px-4 ">{product.productTitle}</div>
                <div className="py-2 px-4 ">${product.price}</div>
               
              </button>
            ))
          ) : (
              <h3 colSpan="4" className="text-center py-20">
                No users found
              </h3>
            
          )}
        </div>
    </div>
  );
};

export default ProductSearch;
