import axios from "axios";
export const axiosSecure = axios.create({
  baseURL: process.env.BASE_URL || "https://king-prawn-app-qkhg8.ondigitalocean.app",
  // baseURL: "http://localhost:3000/api",
  timeout: 30000
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
