const OrderService = require("../services/order.service");

const OrderController = {

  async getOrderById(req, res, next) {
    try {
      const { orderId } = req.params;
      const response = await OrderService.getOrderById(orderId);
      return res.json(response);
    } catch (ex) {
      next(ex);
    }
  },

  async getOrderByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await OrderService.getOrderByUserId(userId);
      return res.json(response);
    } catch (ex) {
      next(ex);
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const response = await OrderService.getAllOrders();
      return res.json(response);
    } catch (ex) {
      next(ex);
    }
  },

  async createOrder(req, res, next) {
    try {
      const response = await OrderService.createOrder(req.body);
      return res.json(response);
    } catch (ex) {
      next(ex);
    }
  },

  async updateOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const response = await OrderService.updateOrder(orderId, req.body);
      return res.json({ message: "Order updated successfully!" });
    } catch (ex) {
      next(ex);
    }
  },

  async deleteOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const response = await OrderService.deleteOrder(orderId);
      return res.json({ message: "Order deleted successfully!" });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = OrderController;
