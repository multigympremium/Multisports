import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.BASE_URL ? process.env.BASE_URL + "/api" : "https://king-prawn-app-qkhg8.ondigitalocean.app/api",
  // baseURL: "http://localhost:3000/api",
  // timeout: 30000

});

const useAxiosPublic = () => {
  console.log(process.env.NEXT_BASE_URL, "process.env.BASE_URL");

  return axiosPublic;
};

export default useAxiosPublic;
