import { useEffect, useState } from "react";
import CustomImage from "../ImageComponents/CustomImage";
import { IoMdClose } from "react-icons/io";

const CartItemComponent = ({
  updateCartQuantity,
  item,
  removeFromCart,
  isCartArea = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => {
      console.log(prev, stock, prev <= stock, "currentItem");
      if (prev < stock) {
        updateCartQuantity(item._id, prev + 1, item.color, item.size);
        return prev + 1;
      }
      return prev;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        updateCartQuantity(item._id, prev - 1, item.color, item.size);
        return prev - 1;
      });
    }
  };

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  console.log(item, "item?.colorAndSize", item?.colorAndSize);

  useEffect(() => {
    const currentColorAndSize = item?.colorAndSize.find(
      (item2) => item2.color?.value === item.color
    );
    console.log(currentColorAndSize, "currentItem");

    if (currentColorAndSize) {
      console.log(
        currentColorAndSize.size.find((item2) => item2.value === item.size)
          .quantity,
        "currentItem size"
      );
      setStock(
        currentColorAndSize.size.find((item2) => item2.value === item.size)
          .quantity || 0
      );
    }
  }, [item?.colorAndSize, item.color, item.size]);

  console.log(stock, "currentItem stock");

  return (
    <div>
      {isCartArea ? (
        <div>
          <div className="flex mb-4 relative  rounded-md p-2">
            <div className="max-w-[100px] w-full">
              <CustomImage
                imageKey={item.thumbnail}
                alt="Product Card"
                className="w-[100px] rounded object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="flex w-full ml-4 ">
              <div>
                <div className="flex flex-col ">
                  <span className=" text-black">{item.productTitle}</span>
                  <span className=" text-gray-500">
                    Unit price : <span className="text-xl font-bold">৳</span>
                    {item.price}
                  </span>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      style={{ backgroundColor: item.color }}
                      className={`md:w-8 md:h-8 w-7 h-7 rounded-md`}
                    ></button>
                    <button
                      className={`md:w-8 md:h-8 w-7 h-7 rounded-md border`}
                    >
                      {item.size}
                    </button>
                    <div
                      className={`flex items-center  rounded-md border max-w-min`}
                    >
                      <button
                        className="px-2 py-1 "
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>
                      <span className="px-4 border-x-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 "
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-2 flex flex-col justify-end">
              <p className="font-semibold text-lg px-2 flex items-end gap-1 ml-auto">
                <span className="text-2xl font-bold">৳ </span>
                {item?.price * quantity}
              </p>
            </div>
            <button
              className="absolute top-3  right-1"
              onClick={() => removeFromCart(item._id, item.color, item.size)}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4 relative border rounded-md p-2">
            <div className="max-w-[100px] w-full">
              <CustomImage
                imageKey={item.thumbnail}
                alt="Product Card"
                className="w-[100px] object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="flex w-full ml-4 ">
              <div>
                <div className="flex gap-3 flex-wrap flex-col ">
                  <span className="font-bold text-black">
                    {item.productTitle}
                  </span>
                  <div className="flex space-x-2">
                    <span
                      className="font-bold text-black w-6 h-6 rounded-sm"
                      style={{ background: item.color }}
                    ></span>
                    <span className="font-bold text-black w-6 h-6 rounded-sm border text-center">
                      {item.size}
                    </span>
                  </div>
                </div>

                {!isCartArea && (
                  <>
                    {item?.shortDescription &&
                    (item?.shortDescription?.length > 100) &
                      (item?.shortDescription?.length < 200) ? (
                      <p
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: item?.shortDescription?.slice(0, 100) + "...",
                        }}
                      />
                    ) : (
                      <p
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: item?.shortDescription,
                        }}
                      />
                    )}
                  </>
                )}
              </div>

              <div
                className={`flex items-center mt-2 ${
                  !isCartArea ? "ml-14" : "ml-4"
                }`}
              >
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => decreaseQuantity(item)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => increaseQuantity(item)}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              {item?.actualPrice && (
                <p className="text-xs md:text-base line-through opacity-60">
                  {item.actualPrice * quantity}
                </p>
              )}
              <p className="font-bold text-lg ml-auto">
                {item?.price * quantity}
              </p>
            </div>
            <button
              className="absolute top-1 right-1"
              onClick={() => removeFromCart(item._id, item.color, item.size)}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemComponent;
