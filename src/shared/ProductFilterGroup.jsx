const ProductFilterGroup = ({ children, groupName }) => {
    return (
        <div className="border-b pb-9 pt-3">
            <p className="font-semibold text-lg mb-7">{groupName}</p>
            <div className="">
                {children}
            </div>
        </div>
    );
};

export default ProductFilterGroup;