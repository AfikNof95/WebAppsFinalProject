const CartService = require('../services/cart.service');

const CartController = {
  async getCart(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await CartService.getCart(userId);
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async createCart(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await CartService.createCart(userId);
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async updateCart(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await CartService.updateCart(userId, req.body);
      return res.json({ message: 'Cart updated successfully!' });
    } catch (ex) {
      next(ex);
    }
  },
  async deleteCart(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await CartService.deleteCart(userId);
      return res.json({ message: 'Cart deleted successfully!' });
    } catch (ex) {
      next(ex);
    }
  }
};

module.exports = CartController;
