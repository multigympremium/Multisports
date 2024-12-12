"use client";
import { useEffect, useState } from "react";
import useAxiosPublic from "../useAxiosPublic";

function useGetAboutMission({
  isEdited = false,
  isDeleted = false,
  isShowModal,
}) {
  const [contentMission, setContentMission] = useState("");

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/about-vision");
      const data = response?.data?.data[0];
      console.log(data);
      setContentMission(data);
    };

    fetchShippingPolicy();
  }, [axiosPublic, isDeleted, isEdited, isShowModal]);

  return contentMission;
}

export default useGetAboutMission;
