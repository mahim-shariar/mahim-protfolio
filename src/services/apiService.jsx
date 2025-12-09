import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api",
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

// API endpoints
export const adminAPI = {
  // Login
  login: (credentials) => api.post("/admin/login", credentials),

  // Get profile
  getProfile: () => api.get("/admin/profile"),

  // Change password
  changePassword: (data) => api.put("/admin/change-password", data),

  // Forgot password
  initiatePasswordReset: (email) =>
    api.post("/admin/forgot-password/initiate", { email }),
  verifySecurityQuestions: (data) =>
    api.post("/admin/forgot-password/verify", data),
  resetPassword: (data) => api.post("/admin/forgot-password/reset", data),

  // Security questions
  getSecurityQuestions: () => api.get("/admin/security-questions"),
  updateSecurityQuestions: (data) => api.put("/admin/security-questions", data),

  // Logout
  logout: () => api.post("/admin/logout"),
};

// Generic HTTP methods for other API calls
export const httpService = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
  patch: (url, data, config) => api.patch(url, data, config),
};

export default api;
