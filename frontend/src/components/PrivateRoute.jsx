import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(ShopContext);
  const location = useLocation();

  if (!token) {
    // User login nahi hai → redirect login page with original target
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // login hai → content dikhao
};

export default PrivateRoute;
