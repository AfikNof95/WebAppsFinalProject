const CartController = require('../controllers/cart.controller');
const router = require('express').Router();

router.get('/User/:userId', CartController.getCart);
router.post('/User/:userId', CartController.createCart);
router.put('/User/:userId', CartController.updateCart);
router.delete('/User/:userId', CartController.deleteCart);

module.exports = router;
