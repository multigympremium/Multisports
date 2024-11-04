import axios from "axios";
export const axiosSecure = axios.create({
  // baseURL: process.env.BASE_URL ? process.env.BASE_URL + "/api" : "https://king-prawn-app-qkhg8.ondigitalocean.app/api",
  baseURL: "http://localhost:3000/api",
  // timeout: 30000
});
const useAxiosSecure = () => {
  console.log(process.env.BASE_URL, "process.env.BASE_URL");
  return axiosSecure;
};

export default useAxiosSecure;
