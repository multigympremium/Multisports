import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";

export default function CourierMethodModal({ setIsShow, targetId }) {
  const [courierMethod, setCourierMethod] = useState("");
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleChangeStatus = async () => {
  //     try {
  //       setLoading(true);
  //       console.log(targetId, "targetId");
  //       const response = await axiosSecure.put(`/orders/${targetId}`, {
  //         status: "Accepted",
  //         courierMethod,
  //       });

  //       if (response.status === 200 || response.status === 201) {
  //         toast.success("Order status updated successfully!");
  //         setIsShow(false);
  //         setLoading(false);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error updating status:", error);
  //       setLoading(false);
  //       setIsShow(false);
  //     }
  //   };

  //   if (targetId && courierMethod) {
  //     handleChangeStatus();
  //   }
  // }, [courierMethod, targetId, axiosSecure, setIsShow]);

  const handleChangeStatus = useCallback(
    (courier_method) => {
      console.log(courier_method, "e.target.value");
      async function handleCrud() {
        try {
          setLoading(true);
          console.log(targetId, "targetId");
          const response = await axiosSecure.put(`/orders/${targetId}`, {
            status: "Accepted",
            courierMethod: courier_method,
          });

          if (response.status === 200 || response.status === 201) {
            toast.success("Order status updated successfully!");
            setIsShow(false);
            setLoading(false);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error updating status:", error);
          setLoading(false);
          setIsShow(false);
        }
      }
      handleCrud();
    },
    [courierMethod, targetId, axiosSecure, setIsShow]
  );
  console.log(courierMethod, "courierMethod", targetId, "targetId");

  return (
    <div className="shadow-lg p-6 rounded-md mt-40 bg-white justify-center ">
      <h2 className="text-xl font-bold mb-4 pb-4 border-b border-black text-nowrap">
        Select Courier
      </h2>

      <div className="flex gap-4 justify-center">
        <button
          disabled={loading}
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={() => {
            setCourierMethod("SteadFast");
            handleChangeStatus("SteadFast");
          }}
        >
          <img src={"/stead_fast.svg"} alt="pathao" className="w-full h-full" />
        </button>
        <button
          disabled={loading}
          className="p-12 rounded-md border-2 border-gray-200 bg-white hover:bg-gray-100"
          onClick={() => {
            setCourierMethod("Pathao");
            handleChangeStatus("Pathao");
          }}
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
