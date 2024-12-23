import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const carouselImages = [
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-2.jpg&w=1920&q=100',
    title: 'Up to 60% Off',
    subtitle: 'For All Travel Baggage',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-3.jpg&w=1920&q=100',
    title: 'Winter Collection',
    subtitle: '65% OFF',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
    title: 'Limited Time Offer',
    subtitle: 'Shop Now!',
  },
];

const Banner2 = () => {
  return (
    <div className="relative my-28 mx-auto max-w-[1920px] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        spaceBetween={20} // Space between slides
        slidesPerView={1.5} // Show 1.5 slides at a time
        centeredSlides={true} // Center the active slide
        loop={true} // Enable infinite scrolling
      >
        {carouselImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner2;
