import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";

function DragMultiEditUploadImageInput({
  image,
  imagePreview,
  getRootProps,
  getInputProps,
  setImagePreview,
  setGallery,
}) {
  console.log(
    image,
    "image",
    imagePreview,
    "imagePreview",
    Array.isArray(image)
  );

  return (
    <div className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-2xl text-center cursor-pointer relative z-[1]">
      <div
        {...getRootProps()}
        className={`w-full h-full absolute top-0 left-0 p-4 z-[-1]`}
      >
        <input {...getInputProps()} />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {imagePreview && imagePreview?.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {imagePreview.map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={
                    item?.file
                      ? item.preview
                      : `https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${item.image}`
                  }
                  alt="subcategoryIcon"
                  width={200}
                  height={200}
                />

                <span
                  className="absolute -right-3 -top-3 text-red-600 bg-gray-200 rounded-full  text-xs"
                  onClick={() => {
                    if (item.file) {
                      setImagePreview((prev) =>
                        prev.filter((item2) => {
                          console.log(
                            item2?.file?.name,
                            item.file.name,
                            "item, item2"
                          );
                          return item2?.file?.name !== item?.file?.name;
                        })
                      );
                      setGallery((prev) =>
                        prev.filter((item2) => {
                          console.log(
                            item2.name,
                            item.file.name,
                            "item, item2"
                          );
                          return item2?.name !== item?.file?.name;
                        })
                      );
                    } else {
                      setImagePreview((prev) =>
                        prev.filter((item2) => {
                          console.log(item?._id, item?._id, "item, item2");
                          return item2?._id !== item?._id;
                        })
                      );
                    }
                  }}
                >
                  <AiOutlineCloseCircle size={25} />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col justify-center items-center gap-4"
            {...getRootProps()}
          >
            <FiUploadCloud size={60} />
            <p className="text-xl">Drag and drop Multi files here or click</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DragMultiEditUploadImageInput;
