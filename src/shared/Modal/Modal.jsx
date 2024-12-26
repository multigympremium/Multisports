import { Link } from "react-router-dom";

const Modal = ({ id, title,object_id, price, description, image, sizes, colors }) => {
  return (
    <dialog id={id} className="modal">
      <div className=" modal-box p-0 rounded max-w-4xl w-[90%] mx-auto md:w-full flex flex-col md:flex-row">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute focus:outline-none right-2 top-2">✕</button>
        </form>

        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 px-4 py-4 md:p-6 flex flex-col justify-between">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-500 mb-2 text-xs md:text-sm"><div dangerouslySetInnerHTML={{ __html: description }} /></p>
          
          <div className="text-xl md:text-2xl font-semibold mb-4">BDT {price}.00</div>

          {/* Size Options */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className="border text-xs md:text-sm shadow-sm w-7 h-7 md:w-10 md:h-10 hover:border-gray-500 duration-300 ease-in-out rounded-lg"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Color {colors.length}</h3>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <div key={index} className='border flex items-center border-gray-100 duration-300 ease-in-out  hover:border-gray-400 justify-center p-[3px] md:p-1 rounded-md'>
                  <button style={{ backgroundColor: color }} className={`md:w-8 md:h-8 w-7 h-7 rounded-md`}></button>
                </div>
              ))}
            </div>
          </div>

          <div className='flex md:block '>
            {/* Quantity and Actions */}
            <div className="flex flex-row w-full items-center gap-4 mb-4">
              <div className="flex items-center border rounded-lg">
                <button className="w-7 text-center py-2 md:h-11">-</button>
                <span className="w-10 border-x text-center">3</span>
                <button className="w-7">+</button>
              </div>
              <button className="md:py-3 py-2 rounded-lg text-sm md:text-base font-semibold bg-black text-white w-full md:flex-1">
                Add To Cart
              </button>
            </div>
          </div>

          <Link to={`product_details/${object_id}`}>
            <button className="md:py-3 font-semibold text-sm py-2 md:text-base rounded-lg text-white w-full  bg-black">View Details</button>
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
