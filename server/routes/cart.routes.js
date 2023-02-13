const CartController = require('../controllers/cart.controller');
const { isAuthorized } = require('../middlewares/auth');
const router = require('express').Router();

router.get('/User/:userId', isAuthorized, CartController.getCart);
router.post('/User/:userId', isAuthorized, CartController.createCart);
router.put('/User/:userId', isAuthorized, CartController.updateCart);
router.delete('/User/:userId', isAuthorized, CartController.deleteCart);

module.exports = router;
