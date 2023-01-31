const {
  listAllUsers,
  updateUser,
  setUserAdmin,
  getIsAdmin,
} = require("../models/users.model");
const FileService = require("../services/file.service");

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
  async uploadPhoto(req, res, next) {
    try {
      console.log(req)
      const { file } = req.body;
      const fileURL = await FileService.uploadImage(file);
      console.log(fileURL);
      res.status(400).json({});
    } catch (ex) {
      res.status(400);
      next(ex);
    }
  },
};

module.exports = UserController;
