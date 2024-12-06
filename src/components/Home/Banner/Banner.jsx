import React from "react";
import { SwiperSlide } from "swiper/react";
import useGetAllBanners from "../../../Hook/GetPublicDataHook/useGetAllBanners";
import CustomImage from "../../../shared/ImageComponents/CustomImage";


const Banner = () => {
  const banners = useGetAllBanners({});

  return (
    // <Carousel
    //   className="home_banner"
    //   loop={true}
    //   autoplay={{
    //     delay: 3000,
    //     disableOnInteraction: false,
    //   }}
    //   navigation={true}
    //   pagination={{
    //     clickable: true,
    //   }}
    // >
    //   {banners?.length > 0 &&
    //     banners.map((banner, index) => (
    //       <SwiperSlide key={index}>
    //         <div className="w-full h-[85dvh]">
    //           <CustomImage
    //             width={1200}
    //             height={600}
    //             imageKey={banner.image}
    //             alt=""
    //             className="h-full w-full object-cover object-center"
    //           />
    //         </div>
    //       </SwiperSlide>
    //     ))}
    // </Carousel>
    <p>hi</p>
  );
};

export default Banner;
