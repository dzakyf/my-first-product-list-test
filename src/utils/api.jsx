import axios from "axios";
import env from "../constants/url";

export const BASE_URL = env.BACKEND_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
