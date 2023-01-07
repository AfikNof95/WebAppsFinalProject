const CartModel = require("../models/cart.model");

const CartService = {
  async getCart(userId) {
    return await CartModel.find({ user: userId });
  },
  async createCart(userId) {
    return await CartModel.create({ user: userId });
  },
  async updateCart(cart) {
    return await CartModel.updateOne({ user: cart.userId }, cart);
  },
};

module.exports = CartService;
