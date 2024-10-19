import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app and provide auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulating an auth check on mount (you might replace this with an actual API call)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username"); // Fetch username from local storage

    if (storedToken && storedUsername) {
      setUser({ token: storedToken, username: storedUsername }); // Use actual username from local storage
    }
    setLoading(false); // Stop loading after check
  }, []);

  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username); // Store username in local storage
    setUser({ token, username }); // Set user with token and username
};



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Remove username from local storage
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children when loading is false */}
    </AuthContext.Provider>
  );
};
