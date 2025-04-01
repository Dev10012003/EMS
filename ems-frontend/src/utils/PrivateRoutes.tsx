import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { IPrivateRoutesProps } from "../interfaces/Common";

const PrivateRoutes: React.FC<IPrivateRoutesProps> = ({ children }) => {
  const authContext = useAuth();
  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, loading } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
