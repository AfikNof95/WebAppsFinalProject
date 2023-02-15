const { default: mongoose } = require('mongoose');
const OrderModel = require('../models/order.model');
const productModel = require('../models/product.model');
const { broadCastUser } = require('../middlewares/webSocketServer');
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

   createOrder(order) {
    return new Promise(async (resolve,reject)=>{
      const session = await mongoose.connection.startSession();
      try {
        await session.startTransaction();
        let totalPrice = 0;
        order.products = order.products.map((product) => {
          totalPrice += product.quantity * product.product.price;
          return {
            quantity: product.quantity,
            product: new ObjectId(product.product._id)
          };
        });
        order.totalPrice = totalPrice;
  
        for (let product of order.products) {
          const mongoProduct = await productModel.findOne(
            { _id: new ObjectId(product.product._id) },
            null,
            { session }
          );
          if (mongoProduct.quantity < product.quantity) {
            return reject(new Error('OUT_OF_STOCK'));
          } else {
            await productModel.findOneAndUpdate(
              { _id: new ObjectId(product.product._id) },
              { quantity: mongoProduct.quantity - product.quantity },
              { session }
            );
          }
        }
        const newOrder = await OrderModel.create([order],{session});
        await session.commitTransaction();
        return resolve(newOrder);
      } catch (ex) {
        await session.abortTransaction();
        return reject(ex)
      }
    })
    
  },

  async updateOrder(orderId, order, isAdmin) {
    const session = await mongoose.connection.startSession();
    try {
      await session.startTransaction();
      const originalOrder = await OrderModel.findById(orderId, null, { session })
        .populate(['products.product'])
        .lean()
        .exec();
      if (!isAdmin && originalOrder.status !== 'Created') {
        throw new Error('Order already shipped!');
      }
      const updatedOrder = await OrderModel.findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        order,
        { session }
      );

      if (!updatedOrder) {
        throw new Error('Order not found!');
      }

      if (isAdmin) {
        if (originalOrder.isActive !== order.isActive) {
          broadCastUser(order.user, {
            message: `Order ${order._id} has been ${order.isActive ? 'restored' : 'canceled'}!`,
            severity: order.isActive ? 'info' : 'error'
          });
        } else if (order.isActive && originalOrder.status !== order.status) {
          broadCastUser(order.user, {
            message: `Order ${order._id} has been ${order.status.toLowerCase()}`,
            severity: 'info'
          });
        }
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
              { quantity: originalOrderProduct.product.quantity + count },
              { session }
            );
          } else {
            const prod = await productModel.findOneAndUpdate(
              { _id: originalOrderProduct.product._id },
              {
                quantity:
                  originalOrderProduct.product.quantity -
                  Math.abs(product.quantity - originalOrderProduct.quantity)
              },
              { session }
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
    const canceled = await OrderModel.find({ isActive: false });
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

    byStatus.push({ _id: 'Canceled', count: canceled.length });

    return {
      count,
      monthlyProfit,
      byStatus
    };
  }
};

module.exports = OrderService;
