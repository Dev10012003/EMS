import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { IRoleBasedRoutesProps } from "../interfaces/Common";

const RoleBasedRoutes: React.FC<IRoleBasedRoutesProps> = ({
  children,
  requiredRole,
}) => {
  const authContext = useAuth();

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, loading } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default RoleBasedRoutes;
