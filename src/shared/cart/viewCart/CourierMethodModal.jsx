export default function CourierMethodModal({
  setIsShow,
  setIsShowPaymentMethod,
  setCourierMethod,
}) {
  const selectCourier = (name) => {
    setCourierMethod(name);
    setIsShow(false);
    setIsShowPaymentMethod(true);
  };

  return (
    <div className="shadow-lg p-6 rounded-md mt-40 bg-white justify-center ">
      <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
        Select Courier
      </h2>

      <div className="flex gap-4 justify-center">
        <button
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={() => selectCourier("SteadFast")}
        >
          <img src={"/stead_fast.svg"} alt="pathao" className="w-full h-full" />
        </button>
        <button
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={() => selectCourier("Pathao")}
        >
          <img
            src={"/logo_pathao.svg"}
            alt="pathao"
            className="w-full h-full"
          />
        </button>
      </div>
    </div>
  );
}
