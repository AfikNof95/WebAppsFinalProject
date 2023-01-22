import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
export const useAxiosIntercept = () => {
  const { currentUser } = useAuth();
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (value) => {
      if (
        value.url.startsWith(`https://identitytoolkit.googleapis.com/v1/token`)
      ) {
        return value;
      }

      const user = currentUser;
      debugger;
      return value;
    });
  }, [currentUser]);
};
