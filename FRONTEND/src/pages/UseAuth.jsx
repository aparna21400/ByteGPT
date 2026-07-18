import { createContext, useContext, useState, useCallback } from "react";
import { authAPI } from "../hooks/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.login(email, password);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (username, email, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.signup(username, email, password);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
