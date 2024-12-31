// Docs : use the current product state and the function on parent component

// const [currentProduct, setCurrentProduct] = useState(null);
//   const handleProductClick = (product) => {
//     setCurrentProduct(product);
//     document.getElementById(`modal_${product.productTitle.replace(/\s+/g, '_')}`).showModal();
//   };

import { useState } from "react";
import Modal from "../../../shared/Modal/Modal";
const ProductCard = ({
  product, handleProductClick,isPopular=false, showDiscount = false,isSpecial=false,  showNewArrival = false, varient = "classic"
}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <div
      onClick={() => {
        handleProductClick(product);
        setIsShowModal(true);
      }}
      key={product._id}
      className="bg-white relative md:hover:scale-105 cursor-pointer overflow-hidden rounded-lg md:hover:shadow-lg transition-transform duration-300 "
    >
      {console.log("product", product)}
      {product.discount > 0 && showDiscount && (
        <span className="absolute z-10 left-2 top-2  md:top-5 md:left-5 bg-gray-800 text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
          {product.discount}% OFF
        </span>
      )}

      {showNewArrival && product.discount > 0 && (
        <span className="absolute z-10 left-2 top-7  md:top-12 md:left-5 bg-[#923670] text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
          New Arrival
        </span>
      )}
      {showNewArrival && !product.discount > 0 && (
        <span className="absolute z-10 left-2 top-2  md:top-5 md:left-5 bg-[#923670] text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
          New Arrival
        </span>
      )}
      {isPopular && product.discount > 0 && (
        <span className="absolute z-10 left-2 top-7  md:top-12 md:left-5 bg-blue-500 text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
          Popular now
        </span>
      )}
      {isPopular && !product.discount > 0 && (
        <span className="absolute z-10 left-2 top-2  md:top-5 md:left-5 bg-blue-500 text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
          Popular now
        </span>
      )}
      {isSpecial && product.discount && showDiscount > 0 && (
        <span className="absolute z-10 left-2 top-7  md:top-12 md:left-5 bg-blue-500 text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
          Special
        </span>
      )}
      {isSpecial && (!product.discount || !showDiscount) > 0 && (
        <span className="absolute z-10 left-2 top-2  md:top-5 md:left-5 bg-blue-500 text-white md:text-[10px] text-[10px] md:text-xs py-[2px] md:py-1 px-2 md:px-3 rounded-md">
          Special
        </span>
      )}

      <img
        src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${product.thumbnail}`}
        alt={product.productTitle}
        className="w-50 md:max-h-50 h-50 rounded object-cover transition-transform duration-300"
      />

      <div className="p-4">
        <h3 className="text-sm md:text-base font-semibold mb-1 block md:hidden">
          {product.productTitle.length > 12
            ? `${product.productTitle.slice(0, 12)}..`
            : product.productTitle}
        </h3>
        <h3 className="text-base font-semibold mb-2 md:block hidden">
          {product.productTitle}
        </h3>
        <p className=" text-gray-500 mb-1 text-xs lg:hidden">
          <div
            dangerouslySetInnerHTML={{
              __html: `${product.fullDescription.slice(0, 20)}...`,
            }}
          />
        </p>
        <p className=" text-gray-500 mb-2 hidden lg:block">
          <div
            dangerouslySetInnerHTML={{
              __html: `${product.fullDescription.slice(0, 40)}...`,
            }}
          />
        </p>
        <div className="flex  flex-col-reverse">
          <p className="text-sm md:text-lg font-semibold">BDT {product.price}.00</p>
          {product.discount > 0 ? <p className="text-xs md:text-base line-through opacity-60">BDT {(product.price - (product.price * product.discount / 100)).toFixed(2)}</p> : <p className="opacity-0">3</p>}
        </div>

        <Modal
          id={`modal_${product.productTitle.replace(/\s+/g, "_")}`}
          object_id={product._id}
          title={product.productTitle}
          sizes={product.productSizeValue}
          image={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${product.thumbnail}`}
          description={product.fullDescription}
          colors={product.colorAndSize}
          price={product.price}
          setIsShowModal={setIsShowModal}
          isShowModal={isShowModal}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductCard;
