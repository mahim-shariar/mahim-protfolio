/* eslint-disable no-useless-catch */
import { useState, useEffect, useCallback } from "react";
import { adminAPI } from "../services/apiService";
import { useApi } from "./useApi";

export const useAuth = () => {
  const {
    loading: apiLoading,
    error: apiError,
    post,
    reset: resetApi,
  } = useApi();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(
    async (email, password) => {
      resetApi();
      try {
        const response = await adminAPI.login({ email, password });

        if (response.success && response.data.token) {
          // Store token and user data
          localStorage.setItem("adminToken", response.data.token);
          localStorage.setItem(
            "adminUser",
            JSON.stringify(response.data.admin)
          );
          setUser(response.data.admin);

          return { success: true, data: response.data };
        }
        throw new Error("Login failed");
      } catch (err) {
        throw err;
      }
    },
    [resetApi]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await adminAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setUser(null);
    }
  }, []);

  // Forgot password functions
  const initiatePasswordReset = useCallback(async (email) => {
    return await adminAPI.initiatePasswordReset(email);
  }, []);

  const verifySecurityQuestions = useCallback(async (resetToken, answers) => {
    return await adminAPI.verifySecurityQuestions({ resetToken, answers });
  }, []);

  const resetPassword = useCallback(async (verificationToken, newPassword) => {
    return await adminAPI.resetPassword({ verificationToken, newPassword });
  }, []);

  // Change password
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    return await adminAPI.changePassword({ currentPassword, newPassword });
  }, []);

  // Check if authenticated
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  return {
    user,
    loading: loading || apiLoading,
    error: apiError,
    login,
    logout,
    initiatePasswordReset,
    verifySecurityQuestions,
    resetPassword,
    changePassword,
    isAuthenticated,
  };
};
