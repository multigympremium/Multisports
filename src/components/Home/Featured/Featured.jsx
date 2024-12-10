const products = [
    {
        id: 1,
        name: "Nike Bag",
        description: "Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement.",
        price: "$16.38",
        originalPrice: "$20.38",
        discount: "20%",
        imageUrl: "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Ffeatured%2F1.png&w=640&q=75",
    },
    {
        id: 2,
        name: "Adidas Woolen Cap",
        description: "Casual wear (casual attire or clothing) may be a Western code that’s relaxed, occasional, spontaneous and fitted to everyday use.",
        price: "$16.00",
        originalPrice: "$20.00",
        discount: "20%",
        imageUrl: "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Ffeatured%2F2.png&w=640&q=75",
    },
    {
        id: 3,
        name: "Ray Ban Aviator",
        description: "Polarized sunglasses reduce glare reflected off of roads, bodies of water, snow and other horizontal surfaces.",
        price: "$720.00",
        originalPrice: "$850.00",
        discount: "15%",
        imageUrl: "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Ffeatured%2F4.png&w=640&q=75",
    },
    {
        id: 4,
        name: "Nike Leader VT",
        description: "Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment.",
        price: "$16.38",
        imageUrl: "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Ffeatured%2F3.png&w=640&q=75",
    },
    {
        id: 5,
        name: "Nike Leader VT",
        description: "Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment.",
        price: "$16.38",
        imageUrl: "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Ffeatured%2F5.png&w=384&q=75",
    },
];

const Featured = () => {
    return (
        <div className="md:p-6 py-6 px-5 md:w-[90%] mx-auto">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Product: Larger, occupies the full height of the left column */}
                <div className="bg-gray-50 p-4 flex flex-col justify-between rounded-lg shadow-sm relative">
                    <div></div>
                    {products[0].discount && (
                        <span className="absolute left-3 top-3  md:top-4 md:left-4 bg-gray-900 text-white text-[10px] md:text-sm py-1 px-2 md:px-3 rounded-md">
                            {products[0].discount}
                        </span>
                    )}
                    <img
                        src={products[0].imageUrl}
                        alt={products[0].name}
                        className="w-full cursor-pointer h-auto md:max-h-[600px] object-cover hover:scale-105 transition-transform duration-300 mb-4"
                    />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                        <div className="flex flex-col justify-end">
                            <h3 className="font-semibold md:text-base text-sm mb-2 hidden lg:block">{products[0].name}</h3>
                            <h3 className="font-semibold md:text-base text-sm md:mb-2 block md:hidden">{products[0].name.length > 12 ? `${products[0].name.slice(0, 12)}...` : products[0].name}                            </h3>
                            <p className="text-gray-500 md:text-sm text-xs line-clamp-2">
                                {products[0].description.slice(0, 40)}...
                            </p>
                            
                        </div>
                        <div className="flex items-end justify-between flex-row-reverse md:flex-col mt-2 md:mt-0 gap-2 md:gap-1">
                            <span className="text-gray-400 text-sm md:text-base   line-through">{products[0].originalPrice}</span>
                            <span className="md:text-lg text-sm font-semibold md:font-bold">{products[0].price}</span>
                        </div>
                    </div>
                </div>

                {/* Other Products: Arranged in a two-row grid */}
                <div className="grid grid-cols-2 gap-3  md:gap-6">
                    {products.slice(1, 5).map((product, index) => (
                        <div key={index} className="bg-gray-50 p-4 flex flex-col justify-between rounded-lg shadow-sm relative">
                            <div></div>
                            {product.discount && (
                                <span className="absolute left-3 top-3  md:top-4 md:left-4 bg-gray-900 text-white text-[10px] md:text-sm py-1 px-2 md:px-3 rounded-md">
                                    {product.discount}
                                </span>
                            )}
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full cursor-pointer md:h-48 object-cover hover:scale-105 transition-transform duration-300 mb-4"
                            />
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                                <div className="flex flex-col justify-end">
                                    <h3 className="font-semibold md:text-base text-sm mb-2 hidden md:block">{product.name}</h3>
                                    <h3 className="font-semibold md:text-base text-sm md:mb-2 block md:hidden">{product.name.slice(0, 12)}..</h3>
                                    <p className="text-gray-500 md:text-sm text-xs line-clamp-2 block md:hidden">
                                        {product.description.slice(0, 15)}...
                                    </p>
                                    <p className="text-gray-500 md:text-sm text-xs line-clamp-2 hidden md:block">
                                        {product.description.slice(0, 40)}...
                                    </p>
                                </div>
                                <div className="flex items-end justify-between flex-row-reverse md:flex-col mt-2 md:mt-0 gap-2 md:gap-1">
                                    <span className="text-gray-400 text-sm md:text-base   line-through">{product.originalPrice}</span>
                                    <span className="md:text-lg text-sm font-semibold md:font-bold">{product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;
