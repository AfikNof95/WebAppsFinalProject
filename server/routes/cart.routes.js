const CartController = require("../controllers/cart.controller");
const router = require("express").Router();

router.get("/user/:userId", CartController.getCart);
router.post("/user/:userId", CartController.createCart);
router.put("/user/:userId", CartController.updateCart);
router.delete("/user/:userId", CartController.deleteCart);

module.exports = router;
