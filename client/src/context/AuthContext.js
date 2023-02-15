import React, { useState, useContext, createContext, useEffect } from 'react';
import backendAPI from '../api';
import { useCookies } from 'react-cookie';
import { getTokenExpireDate } from '../utils/getTokenExpireDate';
import { useWebSocketServer } from './WebSocketContext';

let isRefreshingToken = false;

const AuthContext = createContext({
  signUp: async ({ email, password, imageURL, displayName }) => {},
  signIn: async ({ email, password }) => {},
  signOut: async () => {},
  updateUser: async (newUserDetails) => {},
  updatePassword: async (newPassword) => {},
  isUserSignedIn: () => {},
  getUser: () => {},
  refreshToken: async () => {},
  isAdmin: () => {},
  getUserProfilePicture: () => {},
  currentUser: null
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-session']);
  const [currentUser, setCurrentUser] = useState(cookies['user-session']);
  const [userProfilePicture, setUserProfilePicture] = useState(
    'http://localhost:2308/images/defaultAvatar.png'
  );
  const { lastJsonMessage, sendJsonMessage, readyState, isSocketOpen, setWsURL } =
    useWebSocketServer();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (isSocketOpen) {
      sendJsonMessage({ type: 'SIGN_IN', user: currentUser });
    }
  }, [currentUser, isSocketOpen]);

  async function signUp({ email, password, photoFile, displayName }) {
    let photoUrl;
    if (photoFile) {
      const photoUploadResponse = await backendAPI.user.uploadPhoto(photoFile);
      photoUrl = photoUploadResponse.data.photoUrl;
    }

    const response = await backendAPI.auth.signUpWithEmailAndPassword(email, password);
    const userDetails = await backendAPI.user.update({
      ...response.data,
      displayName,
      ...(photoUrl && { photoUrl })
    });
    const { data } = userDetails;
    const user = { ...response.data, ...data };

    user.expireDate = getTokenExpireDate(data.expiresIn);

    setCurrentUser(user);
    return data;
  }

  async function signIn({ email, password }) {
    const response = await backendAPI.auth.signInWithEmailAndPassword(email, password);
    const { data: authData } = response;
    const userDataResponse = await backendAPI.user.getUserData(authData.idToken);
    const { users: userData } = userDataResponse.data;
    const userSession = { ...authData, ...userData[0] };
    //Set the expiry date of the token, so we can use the refresh token to revoke our token.
    userSession.expireDate = getTokenExpireDate(authData.expiresIn);
    setCurrentUser(userSession);
    setCookie('user-session', userSession);
    return userSession;
  }

  async function signInWithGoogleAuth(authData){
    const userDataResponse = await backendAPI.user.getUserData(authData.idToken);
    const { users: userData } = userDataResponse.data;
    const userSession = { ...authData, ...userData[0] };
    //Set the expiry date of the token, so we can use the refresh token to revoke our token.
    userSession.expireDate = getTokenExpireDate(authData.expiresIn);
    setCurrentUser(userSession);
    setCookie('user-session', userSession);
    return userSession;
  }

  function signOut() {
    setCurrentUser(null);
    removeCookie('user-session');
    sendJsonMessage({ type: 'SIGN_OUT' });
  }

  async function updateUser(newUserDetails) {
    try {
      if (newUserDetails.photoFile) {
        const photoUploadResponse = await backendAPI.user.uploadPhoto(newUserDetails.photoFile);
        newUserDetails.photoUrl = photoUploadResponse.data;
      }
      const updateRequestData = {
        ...{
          idToken: currentUser.idToken,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoUrl,
          returnSecureToken: true
        },
        ...newUserDetails
      };
      const updateResponse = await backendAPI.user.update(updateRequestData);

      if (newUserDetails.email && currentUser.email !== newUserDetails.email) {
        signOut();
        return;
      }

      const userDataResponse = await backendAPI.user.getUserData(currentUser.idToken);
      const { users } = userDataResponse.data;

      const updatedUserDetails = { ...updateResponse.data, ...users[0] };

      setCurrentUser((currentUserState) => {
        return { ...currentUserState, ...updatedUserDetails };
      });
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  async function refreshToken() {
    try {
      if(isRefreshingToken){
        return;
      }
      isRefreshingToken = true;
      const response = await backendAPI.auth.refreshToken(currentUser.refreshToken);
      const {
        id_token: idToken,
        refresh_token: refreshToken,
        expires_in: expiresIn
      } = response.data;

      const expireDate = getTokenExpireDate(expiresIn);

      setCurrentUser((currentUserState) => {
        isRefreshingToken = false;
        return {
          ...currentUserState,
          ...{
            idToken,
            refreshToken,
            expiresIn,
            expireDate
          }
        };
      });
      return { idToken: idToken };
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  async function updatePassword(newPassword) {
    try {
      const updatePasswordResponse = await backendAPI.auth.updatePassword(
        currentUser.idToken,
        newPassword
      );
      setCurrentUser((currentUserState) => {
        return {
          ...currentUserState,
          ...updatePasswordResponse.data,
          ...{ expireDate: getTokenExpireDate(updatePasswordResponse.data.expiresIn) }
        };
      });
      return true;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  // useEffect(() => {
  //   const refresh = async () => {
  //     await refreshToken();
  //   };
  //   if (lastJsonMessage !== null) {
  //     if (lastJsonMessage.type === 'REFRESH_TOKEN') {
  //       refresh();
  //       sendJsonMessage({ type: 'SIGN_IN', user: currentUser });
  //     }
  //   }
  // }, [lastJsonMessage]);

  useEffect(() => {
    if (currentUser) {
      try {
        setCookie('user-session', currentUser);
        setUserProfilePicture((currentPicture) =>
          currentUser.photoUrl ? currentUser.photoUrl : currentPicture
        );
      } catch (ex) {
        console.error(ex);
      }
    }
  }, [currentUser, setCookie, sendJsonMessage]);

  function getUserToken() {
    return isUserSignedIn() ? currentUser.getIdToken() : null;
  }

  function isUserSignedIn() {
    return currentUser != null;
  }

  function getUser() {
    return currentUser;
  }

  function isAdmin() {
    return currentUser && currentUser.customAttributes
      ? JSON.parse(currentUser.customAttributes).isAdmin
      : false;
  }

  function getUserProfilePicture() {
    return userProfilePicture;
  }

  const value = {
    currentUser,
    isUserSignedIn,
    signUp,
    signIn,
    signInWithGoogleAuth,
    signOut,
    updateUser,
    updatePassword,
    getUserToken,
    getUser,
    refreshToken,
    getUserProfilePicture,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
