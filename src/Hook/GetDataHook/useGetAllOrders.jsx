"use client";
import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllOrders({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
  query = "",
}) {
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/orders?${query}`);

        if (res.status === 200 || res.status === 201) {
          setOrders(res.data.data);
          setLoading(false);
          setTotalItems(res.data.totalItems);
          setItemsPerPage(res.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
        throw new Error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  return { orders, totalItems, itemsPerPage };
}

export default useGetAllOrders;
