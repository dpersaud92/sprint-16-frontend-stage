import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, getUserInfo } from "../utils/api";

export default function useAuth() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  // Login and redirect to /profile
  const handleLogin = (email, password) => {
    return login(email, password)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        return getUserInfo(token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Login failed:", err.message);
      });
  };

  // Register and auto-login
  const handleRegister = (email, password, name) => {
    return register(email, password, name)
      .then(() => handleLogin(email, password))
      .catch((err) => {
        console.error("Registration failed:", err.message);
      });
  };

  // Logout and redirect to home
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  };

  return {
    isLoggedIn,
    currentUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}
