const ProductModel = require("../models/product.model");
const ObjectId = require("mongoose").Types.ObjectId;

const ProductService = {
  async getAllProducts() {
    return await ProductModel.find();
  },
  async getProduct(productId) {
    return await ProductModel.find({ _id: new ObjectId(productId) });
  },
  async createProduct(product) {
    return await ProductModel.create(product);
  },
  async updateProduct(product) {
    return await ProductModel.findOneAndUpdate({
      _id: new ObjectId(product.productId),
      product,
    });
  },
};

module.exports = ProductService;
