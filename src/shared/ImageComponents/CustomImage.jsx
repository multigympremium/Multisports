
import React from "react";

function CustomImage({ imageKey }) {
  return (
    <img
      src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${imageKey}`}
      alt="Image"
      width={600}
      height={500}
      className="w-full h-full object-contain"
    />
  );
}

export default CustomImage;
