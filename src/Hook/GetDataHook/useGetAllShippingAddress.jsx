"use client";
import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllShippingAddress({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [address, setAddress] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/shipping");

        if (res.status === 200 || res.status === 201) {
          setAddress(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setLoading(false);
        throw new Error("Failed to fetch address");
      }
    };

    fetchAddress();
  }, [axiosSecure, isDeleted, isEdited, isShowModal]);

  return address;
}

export default useGetAllShippingAddress;