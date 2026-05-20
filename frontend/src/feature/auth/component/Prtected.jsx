import React from "react";
import { useAuth } from "../hooks/useauth.js";
import { Navigate, useNavigate } from "react-router-dom";

const Prtected = ({children}) => {
  const { user, loading } = useAuth();

  const navigate = useNavigate();

  if (loading) return <h1>Loading...</h1>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Prtected;
