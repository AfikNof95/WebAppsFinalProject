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
  auth: {
    signInWithEmailAndPassword:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    signUpWithEmailAndPassword:
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    refreshToken: "https://identitytoolkit.googleapis.com/v1/token?key=",
  },
  user: {
    updateUser:
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=",
  },
  admin: {
    user: {
      isAdmin: "http://localhost:2308/Admin",
      getAll: "http://localhost:2308/Admin/User/All",
      update: "http://localhost:2308/Admin/User",
    },
    category: {
      getAll: "http://localhost:2308/Admin/Category",
    },
    product: {
      getAll: "http://localhost:2308/Admin/Product",
      create: "http://localhost:2308/Admin/Product",
      update: "http://localhost:2308/Admin/Product",
    },
    order: {},
  },
};

const getAPIURL = (url) => {
  return url + firebaseConfig.apiKey;
};

const firebaseAPI = {
  /** Auth API */
  auth: {
    async signInWithEmailAndPassword(email, password) {
      return await axios.post(
        getAPIURL(FIREBASE_REST_API.auth.signInWithEmailAndPassword),
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
    },
    async signUpWithEmailAndPassword(email, password) {
      return await axios.post(
        getAPIURL(FIREBASE_REST_API.auth.signUpWithEmailAndPassword),
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
    },
    async refreshToken(refreshToken) {
      return await axios.post(getAPIURL(FIREBASE_REST_API.auth.refreshToken), {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
    },
  },

  /**User API */
  user: {
    async update(user) {
      return await axios.post(getAPIURL(FIREBASE_REST_API.updateUser), user);
    },
  },

  /**Admin API */
  admin: {
    user: {
      async isAdmin(token) {
        return await axios.post(
          FIREBASE_REST_API.admin.user.isAdmin,
          { token },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      },
      async getAll(token) {
        return await axios.get(FIREBASE_REST_API.admin.user.getAll, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      },
      async update(newUserDetails, token) {
        return await axios.put(
          FIREBASE_REST_API.admin.user.update,
          {
            ...newUserDetails,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      },
    },
    product: {
      async getAll(token) {
        return await axios.get(FIREBASE_REST_API.admin.product.getAll, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      },
      async create(newProductDetails) {
        return await axios.post(FIREBASE_REST_API.admin.product.create, {
          ...newProductDetails,
        });
      },
      async update(newProductDetails, token) {
        return await axios.put(
          FIREBASE_REST_API.admin.product.update + `/${newProductDetails._id}`,
          {
            ...newProductDetails,
          }
        );
      },
    },
    category: {
      async getAll(token) {
        return await axios.get(FIREBASE_REST_API.admin.category.getAll);
      },
    },
    order: {},
  },
};

export default firebaseAPI;
