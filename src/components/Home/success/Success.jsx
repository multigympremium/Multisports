import { useContext } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import RelatedProducts from "../../partial/RelatedProducts/RelatedProducts";

export default function Success() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const category = location?.state?.category;

  console.log(location, "location");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <RelatedProducts category={category && category} />
        </div>
        <p className="mt-4 text-gray-600 text-xl mb-5">
          Your order has been placed successfully. Please check your email for
          the order details.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/">
            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Go to Home
            </button>
          </Link>

          <Link to={`/my-account/orders/${location?.state?.orderId}`}>
            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              See Order Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
