import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyCPHJfNEGeaNbsPRkPbiKAG2B-7lAz_kIk",
  authDomain: "reacct-final-effi.firebaseapp.com",
  projectId: "reacct-final-effi",
  storageBucket: "reacct-final-effi.appspot.com",
  messagingSenderId: "564105219065",
  appId: "1:564105219065:web:9e56aa967e7974f04b8b28",
  measurementId: "G-W9X24DV2PJ",
};

const FIREBASE_REST_API = {
  signInWithEmailAndPassword:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
  signUpWithEmailAndPassword:
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
};

const getAPIURL = (url) => {
  return url + firebaseConfig.apiKey;
};

const firebaseAPI = {
  async signInWithEmailAndPassword(email, password) {
    return await axios.post(
      getAPIURL(FIREBASE_REST_API.signInWithEmailAndPassword),
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  },
  async signUpWithEmailAndPassword(email, password) {
    return await axios.post(
      getAPIURL(FIREBASE_REST_API.signUpWithEmailAndPassword),
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  },
  async refreshUserToken(){
    
  }
};

export default firebaseAPI;
