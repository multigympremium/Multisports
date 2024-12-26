
// Docs : use the current product state and the function on parent component


// const [currentProduct, setCurrentProduct] = useState(null);
//   const handleProductClick = (product) => {
//     setCurrentProduct(product);
//     document.getElementById(`modal_${product.productTitle.replace(/\s+/g, '_')}`).showModal();
//   };

import Modal from "../../../shared/Modal/Modal";
const ProductCard = ({ product, handleProductClick, varient = "classic" }) => {

    return (
        <div
            onClick={() => handleProductClick(product)}
            key={product._id}
            className="bg-white cursor-pointer overflow-hidden rounded-lg md:hover:shadow-lg transition-transform duration-300 md:hover:scale-100"
        >
            {console.log("product", product)}
            <img
                src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${product.thumbnail}`}
                alt={product.productTitle}
                className="w-50 h-50 rounded object-cover transition-transform duration-300 hover:scale-105"
            />

            <div className="p-4">
                <h3 className="text-sm font-semibold mb-1 block md:hidden">
                    {product.productTitle.length > 12 ? `${product.productTitle.slice(0, 12)}..` : product.productTitle}
                </h3>
                <h3 className="text-sm font-semibold mb-2 md:block hidden">{product.productTitle}</h3>
                <p className="text-xs text-gray-500 mb-1 lg:hidden">
                    <div dangerouslySetInnerHTML={{ __html: `${product.fullDescription.slice(0, 17)}...` }} />
                    ...
                </p>
                <p className="text-xs text-gray-500 mb-2 hidden lg:block">
                    <div dangerouslySetInnerHTML={{ __html: `${product.fullDescription.slice(0, 40)}...` }} />
                </p>
                <p className="text-sm font-bold">BDT {product.price}</p>
                <Modal
                    id={`modal_${product.productTitle.replace(/\s+/g, '_')}`}
                    object_id={product._id}
                    title={product.productTitle}
                    sizes={product.productSizeValue}
                    image={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${product.thumbnail}`}
                    description={product.fullDescription}
                    colors={product.productColorValue}
                    price={product.price}
                />
            </div>
        </div>
    );
};

export default ProductCard;