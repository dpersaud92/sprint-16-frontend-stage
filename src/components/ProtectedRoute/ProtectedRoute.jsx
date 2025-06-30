import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  isAuthResolved,
  children,
}) {
  if (!isAuthResolved) return null; // or show loading spinner
  return isLoggedIn ? children : <Navigate to="/" replace />;
}
