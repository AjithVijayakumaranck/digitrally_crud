import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  config.baseURL = import.meta.env.VITE_API_BASE_URL;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);


export default axiosInstance;