const { getAuth } = require('firebase-admin/auth');

const isAuthorized = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const response = await getAuth().verifyIdToken(token);
      const user = await getAuth().getUser(response.uid);
      if (user.disabled) {
        return res.status(403).send('USER_DISABLED');
      }
      return next();
    } catch (ex) {
      console.error(ex.message);
      console.error(ex);
      return res.status(403).send('Unauthorized');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
};

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const claims = await getAuth().verifyIdToken(token);
      if (claims.isAdmin) return next();
      return res.status(401).send('Unauthorized');
    } catch (ex) {
      console.error(ex.message);
      return res.status(401).send('Unauthorized');
    }
  } else {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = { isAuthorized, isAdmin };
