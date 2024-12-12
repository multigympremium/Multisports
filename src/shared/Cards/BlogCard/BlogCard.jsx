import React from "react";
import CustomImage from "../../ImageComponents/CustomImage";

export default function BlogCard({ data, setSingleData, setIsShowModal }) {
  return (
    <article className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 min-h-[300px]">
      <div className="h-[180px]">
        <CustomImage
          imageKey={data?.image}
          alt={data?.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-5">
        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
          {data?.title}
        </h5>
        <p
          className="font-normal text-gray-700 mb-3"
          dangerouslySetInnerHTML={{ __html: data?.shortDescription }}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
          onClick={() => {
            setSingleData(data);
            setIsShowModal(true);
          }}
        >
          Read more
        </button>
      </div>
    </article>
  );
}
