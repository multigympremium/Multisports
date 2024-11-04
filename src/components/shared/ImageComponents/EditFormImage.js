import Image from "next/image";
import React from "react";

function EditFormImage({ imageObject, imagePreview }) {
  console.log(imageObject, "imageObject", imagePreview, "imagePreview");
  return (
    <Image
      src={
        imageObject == null
          ? `https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${imagePreview}`
          : imagePreview
      }
      alt="categoryIcon"
      width={200}
      height={200}
    />
  );
}

export default EditFormImage;
