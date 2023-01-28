import React, { useState, useContext, createContext, useEffect } from "react";
import firebaseAPI from "./firebase";
import { useCookies } from "react-cookie";
import { getTokenExpireDate } from "../utils/getTokenExpireDate";
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider,
  signOut } from "firebase/auth";


const AuthContext = createContext({
  signUp: async ({ email, password, imageURL, displayName }) => {},
  signIn: async ({ email, password }) => {},
  signOut: async () => {},
  updateUser: async (newUserDetails) => {},
  isUserSignedIn: () => {},
  getUser: () => {},
  refreshToken: async () => {},
  currentUser: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user-session"]);
  const [currentUser, setCurrentUser] = useState(cookies["user-session"]);
  const [userIcon, setIcon] = useState(0)

  async function signUp({ email, password, displayName }) {
    // setIcon(displayName)
    try {
      const response = await firebaseAPI.signUpWithEmailAndPassword(
        email,
        password
      );
      const userDetails = await firebaseAPI.updateUser({
        ...response.data,
        displayName,
      });
      const { data } = userDetails;
      const user = { ...response.data, ...data };
  
      user.expireDate = getTokenExpireDate(data.expiresIn);
  
      setCurrentUser(user);
      setCookie("user-session", user);
      return data;
    } catch(error) {
      console.log("error in sign up")
      console.log(error)
    }
    
  }

  async function signIn({ email, password }) {
    try {
      const response = await firebaseAPI.signInWithEmailAndPassword(
        email,
        password
      );
      const { data } = response;

      //Set the expiry date of the token, so we can use the refresh token to revoke our token.
      data.expireDate = getTokenExpireDate(data.expiresIn);
      setCurrentUser(data);
      setCookie("user-session", data);
      return data;
    } catch(error) {
      console.log(error + " in signIn")
    }
  }

  function signOut() {
    setCurrentUser(null);
    removeCookie("user-session");
    // auth.signOut()
  }

  
  async function updateNewPass(newPassword) {
    updatePassword(currentUser, newPassword).then(() => {
      // Update successful.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  function getUserToken() {
    return isUserSignedIn() ? currentUser.getIdToken() : null;
  }

  async function refreshToken() {
    const response = await firebaseAPI.refreshToken(currentUser.refreshToken);
    const {
      id_token: idToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = response.data;

    setCurrentUser((currentUserState) => {
      return {
        ...currentUserState,
        ...{
          idToken,
          refreshToken,
          expiresIn,
          expireDate: getTokenExpireDate(expiresIn),
        },
      };
    });
    return currentUser;
  } 

  async function updateUser(newUserDetails) {
    await signIn({ email: currentUser.email, password: 'mmmmmm' }) 
    await refreshToken()
    const response = await firebaseAPI.updateUser({
      ...currentUser,
      ...newUserDetails,
    });
    setCurrentUser((currentUserState) => {
      return { ...currentUserState, ...response.data };
    });
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
    signOut,
    updateUser,
    getUserToken,
    getUser,
    refreshToken,
    setIcon,
    userIcon,
    updateNewPass
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
