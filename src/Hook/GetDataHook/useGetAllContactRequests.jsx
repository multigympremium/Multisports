import { useEffect, useState } from "react";
import useAxiosSecure from "../useAxiosSecure";

function useGetAllContactRequests({
  searchQuery = "",
  isEdited = false,
  isDeleted = false,
  setLoading = () => {},
  isShowModal,
}) {
  const [contactRequests, setContactRequests] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        setLoading(true);

        // Add search query to the API endpoint
        const endpoint = searchQuery
          ? `/contact-requests?search=${encodeURIComponent(searchQuery)}`
          : "/contact-requests";

        const res = await axiosSecure.get(endpoint);

        if (res.status === 200 || res.status === 201) {
          setContactRequests(res.data.data); // Assuming data is in `res.data.data`
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
        setLoading(false);
        throw new Error("Failed to fetch contact requests");
      }
    };

    fetchContactRequests();
    
  }, [axiosSecure, searchQuery, isDeleted, isEdited, isShowModal]);
  
  

  return contactRequests;
}

export default useGetAllContactRequests;
