import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.BASE_URL || "https://king-prawn-app-qkhg8.ondigitalocean.app",
  // baseURL: "http://localhost:3000/api",
  timeout: 30000

});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
