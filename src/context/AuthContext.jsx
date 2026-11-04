import { createContext, useContext, useState, useEffect } from "react";
import { logoutUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/profile",
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
