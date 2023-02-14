const { default: mongoose } = require('mongoose');
const OrderModel = require('../models/order.model');
const productModel = require('../models/product.model');
const ObjectId = require('mongoose').Types.ObjectId;

const OrderService = {
  async getAllOrders() {
    return await OrderModel.find().populate(['address', 'products.product']);
  },

  async getOrderById(orderId) {
    return await OrderModel.find({ _id: new ObjectId(orderId) }).populate('products.product');
  },

  async getOrderByUserId(userId) {
    return await OrderModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('products.product');
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

  async updateOrder(orderId, order, isAdmin) {
    try {
      const session = await mongoose.connection.startSession();
      await session.startTransaction();
      const originalOrder = await OrderModel.findById(orderId)
        .populate(['products.product'])
        .lean()
        .exec();
      if (!isAdmin && originalOrder.status !== 'Created') {
        throw new Error('Order already shipped!');
      }
      const updatedOrder = await OrderModel.findOneAndUpdate({ _id: new ObjectId(orderId) }, order);
      if (!updatedOrder) {
        throw new Error('Order not found!');
      }
      for (let product of order.products) {
        const originalOrderProduct = originalOrder.products.find(
          (prod) => prod.product._id.toString() === product.product._id
        );
        if(order.isActive === false){
          const prod = await productModel.findOneAndUpdate(
            { _id: originalOrderProduct.product._id },
            { quantity: originalOrderProduct.product.quantity + product.quantity }
          );
        }
        else if (originalOrderProduct && originalOrderProduct.quantity !== product.quantity) {
          if (originalOrderProduct.quantity > product.quantity) {
            const count = originalOrderProduct.quantity - product.quantity;
            const prod = await productModel.findOneAndUpdate(
              { _id: originalOrderProduct.product._id },
              { quantity: originalOrderProduct.product.quantity + count }
            );
          } else {
            const prod = await productModel.findOneAndUpdate(
              { _id: originalOrderProduct.product._id },
              { quantity: originalOrderProduct.product.quantity - Math.abs(product.quantity - originalOrderProduct.quantity)}
            );
          }
        }
      }

      await session.commitTransaction();
      return updatedOrder;
    } catch (ex) {
      session.abortTransaction();
      throw ex;
    }
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
