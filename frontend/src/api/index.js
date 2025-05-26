import axios from "axios";

const API_BASE = "https://api.edsurance.in/api"; // Change this when deployed

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token BEFORE export
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerInstitution = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (token, data) =>
  api.post(`/auth/reset-password/${token}`, data);
export const verifyEmail = (token) => api.get(`/auth/verify/${token}`);

// Protected route example
export const fetchDashboardData = () => api.get("/dashboard");

export default api;
