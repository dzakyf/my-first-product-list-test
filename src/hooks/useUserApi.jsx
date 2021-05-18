import axios from "axios";
import { BASE_URL } from "../utils/api";

export default function useUserApi() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  //   axiosInstance.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     (error) => {
  //       if (error?.response?.status === 401) {
  //         console.error(error);
  //         // return;
  //         dispatchAlert({
  //           severity: "warning",
  //           duration: 2000,
  //           message: trans("session_expired"),
  //           callback: () => {
  //             history.push("/auth/login");
  //             return 0;
  //           },
  //         });
  //         // break;
  //         return;
  //         // return history.push();
  //       }
  //       return Promise.reject();
  //     }
  //   );
  return axiosInstance;
}
