const {
  listAllUsers,
  updateUser,
  setUserAdmin,
  getIsAdmin,
} = require("../models/users.model");

const UserController = {
  async getIsAdmin(req, res, next) {
    try {
      const isAdmin = await getIsAdmin(req.body.token);
      res.send(isAdmin);
    } catch (ex) {
      next(ex);
    }
  },
  async getAllUsers(req, res, next) {
    try {
      const users = await listAllUsers();
      res.json(users);
    } catch (ex) {
      next(ex);
    }
  },
  async setAdmin(req, res, next) {
    try {
      await setUserAdmin(req.body);
      res.json(true);
    } catch (ex) {
      next(ex);
    }
  },
  async updateUser(req, res, next) {
    try {
      const users = await updateUser(req.body);
      res.json(users);
    } catch (ex) {
      next(ex);
    }
  },
  async getUsersAnalytics(req, res, next) {
    try {
      const response = await listAllUsers();
      const activeUsers = { name: "Active users", count: 0 };
      const notActiveUsers = { name: "Disabled users", count: 0 };
      response.users.map((user) => {
        if (user.disabled) {
          return notActiveUsers.count++;
        }
        activeUsers.count++;
      });
      res.json({
        count: response.users.length,
        usersState: [activeUsers, notActiveUsers],
      });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = UserController;
