import useGetAllBanners from "../../../Hook/GetPublicDataHook/useGetAllBanners";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const slides = [
  {
    id: 1,
    title: 'We Picked Every Item',
    description: 'Use this code to receive 50% discount off all products.',
    image: 'https://via.placeholder.com/400',
    bgColor: 'bg-orange-400',
  },
  {
    id: 2,
    title: 'Explore Our New Arrivals',
    description: 'Discover the latest trends at discounted prices.',
    image: 'https://via.placeholder.com/400',
    bgColor: 'bg-blue-200',
  },
  {
    id: 3,
    title: 'Limited Time Offers',
    description: 'Grab the best deals before they run out! So hurry up !',
    image: 'https://via.placeholder.com/400',
    bgColor: 'bg-green-300',
  },
];

const CustomCarousel = ({ slides }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      swiperInstance.on('slideChange', () => {
        setActiveIndex(swiperInstance.realIndex);
      });
    }
  }, []);

  return (  
    <div className="relative w-full h-[150px] md:h-[800px]">     
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
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            style={{
              backgroundImage: `url(https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${slide.image})`,
              backgroundSize: 'cover', // Ensures the image covers the slide
              backgroundPosition: 'center', // Centers the image
              backgroundRepeat: 'no-repeat', // Prevents tiling
            }}
          >
            <div className="h-full flex items-center justify-center">
              {/* Add your content here if needed */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Custom Navigation Buttons */}
      <button
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
      </button>

      {/* Custom 3 Dot Pagination */}
      <div className="absolute bottom-4 md:bottom-10 left-12 md:left-52 z-10 -translate-x-1/2 flex gap-2 md:gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={` h-2 md:h-4 rounded-full shadow-lg transition-all duration-300 cursor-pointer ${activeIndex === index
              ? 'bg-black w-4 md:w-7 scale-110 shadow-md'
              : 'bg-white w-2 md:w-4'
              }`}
            onClick={() => swiperRef.current.slideToLoop(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};


const Banner = () => {
  const banners = useGetAllBanners({});
  return (
    <CustomCarousel slides={banners} />
  );
};

export default Banner;
