import React, { useState, useContext, createContext, useEffect } from "react";
import firebaseAPI from "./firebase";
import { useCookies } from "react-cookie";
const AuthContext = createContext({
  signUp: (email, password) => {},
  signIn: (email, password) => {},
  isUserSignedIn: () => {},
  getUser: () => {},
  currentUser: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["user-session"]);

  debugger;
  const [currentUser, setCurrentUser] = useState(cookies["user-session"]);

  async function signUp(email, password) {
    const response = await firebaseAPI.signUpWithEmailAndPassword(
      email,
      password
    );
    setCookie("user-session", response.data);
    return response.data;
  }
  async function signIn(email, password) {
    const user = await firebaseAPI.signInWithEmailAndPassword(email, password);
    setCurrentUser(user.data);
    setCookie("user-session", user.data);
    return user.data;
  }

  function getUserToken() {
    return isUserSignedIn() ? currentUser.getIdToken() : null;
  }

  function isUserSignedIn() {
    return currentUser != null;
  }

  function getUser() {
    return currentUser;
  }

  const value = {
    currentUser,
    isUserSignedIn,
    signUp,
    signIn,
    getUserToken,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
