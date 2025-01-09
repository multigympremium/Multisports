import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import ProductCard from "../../components/partial/ProductCard/ProductCard";
import ProductSkeleton from "../../components/partial/ProductCard/ProductSkeleton";

const SeeAll = () => {
    const { id } = useParams(); // Getting the id from route params
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12); // Controls how many products are visible
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const getTitle = (id) => {
        switch (id) {
            case "popular":
                return "Popular Products";
            case "new_arrivals":
                return "New Arrivals";
            case "best_selling":
                return "Best Selling Products";
            case "discount":
                return "Discounted Products";
            default:
                return "Products";
        }
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axiosPublic.get(`/products/${id}`); // Fetch products using the id
                if (res.status === 200 || res.status === 201) {
                    setProducts(res.data.products);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    const handleProductClick = (product) => {
        document
            .getElementById(`modal_${product.productTitle.replace(/\s+/g, "_")}`)
            .showModal();
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    return (
        <div className="p-4 mt-2 max-w-[1440px] mx-auto">
            <div className="">
                <h1 className="text-3xl mb-10 text-center px-8 border-b-2 pb-5 border-gray-200 font-semibold text-gray-800 bg-white">
                    {getTitle(id)}
                </h1>
            </div>

            {loading ? (
                <ProductSkeleton skeletons={12} />
            ) : products.length > 0 ? (
                <>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.slice(0, visibleCount).map((product, index) => (
                            <ProductCard
                                border={true}
                                key={index}
                                product={product}
                                handleProductClick={handleProductClick}
                                showNewArrival={true}
                                showDiscount={true}
                            />
                        ))}
                    </ul>
                    {visibleCount < products.length && (
                        <div className="text-center mt-4">
                            <button
                                onClick={handleLoadMore}
                                className="px-7 py-3 bg-gray-800 rounded-xl hover:bg-slate-950 text-white font-semibold mt-4 transition"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-gray-500">No products found.</p>
            )}
        </div>
    );
};

export default SeeAll;