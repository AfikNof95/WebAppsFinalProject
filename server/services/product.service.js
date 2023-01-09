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
  async updateProduct(productId, product) {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      product
    );
    if (!updatedProduct) {
      throw new Error("Product not found!");
    }

    return updatedProduct;
  },

  async deleteProduct(productId) {
    const deletedProduct = await ProductModel.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { isActive: false }
    );
    if (!deletedProduct) {
      throw new Error("Product not found!");
    }

    return deletedProduct;
  },
  async getAllProductsByFilters(filters) {
    const queryFilters = {};
    if (filters.minPrice) {
      queryFilters["$and"] = [
        { price: { $lte: filters.maxPrice } },
        { price: { $gte: filters.minPrice } },
      ];
    }
    if (filters.freeText) {
      queryFilters["$or"] = [
        { name: { $regex: "^.*" + filters.freeText, $options: "i" } },
        { description: { $regex: "^.*" + filters.freeText, $options: "i" } },
      ];
    }

    return await Product.find({
      active: true,
      ...queryFilters,
    })
      .sort({ price: filters.sortByPrice })
      .lean()
      .exec();
  },
};

module.exports = ProductService;
