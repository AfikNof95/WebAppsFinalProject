const CartService = require("../services/cart.service");
const CartController = {
  async getCart(req, res, next) {
    try {
      const response = await CartService.getCart(req.body.userId);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
  async createCart(req, res, next) {
    try {
      const response = await CartService.createCart(req.body.userId);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
  async updateCart(req, res, next) {
    try {
      const response = await CartService.updateCart(req.body.cart);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
};

module.exports = CartController;
