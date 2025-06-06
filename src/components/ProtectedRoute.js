import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../helpers/authHelper";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getLoggedUser();
      setIsAuthenticated(!!user);
      setChecking(false);
    };
    checkAuth();
  }, []);

  if (checking) return null; // oppure un loader

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
