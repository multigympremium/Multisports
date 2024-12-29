import { useEffect, useState } from "react";
import ProductCard from "../../partial/ProductCard/ProductCard";
import ProductSkeleton from "../../partial/ProductCard/ProductSkeleton";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const NewArrivals = ({ limit = 8, isShowSeeAll = true }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [query, setQuery] = useState("page=1&limit=10"); // Example query parameters
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/products/new_arrivals`);

        if (res.status === 200 || res.status === 201) {
          setProducts(res.data.products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
        setLoading(false);
        throw new Error("Failed to fetch Products");
      }
    };

    fetchProducts();
  }, [axiosPublic]);

  console.log(products);

  const handleProductClick = (product) => {
    setCurrentProduct(product);
    document
      .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
      .showModal();
  };

  return (
    <section className="w-[90%] md:w-full mx-auto py-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
        {isShowSeeAll && (
          <Link
            to="/new_arrivals"
            className="flex hover:underline justify-between items-center gap-2 text-blue-500 font-semibold"
          >
            <span className="">See All</span> <FaArrowRight />
          </Link>
        )}
      </div>
      {loading ? (
        <ProductSkeleton skeletons={8} />
      ) : (
        <div className="grid grid-cols-2 md:gap-y-8 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products?.length > 0 &&
            products
              .slice(0, limit)
              .map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  handleProductClick={handleProductClick}
                  showNewArrival={true}
                  showDiscount={true}
                />
              ))}
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
