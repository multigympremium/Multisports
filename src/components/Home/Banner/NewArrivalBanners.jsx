import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import useGetAllNewArrivalBanner from "../../../Hook/GetPublicDataHook/useGetAllNewArrivalBanner";

const SkeletonCarousel = () => (
  <div className="relative w-[90%] mx-auto  md:w-full h-[170px] my-4 md:my-9 md:h-[800px] animate-pulse">
    <div className="w-full h-full bg-gray-300 rounded-lg"></div>
    {/* <div className="absolute top-1/2 -translate-y-1/2 left-3 md:left-12 w-7 h-7 md:w-11 md:h-11 bg-gray-400 rounded-full"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-12 w-7 h-7 md:w-11 md:h-11 bg-gray-400 rounded-full"></div> */}
    {/* <div className="absolute bottom-4 md:bottom-10 left-12 md:left-52 z-10 -translate-x-1/2 flex gap-2 md:gap-4">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="h-2 md:h-4 w-2 md:w-4 bg-gray-400 rounded-full"
                ></div>
            ))}
        </div> */}
  </div>
);

const CustomCarousel = ({ slides, isHomeArea = true }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        setActiveIndex(swiperInstance.realIndex);
      });
    }
  }, []);

  return (
    <div
      className={`relative  w-[90%] mx-auto md:w-full h-[180px] my-4 md:my-9 ${
        isHomeArea && "md:min-h-[500px] "
      } `}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="h-full rounded md:rounded-none"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            style={{
              backgroundImage: `url(https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="h-full  flex items-center justify-center">
              {/* Add your content here if needed */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* <button
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 left-3 md:left-12 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
      >
        <IoIosArrowBack className="text-base" />
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 right-3 md:right-12 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
      >
        <IoIosArrowForward className="text-base" />
      </button> */}

      {/* Custom 3 Dot Pagination */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 z-10 -translate-x-1/2 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 cursor-pointer ${
              activeIndex === index
                ? "bg-white w-2 md:w-4 h-2 md:h-4 rounded-full scale-125 shadow-md "
                : "bg-transparent border border-white w-3 md:w-6 h-2 md:h-4 rounded-full hover:scale-110"
            }`}
            onClick={() => swiperRef.current.slideToLoop(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

const NewArrivalBanners = ({ isHomeArea = true }) => {
  const [loading, setLoading] = useState(false);
  const banners = useGetAllNewArrivalBanner({ setLoading });

  return loading ? (
    <SkeletonCarousel />
  ) : (
    <CustomCarousel slides={banners} isHomeArea={isHomeArea} />
  );
};

export default NewArrivalBanners;