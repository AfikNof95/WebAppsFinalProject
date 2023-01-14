const CartModel = require("../models/cart.model");
const ObjectId = require("mongoose").Types.ObjectId;
const CartService = {
  async getCart(userId) {
    return await CartModel.find({ user: userId });
  },
  async createCart(userId) {
    const isExist = await CartModel.findOne({ user: userId });
    if (isExist) {
      throw new Error("Cart already exists for this user!");
    }
    return await CartModel.create({ user: userId });
  },
  async updateCart(userId, cart) {
    cart.products = cart.products.map((product) => {
      return {
        quantity: product.quantity,
        product: new ObjectId(product.product),
      };
    });
    const updatedCart = await CartModel.updateOne(
      { user: userId },
      { products: cart.products }
    );
    if (!updatedCart) {
      throw new Error("Cart not found!");
    }

    return updatedCart;
  },
  async deleteCart(userId) {
    const deletedCart = await CartModel.findOneAndDelete({ user: userId });
    if (!deletedCart) {
      throw new Error("Cart not found!");
    }

    return deletedCart;
  },
};

module.exports = CartService;
