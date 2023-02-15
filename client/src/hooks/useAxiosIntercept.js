import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
export const useAxiosIntercept = () => {
  const { currentUser, refreshToken, signOut } = useAuth();
  const [isInterceptReady, setIsInterceptReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const reqIntercept = axios.interceptors.request.use(
      async (config) => {
        if (config.url.indexOf('identitytoolkit') === -1 && config.url.indexOf('securetoken') === -1  && currentUser) {
          let idToken = currentUser.idToken;
          if(new Date(currentUser.expireDate) < new Date()){
            const response = await refreshToken()
            idToken = response ? response.idToken :  idToken;
          }
          config.headers['Authorization'] = 'Bearer ' + idToken;
          if (config.data && typeof config.data !== 'string') {
            config.data.token = idToken;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const resIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) {
          return Promise.reject(error);
        }

        if(error.response.status === 401 || error.response.status === 403){
          if(error.config.url.indexOf('identitytoolkit') === -1 && error.config.url.indexOf('securetoken') === -1){
           return  navigate("/401");
          }
          if(error.response.data && error.response.data.error.message === "auth/id-token-expired"){
            signOut();
            return navigate("/login");
          }
        }else{
          return Promise.reject(error);
        }
      }
    );
    setIsInterceptReady(true);

    if (!currentUser) {
      return () => {
        axios.interceptors.request.eject(reqIntercept);
        axios.interceptors.response.eject(resIntercept);
      };
    }
  }, [currentUser]);

  return [isInterceptReady];
};
