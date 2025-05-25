import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false); // Add this state
  const [loading, setLoading] = useState(true);

  // Check for existing user on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (token && user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        // Set subscription status based on stored user data
        setHasSubscription(user.has_subscription || false);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      // Clear possibly corrupted auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setHasSubscription(userData.has_subscription || false);
  };

  // Logout function
  const logout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setHasSubscription(false);
    
    // If there are any other auth-related items in localStorage, clear them too
    const authKeys = ['auth', 'permissions', 'role'];
    authKeys.forEach(key => {
      if(localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    });
  };

  // Add a function to update subscription status
  const updateSubscription = (status) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, has_subscription: status };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setHasSubscription(status);
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    hasSubscription, // Add this to the context
    loading,
    login,
    logout,
    updateSubscription // Add this function
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
