const ProductService = require("../services/product.service");

const ProductController = {
  async getProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const response = await ProductService.getProduct(productId);
      return res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async getAllProducts(req, res, next) {
    try {
      const response = await ProductService.getAllProducts();
      return res.json(response);
    } catch (ex) {
      console.log(ex);
      next(ex);
    }
  },
  async createProduct(req, res, next) {
    try {
      const response = await ProductService.createProduct(req.body);
      return res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async updateProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const response = await ProductService.updateProduct(productId, req.body);
      return res.json({ message: "Product updated successfully!" });
    } catch (ex) {
      next(ex);
    }
  },
  async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const response = await ProductService.deleteProduct(productId);
      return res.json({ message: "Product deleted successfully!" });
    } catch (ex) {
      next(ex);
    }
  },
  async getAllProductsByFilters(req, res, next) {
    try {
      const products = await ProductService.getAllProductsByFilters(req.query);
      return res.json(products);
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = ProductController;
