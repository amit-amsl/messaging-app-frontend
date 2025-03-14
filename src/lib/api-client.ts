import axios, { AxiosError } from "axios";
//http://localhost:3000/api
//http://192.168.68.108:3000/api
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  config.withCredentials = true;

  return config;
});
