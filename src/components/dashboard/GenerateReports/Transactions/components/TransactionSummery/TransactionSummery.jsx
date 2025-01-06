import React from "react";

function TransactionSummery({
  data,
  startDate,
  endDate,
  method_summary,
  cumulativeBalance,
}) {
  return (
    <div className="bg-white  p-4 shadow rounded-xl space-y-5 pb-10">
      <h3 className="md:text-2xl font-medium leading-6 text-gray-900 border-b pb-4 ">
        Summary
      </h3>

      <ul className="text-lg space-y-4">
        <li className="flex items-center justify-between gap-4">
          <p className="font-normal text-sm md:text-lg">Cumulative balance :</p>{" "}
          <span
            className={`${
              cumulativeBalance?.cumulativeBalance > 0
                ? "text-green-500"
                : "text-red-500"
            } text-sm md:text-base`}
          >
            {cumulativeBalance?.cumulativeBalance || 0}{" "}
            <span className="text-black">BDT </span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <b className="font-normal text-sm md:text-lg">From - To Date :</b>
          <span className="text-sm md:text-base">
            {" "}
            {startDate} - {endDate}
          </span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <b className="font-normal text-sm md:text-lg">Income :</b>{" "}
          <span
            className={`${
              data?.total > 0 ? "text-green-500" : "text-red-500"
            } text-sm md:text-base`}
          >
            {data?.total || 0} <span className="text-black">BDT </span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <b className="font-normal  text-sm md:text-lg">Per Item Discount :</b>{" "}
          <span className="text-red-500 text-sm md:text-base">
            {data?.totalItemPerDiscount || 0}{" "}
            <span className="text-black">BDT </span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <b className="font-normal  text-sm md:text-lg">Total Discount :</b>{" "}
          <span className="text-red-500 text-sm md:text-base">
            {data?.totalDiscount || 0} <span className="text-black">BDT </span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <b className="font-normal  text-sm md:text-lg">
            Total Delivery Charge :
          </b>{" "}
          <span className="text-red-500 text-sm md:text-base">
            {data?.totalDeliveryFee || 0}{" "}
            <span className="text-black">BDT </span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-4">
          <b className="font-normal  text-sm md:text-lg">Total Balance :</b>{" "}
          <span
            className={`${
              data?.total > 0 ? "text-green-500" : "text-red-500"
            } text-sm md:text-base`}
          >
            {data?.total || 0} <span className="text-black">BDT </span>
          </span>
        </li>
        {method_summary.length > 0 &&
          method_summary?.map((item, index) => (
            <li className="flex items-center justify-between gap-3" key={index}>
              <b className=" font-normal text-sm md:text-base capitalize">
                {item?.method_name}
              </b>{" "}
              <span
                className={`${
                  data?.total > 0 ? "text-green-500" : "text-red-500"
                } text-sm md:text-base`}
              >
                {parseInt(item?.total) - parseInt(item?.totalDiscount)}{" "}
                <span className="text-black">BDT </span>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TransactionSummery;
