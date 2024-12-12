import { useState } from "react";
import useGetAbout from "../../../Hook/GetPublicDataHook/useGetAbout";
import { baseImageUrl } from "../../../apis/apis";
import CustomImage from "../../../shared/ImageComponents/CustomImage";
import useGetAboutVision from "../../../Hook/GetPublicDataHook/useGetAboutVision";
import useGetAboutMission from "../../../Hook/GetPublicDataHook/useGetAboutMission";

export default function About() {
  const [loading, setLoading] = useState(false);
  const content = useGetAbout({ setLoading });

  const contentVision = useGetAboutVision({ setLoading });
  const contentMission = useGetAboutMission({ setLoading });
  console.log(content, "content");
  return (
    <>
      <section className="bg-primary-300 text-white pb-24" id="blog">
        <div
          className="w-full h-[400px] flex justify-center items-center flex-col gap-4 mb-14"
          style={{
            backgroundImage: `url(${baseImageUrl}/${content?.bannerImage})`,
            backgroundSize: "cover",
            backdropFilter: "brightness(0.5)",
          }}
        >
          <h2 className="uppercase font-bold text-center text-4xl">
            OUR Blogs
          </h2>
          <h4 className="text-center text-lg text-gray-500 mb-6">
            LATEST BLOG POSTS
          </h4>
        </div>

        <div className="container mx-auto">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <div className="flex p-4 relative bg-white rounded-2xl  border-t-0 border-l-0 shadow text-neutral-900">
                <CustomImage
                  imageKey={content?.sideImage}
                  width={200}
                  height={200}
                  alt="icon"
                  className="w-full h-full max-w-[400px] object-contain"
                />
                <div className="p-8 relative z-[1] min-h-[500px]">
                  <h4 className="text-lg font-bold">{content?.title}</h4>
                  <p
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: content?.description }}
                  ></p>
                </div>
              </div>

              <h2 className="uppercase font-bold text-center text-4xl mt-8 text-black">
                OUR Vision
              </h2>

              <div className="flex p-4 justify-between relative bg-white rounded-2xl  border-t-0 border-l-0 shadow text-neutral-900 text-right min-h-[500px] mt-8">
                <div className=" p-8 relative z-[1] w-1/2">
                  <h4 className="text-lg font-bold">{contentVision?.title}</h4>
                  <p
                    className="mt-2"
                    dangerouslySetInnerHTML={{
                      __html: contentVision?.description,
                    }}
                  ></p>
                </div>
                <CustomImage
                  imageKey={contentVision?.image}
                  width={200}
                  height={200}
                  alt="icon"
                  className="w-full h-full max-w-[400px] object-contain"
                />
              </div>

              <h2 className="uppercase font-bold text-center text-4xl mt-8 text-black">
                OUR Mission
              </h2>

              <div className="flex p-4 justify-between relative bg-white rounded-2xl  border-t-0 border-l-0 shadow text-neutral-900  min-h-[500px] mt-8">
                <CustomImage
                  imageKey={contentMission?.image}
                  width={200}
                  height={200}
                  alt="icon"
                  className="w-full h-full max-w-[400px] object-contain"
                />
                <div className=" p-8 relative z-[1] w-1/2">
                  <h4 className="text-lg font-bold">{contentMission?.title}</h4>
                  <p
                    className="mt-2"
                    dangerouslySetInnerHTML={{
                      __html: contentMission?.description,
                    }}
                  ></p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
