const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const firebaseConfig = require('./firebaseAdminConfig.json');

const app = initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

const getIsAdmin = async (userToken) => {
  const claims = await getAuth(app).verifyIdToken(userToken);
  return claims.isAdmin === true;
};
const setUserAdmin = async (user) => {
  const claims = await getAuth(app).setCustomUserClaims(user.uid, {
    isAdmin: user.customClaims.isAdmin
  });
  return claims;
};

const listAllUsers = async () => {
  const users = await getAuth(app).listUsers();
  return users;
};

const updateUser = (user) => {
  if (user.customClaims) {
    setUserAdmin(user);
  }

  return getAuth(app).updateUser(user.uid, {
    ...user
  });
};

module.exports = { listAllUsers, updateUser, setUserAdmin, getIsAdmin };
