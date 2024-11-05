import axios from "axios";
import { backendUrl } from "../../Constants";

const axiosPublic = axios.create({
  baseURL: backendUrl ? backendUrl : "https://king-prawn-app-qkhg8.ondigitalocean.app/api",
  // baseURL: "http://localhost:3000/api",
  // timeout: 30000

});

const useAxiosPublic = () => {
  console.log(backendUrl, "process.env.BASE_URL");

  return axiosPublic;
};

export default useAxiosPublic;
