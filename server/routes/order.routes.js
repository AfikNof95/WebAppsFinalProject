const OrderController = require('../controllers/order.controller');
const { isAuthorized } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', OrderController.getAllOrders);
router.get('/id/:orderId', OrderController.getOrderById);

router.get('/User/:userId', OrderController.getOrderByUserId);

router.post('/', OrderController.createOrder);
router.put('/id/:orderId',isAuthorized, OrderController.updateOrder);

router.delete('/id/:orderId',isAuthorized ,OrderController.deleteOrder);

module.exports = router;
