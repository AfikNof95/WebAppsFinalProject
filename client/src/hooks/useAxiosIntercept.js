import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const useAxiosIntercept = () => {
  const { currentUser, refreshToken, signOut } = useAuth();
  const navigate = useNavigate();

  const interceptor = axios.interceptors.request.use(async (value) => {
    if (
      value.url.startsWith(`https://identitytoolkit.googleapis.com/v1/token`)
    ) {
      return value;
    }

    let user = currentUser;
    if (user && new Date(user.expireDate) < new Date()) {
      try {
        user = refreshToken();
      } catch (ex) {
        console.error(ex.message);
        signOut();
        navigate({ pathname: "/signIn" });
      }
    }

    return value;
  });

  return () => {
    axios.interceptors.request.eject(interceptor);
  };
};
