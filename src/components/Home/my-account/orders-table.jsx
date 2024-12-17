import { motion } from "framer-motion";
import { useSsrCompatible } from "../../../Hook/use-ssr-compatible";
import useWindowSize from "react-use/lib/useWindowSize";
import { fadeInTop } from "../../utils/motion/fade-in-top";
import { Link } from "react-router-dom";

const OrdersTable = () => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });

  console.log(width, "width  order 3434");

  return (
    <div className="w-full flex flex-col px-5">
      <h2 className="mb-6 text-lg font-bold md:text-xl xl:text-2xl text-heading xl:mb-8">
        Order
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex flex-col`}
      >
        {width >= 1025 ? (
          <table>
            <thead className="text-sm lg:text-base">
              <tr>
                <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
                  Order
                </th>
                <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right lg:text-center">
                  Date
                </th>
                <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right lg:text-center">
                  Status
                </th>
                <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right lg:text-center">
                  Total
                </th>
                <th className="p-4 font-semibold bg-gray-100 text-heading ltr:text-left rtl:text-right ltr:lg:text-right rtl:lg:text-left ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm lg:text-base">
              <tr className="border-b border-gray-300 last:border-b-0">
                <td className="px-4 py-5 ltr:text-left rtl:text-right">
                  <Link
                    href="/my-account/orders/3203"
                    className="underline hover:no-underline text-body"
                  >
                    #3203
                  </Link>
                </td>
                <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                  March 18, 2021
                </td>
                <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                  Completed
                </td>
                <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                  $16,950.00 for 93 items
                </td>
                <td className="px-4 py-5 ltr:text-right rtl:text-left text-heading">
                  <Link
                    href="/my-account/orders/3203"
                    className="text-sm leading-4 bg-gray-200 text-black  px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-gray-300 last:border-b-0">
                <td className="px-4 py-5 ltr:text-left rtl:text-right">
                  <Link
                    href="/my-account/orders/3204"
                    className="underline hover:no-underline text-body"
                  >
                    #3204
                  </Link>
                </td>
                <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                  March 18, 2021
                </td>
                <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                  Completed
                </td>
                <td className="px-4 py-5 ltr:text-left rtl:text-right lg:text-center text-heading">
                  $16,950.00 for 93 items
                </td>
                <td className="px-4 py-5 ltr:text-right rtl:text-left text-heading">
                  <Link
                    href="/my-account/orders/3204"
                    className="text-sm leading-4 bg-gray-200 text-black  px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
              3
            </tbody>
          </table>
        ) : (
          <div className="w-full space-y-4">
            <ul className="flex flex-col px-4 pt-5 pb-6 space-y-5 text-sm font-semibold border border-gray-300 rounded-md text-heading">
              <li className="flex items-center justify-between">
                Order
                <span className="font-normal">
                  <Link
                    href="/my-account/orders/3203"
                    className="underline hover:no-underline text-body"
                  >
                    #3203
                  </Link>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">March 18, 2021</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">Completed</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">$16,950.00 for 93 items</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">
                  <Link
                    href="/my-account/orders/3203"
                    className="text-sm leading-4 bg-gray-200 text-black   px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    View
                  </Link>
                </span>
              </li>
            </ul>
            <ul className="flex flex-col px-4 pt-5 pb-6 space-y-5 text-sm font-semibold border border-gray-300 rounded-md text-heading">
              <li className="flex items-center justify-between">
                <span className="font-normal">
                  <Link
                    href="/my-account/orders/3204"
                    className="underline hover:no-underline text-body"
                  >
                    #3204
                  </Link>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">March 18, 2021</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">Completed</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">$16,950.00 for 93 items</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-normal">
                  <Link
                    href="/my-account/orders/3204"
                    className="text-sm leading-4 bg-gray-200 text-black px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    View
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrdersTable;
