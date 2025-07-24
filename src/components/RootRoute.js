import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../helpers/authHelper";
import Dashboard from "../pages/Dashboard";

const RootRoute = () => {
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

  if (checking) return null;

  return isAuthenticated ? <Dashboard /> : <Navigate to="/landing" replace />;
};

export default RootRoute;
