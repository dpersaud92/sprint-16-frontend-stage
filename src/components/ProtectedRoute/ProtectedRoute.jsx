import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}
