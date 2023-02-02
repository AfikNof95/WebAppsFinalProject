const ProductController = require('../controllers/product.controller');
const CategoryController = require('../controllers/category.controller');
const OrderController = require('../controllers/order.controller');
const AddressController = require('../controllers/address.controller');
const UserController = require('../controllers/user.controller');

const router = require('express').Router();



/**User Routes */
router.post('/', UserController.getIsAdmin);
router.get('/User/All', UserController.getAllUsers);
router.get('/User/Analytics', UserController.getUsersAnalytics);
router.post('/User/SetAdmin', UserController.setAdmin);
router.put('/User', UserController.updateUser);

/** Product Routes */
router.get('/Product', ProductController.getAllProducts);
router.get('/Product/Analytics', ProductController.getProductsAnalytics);
router.post('/Product', ProductController.createProduct);
router.put('/Product/:productId', ProductController.updateProduct);

/** Category Routes */
router.get('/Category', CategoryController.getAllCategories);

/** Order Routes */
router.get('/Order', OrderController.getAllOrders);
router.put('/Order/:orderId', OrderController.updateOrder);
router.get('/Order/Analytics', OrderController.getOrdersAnalytics);

/** Address Routes */
router.get('/Address/User/:userId', AddressController.getAddressByUserId);

module.exports = router;
