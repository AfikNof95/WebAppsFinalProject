import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPHJfNEGeaNbsPRkPbiKAG2B-7lAz_kIk",
  authDomain: "reacct-final-effi.firebaseapp.com",
  projectId: "reacct-final-effi",
  storageBucket: "reacct-final-effi.appspot.com",
  messagingSenderId: "564105219065",
  appId: "1:564105219065:web:9e56aa967e7974f04b8b28",
  measurementId: "G-W9X24DV2PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
