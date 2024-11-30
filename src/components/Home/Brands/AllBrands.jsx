import { useState } from "react";
import useGetAllProductBrands from "../../../Hook/GetDataHook/useGetAllProductBrands";

const AllBrands = () => {
    const [loading, setLoading] = useState(true); // Initialize loading as true
    const [isEdited, setIsEdited] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const productBrands = useGetAllProductBrands({
        isEdited,
        isDeleted,
        setLoading,
        isShowModal,
    });

    return (
        <section className="py-6 pt-12 px-4 md:px-10 lg:px-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {loading ? (
                    Array.from({ length: 32 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-lg flex skeleton bg-slate-100 items-center justify-center p-4"
                        >
                            <div className="w-[100px] h-[100px] rounded-lg"></div>
                        </div>
                    ))
                ) : (
                    productBrands.map((item) => (
                        <div
                            key={item.brandName}
                            className="border rounded-lg bg-white cursor-pointer flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                width={200}
                                height={150}
                                src={`https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${item.logo}`}
                                alt={item.brandName}
                                className="object-contain h-[100px] w-[100px]"
                            />
                        </div>

                    ))
                )}
            </div>
        </section>
    );
};

export default AllBrands;
