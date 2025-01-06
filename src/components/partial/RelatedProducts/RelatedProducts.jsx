import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import useAxiosPublic from "../../../Hook/useAxiosPublic";
import ProductSkeleton from "../ProductCard/ProductSkeleton";
import ProductCard from "../ProductCard/ProductCard";
// import ProductCard from "../../../shared/Cards/ProductCard/ProductCard";

const RelatedProducts = ({ limit = 4, isShowSeeAll = true, category }) => {
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
  const prevRef = useRef(null);
    const nextRef = useRef(null);

  return (
    <section className="w-[90%] md:w-full mx-auto py-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold mb-4">You may like</h2>
      </div>
      {loading ? (
        <ProductSkeleton skeletons={4} />
      ) : (
        <div className="">
          {/* {products?.length > 0 &&
            products
              .slice(0, limit)
              .map((product, index) => (
                // <ProductCard
                //   key={index}
                //   product={product}
                //   handleProductClick={handleProductClick}
                // />
                <div key={index} className="border rounded-lg">
                  <ProductCard
                    product={product}
                    // isSpecial={true}
                    // isPopular={true}
                    showNewArrival={true}
                    showDiscount={true}
                    handleProductClick={handleProductClick}
                  />
                </div>
              ))} */}


          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              spaceBetween={0}
              slidesPerView={2}
              breakpoints={{
                768: { slidesPerView: 4 },
                1024: { slidesPerView:4 },
              }}
              loop={true}
            >
              {products?.length > 0 &&
                products.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    <div className="px-2">
                      <ProductCard
                        product={product}
                        showNewArrival={true}
                        showDiscount={true}
                        handleProductClick={handleProductClick}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
              ref={prevRef}
              className="absolute top-1/3 -left-2 md:-left-9 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full border-l transition-all duration-300 ease-in-out md:hover:bg-gray-700  hover:text-white hover:scale-110 hover:shadow-2xl z-10"
            >
              <IoIosArrowBack className="text-base" />
            </button>

            <button
              ref={nextRef}
              className="absolute top-1/3 -right-2 md:-right-9 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center  bg-white text-black rounded-full border-r  transition-all duration-300 ease-in-out md:hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
            >
              <IoIosArrowForward className="text-base" />
            </button>
          </div>





        </div>
      )}
    </section>
  );
};

export default RelatedProducts;
