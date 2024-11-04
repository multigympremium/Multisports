import axios from "axios";
export const axiosSecure = axios.create({
  baseURL: "https://multi-sports.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
  timeout: 30000
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
