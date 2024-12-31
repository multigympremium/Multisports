import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useGetAllShoesBanners from '../../../Hook/GetPublicDataHook/useGetAllShoesBanners';
import { useState } from 'react';
import { baseImageUrl } from '../../../apis/apis';

const Banner2 = () => {
  const [loading, setLoading] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const shoes = useGetAllShoesBanners({
    setLoading, isShowModal, isEdited, isDeleted
  });
  return (
    <div className="relative my-28 mx-auto md:max-w-[1920px] overflow-hidden">
      {
        !loading &&
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
          centeredSlidesBounds={true} // Ensure centered slides are fully visible
          loop={true} // Enable infinite scrolling
        >
          {shoes.map((slide, index) => (
            <SwiperSlide key={index}>
              {console.log(slide)}
              <div className="relative md:h-[400px]">
                <img
                  // src={slide.image}
                  src={`${baseImageUrl}/${slide?.image}`}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      }
    </div>
  );
};

export default Banner2;


