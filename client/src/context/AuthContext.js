import React, { useState, useContext, createContext, useEffect } from "react";
import firebaseAPI from "./firebase";
const AuthContext = createContext({
  signUp: (email, password) => {},
  signIn: (email, password) => {},
  isUserSignedIn: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  function signUp(email, password) {
    return firebaseAPI.signUpWithEmailAndPassword(email, password);
  }
  async function signIn(email, password) {
    const user = await firebaseAPI.signInWithEmailAndPassword(email, password);
    setCurrentUser(user.data);
  }

  function getUserToken() {
    return isUserSignedIn() ? currentUser.getIdToken() : null;
  }

  function isUserSignedIn() {
    return currentUser != null;
  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
    isUserSignedIn,
    signUp,
    signIn,
    getUserToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
