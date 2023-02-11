const OrderModel = require('../models/order.model');
const ObjectId = require('mongoose').Types.ObjectId;

const OrderService = {
  async getAllOrders() {
    return await OrderModel.find().populate(['address', 'products.product']);
  },

  async getOrderById(orderId) {
    return await OrderModel.find({ _id: new ObjectId(orderId) }).populate('products.product');
  },

  async getOrderByUserId(userId) {
    return await OrderModel.find({ user: userId }).populate('products.product');
  },

  async createOrder(order) {
    let totalPrice = 0;
    order.products = order.products.map((product) => {
      totalPrice += product.quantity * product.product.price;
      return {
        quantity: product.quantity,
        product: new ObjectId(product.product._id)
      };
    });
    order.totalPrice = totalPrice;
    return (await OrderModel.create(order)).populate('products.product');
  },

  async updateOrder(orderId, order) {
    const originalOrder = await OrderModel.findById(orderId);
    if (originalOrder.status !== 'Created') {
      throw new Error('Order already shipped!');
    }
    const updatedOrder = await OrderModel.findOneAndUpdate({ _id: new ObjectId(orderId) }, order);
    if (!updatedOrder) {
      throw new Error('Order not found!');
    }

    return updatedOrder;
  },
  async getOrdersAnalytics() {
    const count = await OrderModel.count({ isActive: true });
    const byStatus = await OrderModel.aggregate([
      {
        $match: {
          isActive: true
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    const monthlyProfit = await OrderModel.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          profit: { $sum: '$totalPrice' }
        }
      }
    ]);
    return {
      count,
      monthlyProfit,
      byStatus
    };
  }
};

module.exports = OrderService;
