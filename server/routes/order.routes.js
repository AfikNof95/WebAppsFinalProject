const OrderController = require('../controllers/order.controller');

const router = require('express').Router();

router.get('/', OrderController.getAllOrders);
router.get('/id/:orderId', OrderController.getOrderById);

router.get('/User/:userId', OrderController.getOrderByUserId);

router.post('/', OrderController.createOrder);
router.put('/id/:orderId', OrderController.updateOrder);

router.delete('/id/:orderId', OrderController.deleteOrder);

module.exports = router;
