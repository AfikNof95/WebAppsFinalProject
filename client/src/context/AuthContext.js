import React, { useState, useContext, createContext, useEffect } from "react";
import firebaseAPI from "./firebase";
import { useCookies } from "react-cookie";
import { getTokenExpireDate } from "../utils/getTokenExpireDate";

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
    setIcon(displayName)
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
  }
  async function signIn({ email, password }) {
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
  }

  function signOut() {
    setCurrentUser(null);
    removeCookie("user-session");
  }

  async function updateUser(newUserDetails) {
    const response = await firebaseAPI.updateUser({
      ...currentUser,
      ...newUserDetails,
    });
    setCurrentUser((currentUserState) => {
      return { ...currentUserState, ...response.data };
    });
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
    signOut,
    updateUser,
    getUserToken,
    getUser,
    refreshToken,
    setIcon,
    userIcon
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
