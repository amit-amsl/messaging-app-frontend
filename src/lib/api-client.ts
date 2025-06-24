import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
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
