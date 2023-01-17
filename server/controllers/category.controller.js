const CategoryService = require("../services/category.service");

const CategoryController = {
  async getAllCategories(req, res, next) {
    try {
      const response = await CategoryService.getAllCategories();
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async getCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const response = await CategoryService.getCategory(categoryId);
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async createCategory(req, res, next) {
    try {
      const response = await CategoryService.createCategory(req.body);
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async updateCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const response = await CategoryService.updateCategory(
        categoryId,
        req.body
      );
      return res.json({ message: "Category updated successfully!" });
    } catch (ex) {
      next(ex);
    }
  },
  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const response = await CategoryService.deleteCategory(categoryId);
      res.json({ message: "Category deleted successfully!" });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = CategoryController;
