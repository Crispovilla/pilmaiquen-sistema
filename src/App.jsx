import React from "react";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
