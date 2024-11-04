"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import ProductCard from "../shared/Cards/ProductCard/ProductCard";
import Link from "next/link";
import Image from "next/image";
const products = [
  {
    id: 1,
    title: "Womens Chino Pant",
    price: 1250,
    discount: 0,
    old_price: 1250,
    image:
      "https://seeklogo.com/images/N/nike-logo-47A65A59D5-seeklogo.com.png",
    is_new: true,
  },
  {
    id: 2,
    title: "Womens Pajama",
    price: 693,
    discount: 1297,
    old_price: 1990,
    image:
      "https://seeklogo.com/images/A/adidas-logo-107B082DA0-seeklogo.com.png",
    is_new: false,
  },
  {
    id: 3,
    title: "Womens Pajama",
    price: 693,
    discount: 1297,
    old_price: 1990,
    image:
      "https://seeklogo.com/images/N/nike-logo-0FBAF72D4F-seeklogo.com.png",
    is_new: false,
  },
  {
    id: 4,
    title: "Womens Chino Pant",
    price: 1250,
    discount: 0,
    old_price: 1250,
    image:
      "https://seeklogo.com/images/F/FILA-logo-CF50EB6A11-seeklogo.com.png",
    is_new: true,
  },
  {
    id: 5,
    title: "Womens Ethnic 3pcs",
    price: 2555,
    discount: 1025,
    old_price: 3580,
    image:
      "https://seeklogo.com/images/N/new-york-yankees-logo-766DC138B6-seeklogo.com.png",
    is_new: false,
  },
  {
    id: 6,
    title: "Womens Kaftan",
    price: 1813,
    discount: 7777,
    old_price: 9590,
    image:
      "https://seeklogo.com/images/V/Vans-logo-58DBFD3A82-seeklogo.com.png",
    is_new: false,
  },
  {
    id: 7,
    title: "Womens Ethnic 3pcs",
    price: 2555,
    discount: 1025,
    old_price: 3580,
    image:
      "https://seeklogo.com/images/R/River_Plate_escudo-logo-EE400D17CA-seeklogo.com.png",
    is_new: false,
  },
];
function LogoArea() {
  return (
    <div className="container mx-auto mt-16 mb-10">
      <Swiper
        slidesPerView={3}
        breakpoints={{
          // when window width is <= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is <= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          // when window width is <= 1024px
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          // when window width is <= 1280px
          1280: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="brand"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`#`}
              className="flex justify-center items-center h-[250px]"
            >
              <Image
                width={400}
                height={300}
                src={product.image}
                alt={product.title}
                className="mix-blend-multiply object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
        {products.map((product) => (
          <NewArrivalProductCard product={product} key={product.id} />
        ))}
      </div> */}
    </div>
  );
}

export default LogoArea;
