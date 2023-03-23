import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  const { logged } = useContext(authContext);
  return logged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
