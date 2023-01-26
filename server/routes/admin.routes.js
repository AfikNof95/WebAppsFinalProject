const ProductController = require("../controllers/product.controller");
const {
  listAllUsers,
  updateUser,
  setUserAdmin,
  getIsAdmin,
} = require("../models/users.model");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const isAdmin = await getIsAdmin(req.body.token);
    res.send(isAdmin);
  } catch (ex) {
    res.status(401);
    next(ex);
  }
});

router.get("/User/All", async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (ex) {
    next(ex);
  }
});

router.post("/User/SetAdmin", async (req, res, next) => {
  try {
    await setUserAdmin(req.body);
    res.json(true);
  } catch (ex) {
    next(ex);
  }
});

router.put("/User", async (req, res, next) => {
  try {
    const users = await updateUser(req.body);
    res.json(users);
  } catch (ex) {
    next(ex);
  }
});

router.get("/Product", ProductController.getAllProducts);
router.put("/Product/:productId", ProductController.updateProduct);

module.exports = router;
