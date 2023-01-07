const ProductService = require("../services/product.service");

const ProductController = {
  async getProduct(req, res, next) {
    try {
      const response = await ProductService.getProduct(req.body.userId);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
  async createProduct(req, res, next) {
    try {
      const response = await ProductService.createProduct(req.body.userId);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
  async updateProduct(req, res, next) {
    try {
      const response = await ProductService.updateProduct(req.body.cart);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
};

module.exports = ProductController;
