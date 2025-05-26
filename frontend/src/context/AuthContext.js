import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        // setHasSubscription(user.is_subscribed || false); // ✅ Fix key name
        setHasSubscription(user.is_subscribed === 1);
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Login function
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    setIsAuthenticated(true);
    // setHasSubscription(userData.is_subscribed || false);
    setHasSubscription(userData.is_subscribed === 1);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
    setHasSubscription(false);
  };

  // ✅ Update subscription flag after success
  const updateSubscription = (status) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, is_subscribed: status };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setHasSubscription(status);
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    hasSubscription,
    loading,
    login,
    logout,
    updateSubscription,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
