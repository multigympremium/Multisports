import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import GlobalLoading from "../../../components library/GlobalLoading";

import { useAuth } from "../../../providers/AuthProvider";
import ProductCard from "../../partial/ProductCard/ProductCard";

export default function MyWishlist() {
  const axiosSecure = useAxiosSecure();
  const { user, wishlist } = useAuth();

  const [products, setProducts] = useState(null);
  // const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/wishlist/user/${user?._id}`);
        setProducts(res?.data?.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (user?._id) fetchOrder();

    console.log(wishlist, "wishlist");
  }, [axiosSecure, user, wishlist]);
  const handleProductClick = (product) => {
    // setCurrentProduct(product);
    document
      .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
      .showModal();
  };

  if (!products) return <GlobalLoading />;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md min-h-[600px]">
      {/* Page Header */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Wishlist
      </h2>

      <div className="grid grid-cols-2 md:gap-y-8  lg:grid-cols-4 gap-3 md:gap-6">
        {products &&
          products.map((product, index) => (
            <ProductCard
              border={true}
              key={index}
              product={product?.product_id}
              handleProductClick={handleProductClick}
              showNewArrival={true}
              showDiscount={true}
            />
          ))}

        {products && products?.length <= 0 && (
          <div className="flex items-center justify-center flex-col w-full h-full col-span-full mt-2 gap-4">
            <img
              src="/no_order.jpg"
              alt="no_order"
              className="w-full max-w-[400px] "
            />
            <h2 className="text-center font-bold text-xl ">
              You Have No Wishlist Item
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
