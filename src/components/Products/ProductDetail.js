"use client"
import useAxiosPublic from '@/Hook/useAxiosPublic';
import React, { useContext, useEffect, useState } from 'react';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import CustomImage from '../shared/ImageComponents/CustomImage';
import { AuthContext } from '@/providers/AuthProvider';
import ActiveDescBtn from '../dashboard/ManageProduct/productSharedComponents/ActiveDescBtn';
const ProductDetail = ({targetId, isShowDetail}) => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail || "");
  const axiosPublic = useAxiosPublic()
  const { cartItems, removeFromCart, addToCart , updateCartQuantity, totalPrice } =
    useContext(AuthContext);

    const [activeDescription, setActiveDescription] = useState("full_desc");


  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => {
      if(cartItems.map(item => item._id).includes(targetId)){
        updateCartQuantity(targetId, prev + 1);
      }else {
        addToCart(product);
      }
      return prev + 1;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        if(cartItems.map(item => item._id).includes(product?._id)){

          updateCartQuantity(targetId, prev - 1);
        }
        return prev - 1;
      });
    }
  };

  useEffect(()=> {
    const fetchSingleProduct = async () => {
      try {
        const res = await axiosPublic.get(`/products/${targetId}`);
        console.log(res.data.data, "res.data.data");
        setProduct(res.data.data);
        setSelectedImage(`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${res?.data?.data?.gallery[0]?.image}` );
      } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Failed to fetch product");
      }
    };

    if(targetId){

      fetchSingleProduct();
    }

  },[ targetId, isShowDetail, axiosPublic])

  

  return (
    <div className="w-full max-w-[60%] max-h-screen overflow-auto mx-auto py-8 px-4 bg-white shadow-md rounded-md" style={{scrollbarWidth: "thin"}}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Images */}
        <div className='relative'>


          
<div className='flex justify-center items-center'>

<InnerImageZoom src={selectedImage} zoomSrc={selectedImage}
  width={450}
  hasSpacer={true} />
</div>
          <div className="flex mt-4 space-x-4">
            {product?.gallery?.length > 0 && product?.gallery.map((image, index) => (
              <div key={index} onClick={() => setSelectedImage(`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${image.image}` )}>

                <CustomImage
                imageKey={image.image}
                width={200}
                height={200}
                  
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  className={`w-20 h-20 cursor-pointer border-2 ${
                    selectedImage === image ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product?.productTitle}</h1>
          <p className="text-xl font-semibold text-green-600 mb-2">৳{product?.price}</p>
          <p className="text-sm text-gray-400 font-normal mb-6">SKU: BPO644WKK8</p>
          <p className="text-sm mb-4">Color:  {
          product?.productColorValue &&  product?.productColorValue.map((item, index)=> (

            <span className="h-3 w-10 rounded inline-block" key={index} style={{background: item}}></span>
          ))
          } 
          </p>
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">Size: </p>
            <div className="flex space-x-4">
            { product?.productSizeValue && product?.productSizeValue.map((item, index) => (
              <button className="px-4 py-2 border-2 rounded-md border-gray-300" key={index}>{item}</button>
            ))}
            
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">In Stock: {product?.stock}</p>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <p className="text-sm font-bold">Quantity:</p>
            <div className={`flex items-center mt-2 `}>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => decreaseQuantity(product._id)}
          >
            -
          </button>
          <span className="mx-2">{cartItems && cartItems.find(item => item._id === targetId)?.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => increaseQuantity(product._id)}
          >
            +
          </button>
        </div>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gray-700 text-white px-6 py-3 rounded-md" onClick={()=> addToCart(product)}>Add to Cart</button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-md">Buy Now</button>
          </div>
        </div>
      </div>

      <div className={"flex items-center gap-6 mb-5 mt-12"}>
            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="short_desc"
              btnName="Short Description"
            />

            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="full_desc"
              btnName="Full Description"
            />
            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="specifications"
              btnName="Specifications"
            />
            <ActiveDescBtn
              activeDescription={activeDescription}
              setActiveDescription={setActiveDescription}
              desc_name="return_policy"
              btnName="Return Policy"
            />
          </div>


    {/* Short Description */}
    {activeDescription === "short_desc" && (
            <div className="mb-[4rem]">
              
              <p
            className="text-sm text-gray-400 font-normal"
            dangerouslySetInnerHTML={{ __html: product?.shortDescription }}
          />

              
            </div>
          )}

          {/* Full Description */}
          {activeDescription === "full_desc" && (
            <div className="mb-[4rem]">
              
              <p
            className="text-sm text-gray-400 font-normal"
            dangerouslySetInnerHTML={{ __html: product?.fullDescription }}
          />
              
            </div>
          )}
          {/* Full Description */}
          {activeDescription === "specifications" && (
            <div className="mb-[4rem]">
              
              <p
            className="text-sm text-gray-400 font-normal"
            dangerouslySetInnerHTML={{ __html: product?.specifications }}
          />
             
            </div>
          )}
          {/* Full Description */}
          {activeDescription === "return_policy" && (
            <div className="mb-[4rem]">
              
              <p
            className="text-sm text-gray-400 font-normal"
            dangerouslySetInnerHTML={{ __html: product?.return_policy }}
          />
            </div>
          )}


    </div>
  );
};

export default ProductDetail;
