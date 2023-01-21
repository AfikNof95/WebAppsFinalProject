const admin = require("firebase-admin");
const fireBaseConfig = require("./firebaseAdminConfig.json");

admin.initializeApp(fireBaseConfig);

const isAuthorized = async (res, req, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      await admin.auth().verifyIdToken(token);
      return next();
    } catch (ex) {
      console.error(ex.message);
      return res.status(403).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { isAuthorized };
