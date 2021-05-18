import axios from "axios";
import { BASE_URL } from "../utils/api";

export default function useUserApi() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  return axiosInstance;
}
