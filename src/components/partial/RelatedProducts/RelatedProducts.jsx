import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import ProductSkeleton from "../ProductCard/ProductSkeleton";
import ProductCard from "../../../shared/Cards/ProductCard/ProductCard";

const RelatedProducts = ({ limit = 30, isShowSeeAll = true, category }) => {
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
        console.log(category, "category in related products");
        const res = await axiosPublic.get(`/products/related/${category}`);
        console.log(res, "category in related products");

        if (res.status === 200 || res.status === 201) {
          setProducts(res.data.products);
          setLoading(false);
        }
        setLoading(true);
      } catch (error) {
        console.error("Error fetching Products:", error);
        setLoading(false);
        throw new Error("Failed to fetch Products");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }

    // fetchProducts();
  }, [axiosPublic, category]);

  console.log(products, "related products");

  const handleProductClick = (product) => {
    setCurrentProduct(product);
    document
      .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
      .showModal();
  };

  return (
    <section className="w-[90%] md:w-full mx-auto py-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      </div>
      {loading ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {products?.length > 0 &&
            products
              .slice(0, limit)
              .map((product, index) => (
                <ProductCard
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

export default RelatedProducts;
