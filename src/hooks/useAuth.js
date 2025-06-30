import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, getUserInfo } from "../utils/api";
import { toast } from "react-toastify";

export default function useAuth() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setToken(token);
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        })
        .finally(() => {
          setIsAuthResolved(true);
        });
    } else {
      setIsAuthResolved(true);
    }
  }, []);

  // Login and redirect to /profile
  const handleLogin = (email, password, redirect = false) => {
    return login(email, password)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        setToken(token);
        toast.success("Welcome back!");
        return getUserInfo(token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        if (redirect) navigate("/profile");
      })
      .catch((err) => {
        console.error("Login failed:", err.message);
        toast.error("Login failed");
        throw err;
      });
  };

  // Register and auto-login
  const handleRegister = (email, password, username) => {
    return register(email, password, username)
      .then(() => {
        toast.success("Registration successful!");
        return handleLogin(email, password);
      })
      .catch((err) => {
        console.error("Registration failed:", err.message);
        toast.error("Registration failed");
      });
  };

  const handleLogout = (shouldRedirect = true) => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    if (shouldRedirect) navigate("/");
  };

  return {
    isLoggedIn,
    currentUser,
    token,
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthResolved,
  };
}
