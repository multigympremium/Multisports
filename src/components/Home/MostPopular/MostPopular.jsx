import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProductSkeleton from "../../partial/ProductCard/ProductSkeleton";
import ProductCard from "../../partial/ProductCard/ProductCard";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const MostPopular = ({ limit = 8, isShowSeeAll = true }) => {
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
        const res = await axiosPublic.get(`/products/popular`);

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
        <h2 className="text-2xl font-bold mb-4">Most Popular</h2>
        {isShowSeeAll && (
          <Link
            to="/"
            className="flex hover:underline justify-between items-center gap-2 text-blue-500 font-semibold"
          >
            <span className="">See All</span> <FaArrowRight />
          </Link>
        )}
      </div>
      {loading ? (
        <ProductSkeleton skeletons={8} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products?.length > 0 &&
            products
              .slice(0, limit)
              .map((product, index) => (
                <ProductCard
                isPopular={true}
                  showDiscount={true}
                  key={index}
                  product={product}
                  handleProductClick={handleProductClick}
                />
              ))}
        </div>
      )}
    </section>
  );
};

export default MostPopular;
