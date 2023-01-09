const OrderModel = require("../models/order.model");
const ObjectId = require("mongoose").Types.ObjectId;

const OrderService = {
  async getAllOrders() {
    return await OrderModel.find();
  },
  async getOrderById(orderId) {
    return await OrderModel.find({ _id: new ObjectId(orderId) }).populate(
      "products.product"
    );
  },
  async getOrderByUserId(userId) {
    return await OrderModel.find({ user: userId }).populate("products.product");
  },
  async createOrder(order) {
    order.products = order.products.map((product) => {
      return { count: product.count, product: new ObjectId(product.product) };
    });
    console.log(order);
    return (await OrderModel.create(order)).populate("products.product");
  },
  async updateOrder(orderId, order) {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      order
    );
    if (!updatedOrder) {
      throw new Error("Order not found!");
    }

    return updatedOrder;
  },
  async updateOrder(orderId) {
    
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { isActive: false }
    );

    if (!updatedOrder) {
      throw new Error("Order not found!");
    }

    return updatedOrder;
  },
};

module.exports = OrderService;
