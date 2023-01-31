const router = require("express").Router();
const AdminRoutes = require("./admin.routes");
const UserRoutes = require("./user.routes");
const CategoryRoutes = require("./category.routes");
const AddressRoutes = require("./address.routes");
const CartRoutes = require("./cart.routes");
const ProductRoutes = require("./product.routes");
const OrderRoutes = require("./order.routes");
const { isAdmin } = require("../middlewares/auth");
// const { isAuthorized } = require("../middlewares/auth");

router.use("/Admin", isAdmin, AdminRoutes);
router.use("/User", UserRoutes);
router.use("/Address", AddressRoutes);
router.use("/Category", CategoryRoutes);
router.use("/Cart" /*, isAuthorized*/, CartRoutes);
router.use("/Product", ProductRoutes);
router.use("/Order", OrderRoutes);
router.use("/Account", OrderRoutes);
router.use("/Profile", OrderRoutes);

module.exports = router;
