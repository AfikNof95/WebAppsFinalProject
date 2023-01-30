const categoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");
const ObjectId = require("mongoose").Types.ObjectId;

const ProductService = {
  // async getAllProducts(page) {
  //   const pages = Math.ceil((await ProductModel.count()) / 24);
  //   return {
  //     pages,
  //     products: await ProductModel.find()
  //       .skip((page - 1) * 24)
  //       .limit(24)
  //       .exec(),
  //   };
  // },
  async getAllProducts() {
    return { products: await ProductModel.find().populate("category").exec() };
  },
  async getProduct(productId) {
    return await ProductModel.findOne({ _id: new ObjectId(productId) });
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
    let sortBy = { name: 1 };

    for (let filter of Object.keys(filters)) {
      switch (filter) {
        case "categoryId":
          queryFilters.category = filters.categoryId;
          break;
        case "minPrice":
          if (!queryFilters["$and"]) {
            queryFilters["$and"] = [];
          }
          queryFilters["$and"].push(
            { price: { $lte: filters.maxPrice } },
            { price: { $gte: filters.minPrice } }
          );
          break;
        case "freeText":
          if (!queryFilters["$or"]) {
            queryFilters["$or"] = [];
          }
          queryFilters["$or"].push(
            { name: { $regex: "^.*" + filters.freeText, $options: "i" } },
            {
              description: { $regex: "^.*" + filters.freeText, $options: "i" },
            }
          );
          break;
        case "sort":
          sortBy = JSON.parse(filters.sort);
          break;
        case "filterOutOfStock":
          if (!queryFilters["$and"]) {
            queryFilters["$and"] = [];
          }
          queryFilters["$and"].push({ quantity: { $gte: 1 } });
          break;
      }
    }

    const pages = Math.ceil(
      (await ProductModel.count({ isActive: true, ...queryFilters })) / 24
    );

    let minPrice = await ProductModel.findOne({}).sort({ price: 1 }).exec();
    let maxPrice = await ProductModel.findOne({}).sort({ price: -1 }).exec();

    minPrice = Math.floor(minPrice.price);
    maxPrice = Math.ceil(maxPrice.price);

    const products = await ProductModel.find({
      isActive: true,
      ...queryFilters,
    })
      .sort(sortBy)
      .populate("category")
      .skip((filters.pageNumber ? filters.pageNumber - 1 : 0) * 24)
      .limit(24)
      .lean()
      .exec();

    return {
      products,
      pages,
      priceRange: [minPrice, maxPrice],
    };
  },

  async getProductsGroupByCategories() {
    let byCategories = await ProductModel.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    return byCategories;
  },

  async getProductsAnalytics() {
    let byCategories = await this.getProductsGroupByCategories();
    for (let cat of byCategories) {
      const category = await categoryModel.findById(cat._id);
      cat.name = category.name;
    }

    return { byCategories };
  },
};

module.exports = ProductService;
