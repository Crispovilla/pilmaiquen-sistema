import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { authReducer } from "./authReducer";
import { types } from "../types/types";
import { auth } from "../firebase/firebase-config";

/* const initialState = {
  logged: false,
}; */
export const authContext = createContext();

/* export const useAuth = () => {
  const context = useContext(authContext);
  return context;
}; */
const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    logged: !!user,
    user: user,
  };
};
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  //login 1 normal
  const login = async ({ email, password }) => {
    const user = { email, password };
    //console.log(user);
    await signInWithEmailAndPassword(auth, email, password);
    const action = {
      type: types.login,
      payload: user,
    };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem("user");
    const action = {
      type: types.logout,
    };
    dispatch(action);
  };

  return (
    <authContext.Provider
      value={{ ...authState, login: login, logout: logout }}
    >
      {children}
    </authContext.Provider>
  );
};
