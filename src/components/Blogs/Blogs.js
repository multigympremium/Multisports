"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "next/link";
import axios from "axios";
import Image from "next/image";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          "https://multigympremium.com/news/get-all/"
        );
        const newData = response.data;
        setBlogData(newData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  return (
    <section className="bg-primary-300 text-white py-24" id="blog">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center">OUR NEWS</h2>
        <h4 className="text-center text-sm text-gray-500 mb-6">
          LATEST BLOG POSTS
        </h4>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3 },
                1400: { slidesPerView: 4 },
              }}
              className="h-[420px] md:max-w-[660px] lg:max-w-none mb-8"
            >
              {blogData
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col justify-start h-full max-w-[320px] mx-auto">
                      <Link href={`/blog/${post._id}`}>
                        <Image
                          width={400}
                          height={300}
                          src={post.image}
                          alt={post.title}
                          className="mb-6 h-64 w-84"
                        />
                      </Link>
                      <div className="flex flex-col items-start">
                        <p className="max-w-[380px] uppercase text-[12px] tracking-[3px] mb-1">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <Link
                          className="hover:text-accent transition-all duration-300"
                          href={`/blog/${post._id}`}
                        >
                          <h5 className="h5">{post.title}</h5>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            <Link href="/blog">
              <button className="absolute top-0 right-0 z-50 bg-accent text-white w-[56px] h-[56px] flex justify-center items-center hover:bg-accent transition-all duration-300">
                View all
              </button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Blogs;
