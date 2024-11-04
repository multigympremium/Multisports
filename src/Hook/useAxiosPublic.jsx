import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://multi-sports.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
  timeout: 30000

});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
