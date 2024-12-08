import React from "react";

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
];

const Featured = () => {
    return (
        <div className="p-6 w-[90%] mx-auto">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Product: Takes the first grid column */}
                <div className="bg-gray-50 p-4 flex flex-col justify-between rounded-lg shadow-sm relative">
                    {products[0].discount && (
                        <span className="absolute top-7 left-7 bg-black text-white text-sm py-1 px-3 rounded">
                            {products[0].discount}
                        </span>
                    )}
                    <img
                        src={products[0].imageUrl}
                        alt={products[0].name}
                        className="w-full hover:scale-110 transition-all duration-300 object-contain mb-4"
                    />
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold mb-2">{products[0].name}</h3>
                            <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                                {products[0].description.slice(0, 40)}...
                            </p>
                        </div>
                        <div className="flex items-center flex-col gap-2">
                            <span className="text-gray-400 line-through">{products[0].originalPrice}</span>
                            <span className="text-xl font-bold">{products[0].price}</span>
                        </div>
                    </div>
                </div>

                {/* Second Grid Column: Contains the other three products */}
                <div className="grid grid-cols-2 grid-rows-2 gap-6">
                    <div className="flex flex-col gap-6">
                        {/* Second Product */}
                        <div className="bg-slate-50 p-4 rounded-lg shadow-sm relative">
                            {products[1].discount && (
                                <span className="absolute top-7 left-7 bg-black text-white text-sm py-1 px-3 rounded">
                                    {products[1].discount}
                                </span>
                            )}
                            <img
                                src={products[1].imageUrl}
                                alt={products[1].name}
                                className="w-full hover:scale-110 transition-all duration-300 object-contain mb-4"
                            />
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="font-semibold mb-2">{products[1].name}</h3>
                                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                                        {products[1].description.slice(0, 40)}...
                                    </p>
                                </div>
                                <div className="flex items-center flex-col gap-2">
                                    <span className="text-gray-400 line-through">{products[1].originalPrice}</span>
                                    <span className="text-lg font-bold">{products[1].price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Third Product */}
                        <div className="bg-slate-50 p-4 rounded-lg shadow-sm relative">
                            {products[2].discount && (
                                <span className="absolute top-7 left-7 bg-black text-white text-sm py-1 px-3 rounded">
                                    {products[2].discount}
                                </span>
                            )}
                            <img
                                src={products[2].imageUrl}
                                alt={products[2].name}
                                className="w-full  hover:scale-110 transition-all duration-300 object-contain mb-4"
                            />
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="font-semibold mb-2">{products[2].name}</h3>
                                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                                        {products[2].description.slice(0, 40)}...
                                    </p>
                                </div>
                                <div className="flex items-center flex-col gap-2">
                                    <span className="text-gray-400 line-through">{products[2].originalPrice}</span>
                                    <span className="text-lg font-bold">{products[2].price}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fourth Product: Spans the full width of the second grid */}
                    <div className=" bg-slate-50 p-4 flex flex-col justify-between rounded-lg shadow-sm relative">
                        <div>

                        </div>
                        <img
                            src={products[3].imageUrl}
                            alt={products[3].name}
                            className="w-full  hover:scale-110 transition-all duration-300 object-contain mb-4"
                        />

                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="font-semibold mb-2">{products[3].name}</h3>
                                <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                                    {products[3].description.slice(0, 40)}...
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{products[3].price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Featured;
