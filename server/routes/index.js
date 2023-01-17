const router = require("express").Router();
const UserRoutes = require("./user.routes");
const CategoryRoutes = require("./category.routes");
const AddressRoutes = require("./address.routes");
const CartRoutes = require("./cart.routes");
const ProductRoutes = require("./product.routes");
const OrderRoutes = require("./order.routes");

router.use("/User", UserRoutes);
router.use("/Address", AddressRoutes);
router.use("/Category", CategoryRoutes);
router.use("/Cart", CartRoutes);
router.use("/Product", ProductRoutes);
router.use("/Order", OrderRoutes);

module.exports = router;
