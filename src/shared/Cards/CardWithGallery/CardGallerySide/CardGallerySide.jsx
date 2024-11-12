"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";

import CustomImage from "../../../ImageComponents/CustomImage";

export default function CardGallerySide({ gallery }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = [
    {
      image:
        "https://i.pinimg.com/564x/58/ac/ca/58acca94f0313e0f56c2b0aab45c9257.jpg",
      alt: "Image 1",
    },
    {
      image:
        "https://i.pinimg.com/736x/88/39/9d/88399dd0cf22868e42d67e9f712e9c3a.jpg",
      alt: "Image 2",
    },
    {
      image:
        "https://i.pinimg.com/564x/8a/fb/ff/8afbffd853cca7a3096c6d9a4ecde588.jpg",
      alt: "Image 2",
    },
  ];

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        zoom={true}
        modules={[FreeMode, Navigation, Thumbs, Zoom]}
        className="card_gallery"
      >
        {gallery &&
          gallery.length > 0 &&
          gallery.map((item, index) => (
            <SwiperSlide key={index}>
              <CustomImage
                imageKey={item?.image}
                alt={"image"}
                className="h-[350px] w-full object-cover"
                width={600}
                height={500}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="card_gallery"
      >
        {gallery &&
          gallery.length > 0 &&
          gallery.map((item, index) => (
            <SwiperSlide key={index}>
              <CustomImage
                imageKey={item.image}
                alt={"image"}
                className="h-[150px] w-full object-cover"
                width={600}
                height={500}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
