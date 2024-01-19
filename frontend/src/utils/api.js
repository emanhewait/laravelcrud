import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/api/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axiosInstance.post(`${API_URL}/api/login`, credentials);
};

export const getUsers = async () => {
  return await axiosInstance.get(`${API_URL}/api/users`);
};

export const createUser = async (userData) => {
  return await axiosInstance.post(`${API_URL}/api/users`, userData);
};
export const getUser = async (userId) => {
  return await axiosInstance.get(`${API_URL}/api/users/${userId}`);
};

export const updateUser = async (userId, userData) => {
  return await axiosInstance.put(`${API_URL}/api/users/${userId}`, userData);
};

export const deleteUser = async (userId) => {
  return await axiosInstance.delete(`${API_URL}/api/users/${userId}`);
};
