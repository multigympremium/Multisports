"use client";
import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllProducts({
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal = false,
  query = "",
}) {
  const [products, setProducts] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/products?${query}`);

        if (res.status === 200 || res.status === 201) {
          setProducts(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
        setLoading(false);
        throw new Error("Failed to fetch Products");
      }
    };

    fetchProducts();
  }, [axiosSecure, isDeleted, isEdited, isShowModal, query]);

  return products;
}

export default useGetAllProducts;
