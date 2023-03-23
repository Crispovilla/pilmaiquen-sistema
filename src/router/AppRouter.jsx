import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "../auth/AuthLogin";
import RoutesComponents from "../components/routes/RoutesComponents";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login/*"
          element={
            <PublicRoute>
              {/* <LoginPage /> */}
              <Routes>
                <Route path="/*" element={<AuthLogin />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <RoutesComponents />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
