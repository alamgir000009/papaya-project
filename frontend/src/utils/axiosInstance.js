import axios from "axios";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl, // Replace with your backend base URL
});

// Add a request interceptor to handle headers globally
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or any custom headers
    const token = localStorage.getItem("token"); // Assuming you're storing token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors globally (e.g., redirect on 401)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
