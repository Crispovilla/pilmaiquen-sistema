import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/authContext";

const PublicRoute = ({ children }) => {
  const { logged } = useContext(authContext);
  return !logged ? children : <Navigate to="/" />;
};

export default PublicRoute;
