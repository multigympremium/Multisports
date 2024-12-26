import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRef } from 'react';

const products = [
  {
    id: 1,
    name: 'Sunglasses',
    description: 'Stylish sunglasses for your daily look. These sunglasses will protect your eyes from harmful UV rays.',
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-27-md.png&w=384&q=100',
    price: '$19.99',
    oldPrice: '$25.99',
  },
  {
    id: 2,
    name: 'Sneakers',
    description: 'Comfortable sneakers for everyday wear.',
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-24-md.png&w=384&q=100',
    price: '$49.99',
    oldPrice: '$60.00',
  },
  {
    id: 3,
    name: 'Watch',
    description: 'Elegant watch to complete your outfit.',
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-30-md.png&w=384&q=100',
    price: '$99.99',
    oldPrice: '$120.00',
  },
  {
    id: 4,
    name: 'Shoes',
    description: 'Stylish shoes for formal occasions.',
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-26-md.png&w=384&q=100',
    price: '$39.99',
    oldPrice: '$55.00',
  },
  {
    id: 5,
    name: 'Winter Outfit',
    description: 'Cozy winter outfit for the cold season.',
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-16-md.png&w=384&q=100',
    price: '$79.99',
    oldPrice: '$99.99',
  },
  {
    id: 6,
    name: 'Shoes',
    description: 'Casual shoes for your weekend outings.',
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3.png&w=384&q=100',
    price: '$29.99',
    oldPrice: '$40.00',
  },
  {
    id: 7,
    name: 'Sunglasses',
    description: 'Protect your eyes with these trendy sunglasses.',
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-12-md.png&w=384&q=100',
    price: '$15.99',
    oldPrice: '$22.00',
  },
];

const FlashSale = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative mx-auto w-[90%] md:w-full">
      <h2 className="text-xl md:text-2xl font-semibold md:font-bold mb-4 md:mb-6 pl-1 md:pl-4">Flash Sale</h2>

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
            1024: { slidesPerView: 5 },
          }}
          loop={true}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-lg px-2 md:px-4">
                <div className="relative w-full aspect-square mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-sm md:text-base  md:mb-2">{product.name}</h3>
                <p className="text-sm hidden md:block text-gray-600 mb-2">
                  {product.description.length > 30
                    ? `${product.description.slice(0, 30)}...`
                    : product.description}
                </p>
                <p className="text-xs block md:hidden text-gray-600 mb-2">
                  {product.description.length > 17
                    ? `${product.description.slice(0, 17)}...`
                    : product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-lg font-semibold md:font-bold">{product.price}</span>
                  <span className="text-xs md:text-sm line-through text-gray-400">{product.oldPrice}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons Centered Relative to Image Div */}
        <button
          ref={prevRef}
          className="absolute top-1/3 -left-2 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
        >
          <IoIosArrowBack className="text-base" />
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/3 -right-2 transform -translate-y-1/2 w-7 h-7 md:w-11 md:h-11 flex items-center justify-center bg-white text-black rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:text-white hover:scale-110 hover:shadow-2xl z-10"
        >
          <IoIosArrowForward className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default FlashSale;
