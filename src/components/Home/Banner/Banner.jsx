import useGetAllBanners from "../../../Hook/GetPublicDataHook/useGetAllBanners";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const CustomCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full h-[600px]">
      {/* Swiper Container */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Include Autoplay in modules
        autoplay={{
          delay: 3000, // Slide delay in milliseconds
          disableOnInteraction: false, // Continue autoplay after interaction
        }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="h-full"
      >
        {/* Slides */}
        <SwiperSlide>
          <div className="h-full flex items-center justify-center bg-orange-400">
            <div className="flex items-center gap-6 w-full max-w-5xl mx-auto px-4">
              <div className="text-black space-y-4 max-w-md">
                <h2 className="text-4xl font-bold">We Picked Every Item With Care</h2>
                <p className="text-lg">Use this code to receive 50% discount off all products.</p>
                <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2">
                  Go To Collection <IoIosArrowForward />
                </button>
              </div>
              <img
                src="https://via.placeholder.com/400"
                alt="Slide"
                className="h-auto max-w-[300px] rounded-lg shadow-md"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center bg-blue-200">
            <div className="flex items-center gap-6 w-full max-w-5xl mx-auto px-4">
              <div className="text-black space-y-4 max-w-md">
                <h2 className="text-4xl font-bold">Explore Our New Arrivals</h2>
                <p className="text-lg">Discover the latest trends at discounted prices.</p>
                <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg flex items-center gap-2">
                  Shop Now <IoIosArrowForward />
                </button>
              </div>
              <img
                src="https://via.placeholder.com/400"
                alt="Slide"
                className="h-auto max-w-[300px] rounded-lg shadow-md"
              />
            </div>
          </div>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>

      {/* Stylish Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <IoIosArrowBack size={20} />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

const Banner = () => {
  const banners = useGetAllBanners({});

  return (
    <CustomCarousel />
  );
};

export default Banner;
