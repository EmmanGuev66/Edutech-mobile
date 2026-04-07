import axios from "axios";
import StorageService from "../helpers/StorageService";

const api = axios.create({
  baseURL: "https://edutech-zxvy.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;