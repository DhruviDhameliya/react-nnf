import Axios from "axios";
import { ApiRoutes } from "../constants";



export const axios = Axios.create({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  baseURL: ApiRoutes.API_HOSTNAME,
  timeout: 1000000000,
  responseType: "json",
});

axios.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json , */*",
      "Content-Type": "application/json",
    };



    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
