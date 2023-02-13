const router = require('express').Router();
const AdminRoutes = require('./admin.routes');
const UserRoutes = require('./user.routes');
const CategoryRoutes = require('./category.routes');
const AddressRoutes = require('./address.routes');
const CartRoutes = require('./cart.routes');
const ProductRoutes = require('./product.routes');
const OrderRoutes = require('./order.routes');
const { isAdmin, isAuthorized } = require('../middlewares/auth');
// const { isAuthorized } = require("../middlewares/auth");

router.use('/Admin', isAdmin, AdminRoutes);
router.use('/User', isAuthorized, UserRoutes);
router.use('/Address', isAuthorized, AddressRoutes);
router.use('/Category', CategoryRoutes);
router.use('/Cart', isAuthorized, CartRoutes);
router.use('/Product', ProductRoutes);
router.use('/Order', isAuthorized, OrderRoutes);
router.use('/Account', isAuthorized, OrderRoutes);
router.use('/Profile', isAuthorized, OrderRoutes);

module.exports = router;
