import { useState } from 'react';
import useGetAllProducts from '../../../Hook/GetDataHook/useGetAllProducts';
import ProductCard from '../../partial/ProductCard/ProductCard';
import ProductSkeleton from '../../partial/ProductCard/ProductSkeleton';


const NewArrivals = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [query, setQuery] = useState("page=1&limit=10"); // Example query parameters

  const { products, totalItems, totalPages } = useGetAllProducts({
    isEdited,
    isDeleted,
    setLoading,
    query,
  });

  console.log(products)

  
  const handleProductClick = (product) => {
    setCurrentProduct(product);
    document.getElementById(`modal_${product.productTitle.replace(/\s+/g, '_')}`).showModal();
  };

  return (
    <section className="w-[90%] mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
      {
        loading ?
        <ProductSkeleton /> :
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {products.map((product, index) => (
            <ProductCard product={product} handleProductClick={handleProductClick}/>
          ))}
        </div>
      }
    </section>
  );
};

export default NewArrivals;
