import Image from "next/image";
import React from "react";
import { FiUploadCloud } from "react-icons/fi";

function DragUploadImageInput({
  image,
  imagePreview,
  getRootProps,
  getInputProps,
}) {
  console.log(
    image,
    "image",
    imagePreview,
    "imagePreview",
    Array.isArray(image)
  );
  return (
    <div
      {...getRootProps()}
      className="w-full p-4 border-dashed min-h-[200px] flex flex-col items-center justify-center border-2 border-gray-300 rounded-md text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {image ? (
        <>
          {Array.isArray(image) ? (
            <div className="flex flex-wrap gap-4">
              {imagePreview.map((item, index) => (
                <Image
                  key={index}
                  src={item.preview}
                  alt="subcategoryIcon"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              ))}
            </div>
          ) : (
            <>
              <Image
                src={imagePreview}
                alt="subcategoryIcon"
                width={200}
                height={200}
              />
              <p>{image.name}</p>
            </>
          )}
        </>
      ) : (
        <>
          <FiUploadCloud size={60} />
          <p className="text-xl">Drag and drop a file here or click</p>
        </>
      )}
    </div>
  );
}

export default DragUploadImageInput;
