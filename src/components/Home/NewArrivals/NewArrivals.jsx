import React from 'react';

const products = [
  {         
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F1.jpg&w=384&q=100',
    title: 'Roadster Women Round Neck',
    price: '$18.59',
    description: 'This Roadster Women Round Neck T-shirt is crafted with premium fabric. It offers a relaxed fit, making it perfect for casual wear and outings. Available in various sizes and colors to suit your style.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F2.jpg&w=384&q=100',
    title: 'Classic White Tee',
    price: '$15.99',
    description: 'The Classic White Tee is a wardrobe essential. Made from soft, breathable cotton, this tee pairs effortlessly with jeans or shorts. Durable stitching ensures long-lasting wear.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F3.jpg&w=384&q=100',
    title: 'Floral Print Shirt',
    price: '$22.49',
    description: 'This Floral Print Shirt adds a touch of elegance to your outfit. Featuring a bold floral pattern, it’s perfect for both formal and semi-formal occasions.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F4.jpg&w=384&q=100',
    title: 'Cozy Winter Coat',
    price: '$79.99',
    description: 'Stay warm and stylish with this Cozy Winter Coat. Made with high-quality materials, it provides excellent insulation against cold weather while maintaining a chic look.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F5.jpg&w=384&q=100',
    title: 'Leather Jacket',
    price: '$89.99',
    description: 'This Leather Jacket offers a sleek, edgy look. Crafted from genuine leather, it’s designed for durability and style. Perfect for adding a bold statement to your outfit.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F6.jpg&w=384&q=100',
    title: 'Straw Hat with Ribbon',
    price: '$14.99',
    description: 'The Straw Hat with Ribbon is the perfect summer accessory. It provides shade and style, making it great for beach trips, picnics, and outdoor events.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F7.jpg&w=384&q=100',
    title: 'Green Floral Dress',
    price: '$34.99',
    description: 'This Green Floral Dress combines comfort and style. Its flowy design and floral pattern make it ideal for warm weather and casual outings.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F8.jpg&w=384&q=100',
    title: 'Plaid Flannel Shirt',
    price: '$24.99',
    description: 'The Plaid Flannel Shirt offers a classic, rugged style. Made from soft, warm fabric, it’s perfect for layering in cooler weather.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F9.jpg&w=384&q=100',
    title: 'Fedora Hat',
    price: '$19.99',
    description: 'The Fedora Hat is a timeless accessory. Its versatile design makes it suitable for both casual and formal occasions.',
  },
  {
    image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fancient%2F10.jpg&w=384&q=100',
    title: 'Sunglasses with Style',
    price: '$12.99',
    description: 'These Sunglasses with Style provide UV protection and a fashionable look. Perfect for sunny days and outdoor adventures.',
  },
];



const NewArrivals = () => {
    console.log("products :" ,products)
  return (
    <section className="w-[90%] mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">New Arrivals </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
        {products.map((product, index) => (
          <div
          key={index}
          className="bg-white overflow-hidden rounded-lg  md:hover:shadow-lg transition-transform duration-300 md:hover:scale-100"
        >
          <img
            src={product.image} 
            alt={product.title}
            className="w-full rounded md:h-80 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-1 block md:hidden">{product.title.length>12?`${product.title.slice(0,12)}..` : product.title}</h3>
            <h3 className="text-sm font-semibold mb-2 md:block hidden">{product.title}</h3>
            <p className="text-xs text-gray-500 mb-1 lg:hidden">
              {product.description.slice(0, 17)}...
            </p>
            <p className="text-xs text-gray-500 mb-2 hidden lg:block">
              {product.description.slice(0, 36)}...
            </p>
            <p className="text-sm font-bold">{product.price}</p>
          </div>
        </div>
        
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
