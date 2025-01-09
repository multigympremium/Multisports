import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetExistCategories({ query = `` }) {
  const [existCategories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get(`/categories/exist_categories?`);

        if (res.status === 200 || res.status === 201) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [axiosSecure, query]);

  return existCategories;
}

export default useGetExistCategories;
