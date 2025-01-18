import { useState } from "react";
import Modal from "../../../shared/Modal/Modal";
import WishlistIcon from "../../../shared/Cards/Wishlist/WishlistIcon";

const ProductCard = ({
  border = false,
  product,
  handleProductClick,
  isPopular = false,
  showDiscount = false,
  isSpecial = false,
  showNewArrival = false,
  varient = "classic",
}) => {
  const [isShowModal, setIsShowModal] = useState(false);

  // Helper function to render product badges
  const renderBadge = (condition, label, bgColor) => {
    if (!condition) return null;
    return (
      <span
        className={`absolute z-10 left-2 ${bgColor} text-white md:text-xs text-[10px] py-[2px] md:py-1 px-2 md:px-3 rounded-md`}
      >
        {label}
      </span>
    );
  };

  const handleClick = () => {
    handleProductClick(product);
    setIsShowModal(true);
  };

  const getDiscountedPrice = () => {
    if (product.discount > 0) {
      return (product.price - (product.price * product.discount) / 100).toFixed(
        2
      );
    }
    return null;
  };

  return (
    <div
      key={product._id}
      className={`bg-white relative md:hover:scale-105 cursor-pointer overflow-hidden rounded-lg md:hover:shadow-lg transition-transform duration-300 ${
        border && "border"
      }`}
    >
      {/* Badges */}
      {renderBadge(
        showDiscount && product.discount > 0,
        `${product.discount}% OFF`,
        "bg-gray-800 top-2 md:top-5 md:left-5"
      )}
      {renderBadge(
        showNewArrival,
        "New Arrival",
        "bg-[#923670] top-7 md:top-12 md:left-5"
      )}
      {renderBadge(
        isPopular,
        "Popular now",
        "bg-blue-500 top-7 md:top-12 md:left-5"
      )}
      {renderBadge(
        isSpecial,
        "Special",
        "bg-blue-500 top-7 md:top-12 md:left-5"
      )}

      {/* Product Image */}
      <img
        src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${product.thumbnail}`}
        alt={product.productTitle}
        className="h-[170px] md:h-[340px] w-full rounded object-cover transition-transform duration-300"
      />
      <WishlistIcon item={product} />

      {/* Product Details */}
      <div className="p-4" onClick={handleClick}>
        <h3 className="text-sm md:text-base font-semibold mb-1 block md:hidden">
          {product.productTitle?.length > 12
            ? `${product.productTitle.slice(0, 12)}..`
            : product.productTitle}
        </h3>
        <h3 className="text-base font-semibold mb-2 hidden md:block">
          {product.productTitle}
        </h3>

        {/* Description */}
        <p className="text-gray-500 mb-1 text-xs lg:hidden">
          <div
            dangerouslySetInnerHTML={{
              __html: `${product.fullDescription.slice(0, 20)}...`,
            }}
          />
        </p>
        <p className="text-gray-500 mb-2 hidden lg:block">
          <div
            dangerouslySetInnerHTML={{
              __html: `${product.fullDescription.slice(0, 40)}...`,
            }}
          />
        </p>

        {/* Price */}
        <div className="flex flex-col-reverse">
          <p className="text-xs md:text-base line-through opacity-60">
            BDT {product.price}.00
          </p>
          {product.discount > 0 ? (
            <p className="text-sm md:text-lg font-semibold">
              BDT {getDiscountedPrice()}
            </p>
          ) : (
            <p className="opacity-0">3</p>
          )}
        </div>

        {/* Modal */}
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
