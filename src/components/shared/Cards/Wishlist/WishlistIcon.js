"use client";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext,  useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export default function WishlistIcon({item}) {
  const {  wishlist, addToWishlist, removeFromWishlist } = useContext(AuthContext);
  const [isLike, setIsLike] = useState(!wishlist.map((item)=> item._id).includes(item._id));


  const handleWishlist = () => {

    console.log(item, isLike, "item")
    
    setIsLike((prev)=> {
      if (prev) {
        addToWishlist(item);
       return false
      } else {
        removeFromWishlist(item._id);
       return true
      }

    })
  };



  return (
    
          <button
            className=" bg-white rounded-full p-1 shadow hover:shadow-lg absolute top-3 right-3 z-40"
            onClick={handleWishlist}
          >
            {isLike ? <FaRegHeart /> : <FaHeart />}
          </button>
        
  );
}
