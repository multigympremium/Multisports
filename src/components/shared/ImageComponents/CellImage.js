import { baseImageUrl } from "@/apis/apis";
import Image from "next/image";
import React from "react";

function CellImage({ src, width, height, alt }) {
  console.log(
    baseImageUrl + src,
    process.env.SPACES_URL,
    "baseImageUrl",
    `https://mgpwebaps.s3.eu-north-1.amazonaws.com/${src}`
  );
  return (
    <Image
      width={width || 400}
      height={height || 400}
      src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${src}`}
      alt={alt || "Image"}
      className="w-20 h-20 object-contain rounded-full"
    />
  );
}

export default CellImage;
