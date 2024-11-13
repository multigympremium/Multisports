
import RecommendedProductsArea from "../RecomendedProductsArea/RecommendedProductsArea";


export default function ExclusiveCollection() {
  return (
    <>
      <div className="w-full">
        <img
          src={"/discount.png"}
          width={1200}
          height={500}
          alt=""
          className="h-[500px] w-full object-contain"
        />
      </div>

      <RecommendedProductsArea />
    </>
  );
}
