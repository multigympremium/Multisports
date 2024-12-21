import React, { useEffect } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Link } from "react-router-dom";

export default function PromotionalBanner() {
  const [data, setData] = React.useState(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchPromotionalBannerData = async () => {
      try {
        const res = await axiosPublic.get(`/promo-banner`);

        if (res.status === 200 || res.status === 201) {
          const data = res?.data?.data[0];

          console.log(data, "data");

          if (data) {
            setData(data);
          } else {
            setData(null);
          }
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      }
    };

    fetchPromotionalBannerData();
  }, [axiosPublic]);
  return (
    <>
      {data && data?.isActive && (
        <div className="bg-gray-100 px-10 py-5 rounded w-full mt-5">
          <h3 className="text-3xl mb-4 font-bold">{data?.headerText}</h3>
          <p className="text-xl">{data?.titleText}</p>
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
          <div className="flex justify-between items-center">
            <Link
              to={data?.buttonLink}
              target="_blank"
              className="bg-pink-500 text-white px-4 py-2 rounded-2xl"
            >
              {data?.buttonText}
            </Link>
            <div className="text-gray-700">
              <p>Starts: {new Date(data?.timeStart).toLocaleString()}</p>
              <p>Ends: {new Date(data?.timeEnd).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
