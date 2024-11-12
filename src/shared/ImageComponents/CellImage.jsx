

function CellImage({ src, width, height, alt }) {
 
  return (
    <img
      width={width || 400}
      height={height || 400}
      src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${src}`}
      alt={alt || "Image"}
      className="w-20 h-20 object-contain rounded-full"
    />
  );
}

export default CellImage;
