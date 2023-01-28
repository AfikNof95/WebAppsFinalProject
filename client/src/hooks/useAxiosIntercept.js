import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const useAxiosIntercept = () => {
  const { currentUser, refreshToken, signOut } = useAuth();
  const navigate = useNavigate();

  axios.interceptors.request.use(
    async (config) => {
      if (config.url.indexOf("/token") === -1 && currentUser) {
        config.headers["Authorization"] = "Bearer " + currentUser.idToken;
        if (config.data && config.url.indexOf("/signIn" === -1)) {
          config.data.token = currentUser.idToken;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response.status === 401 &&
        new Date(currentUser.expireDate) < new Date()
      ) {
        try {
          const user = await refreshToken();
          error.config.headers.Authorization = "Bearer " + user.idToken;

          if (error.config.data) {
            const data = JSON.parse(error.config.data);
            data.token = user.idToken;
            error.config.data = JSON.stringify(data);
          }

          return axios(error.config);
        } catch (ex) {
          console.error(ex.message);
          signOut();
          navigate({ pathname: "/login" });
        }
      } else if (error.response.status === 403) {
        try {
          const user = await refreshToken();
          error.config.data = JSON.stringify({ token: user.idToken });
          return axios(error.config);
        } catch (ex) {
          console.error(ex);
          navigate({ pathname: "/401" });
        }
      } else {
        return Promise.reject(error);
      }
    }
  );
};
