const ProductFilterGroup = ({ children, groupName }) => {
  return (
    <div className="border-b pb-9 pt-3 transition-all duration-300 h-full max-h-[400px] overflow-auto">
      <p className="font-semibold text-lg mb-7">{groupName}</p>
      <div className="">{children}</div>
    </div>
  );
};

export default ProductFilterGroup;
