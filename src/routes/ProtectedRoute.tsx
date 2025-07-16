/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";


interface PrivateRouteProps {
  children: ReactNode;
  role?: string;
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { user } = useSelector((state: any) => state.auth);
  const location = useLocation();

  if (!user) {
    alert("Please login first");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    alert("You are not authorized to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
