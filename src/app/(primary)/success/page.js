import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className=" text-green-300  border-solid rounded-full h-16 w-16 ">
          <FaCircleCheck size={60} />
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          Your order has been placed successfully
        </p>
        <Link href="/">
          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Go to Shop
          </button>
        </Link>
      </div>
    </div>
  );
}
