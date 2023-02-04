const { response } = require('express');
const CategoryModel = require('../models/category.model');
const ObjectId = require('mongoose').Types.ObjectId;

const CategoryService = {
  async getAllCategories() {
    return await CategoryModel.find();
  },
  async getCategory(categoryId) {
    return await CategoryModel.find({ _id: new ObjectId(categoryId) });
  },
  async createCategory(category) {
    const isExist = CategoryModel.findOne({ name: category.name });
    if (isExist) {
      throw new Error('Category already exists!');
    }
    return await CategoryModel.create(category);
  },
  async updateCategory(categoryId, category) {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: new ObjectId(categoryId) },
      category
    );

    if (!updatedCategory) {
      throw new Error('Category not found!');
    }

    return updatedCategory;
  },
  async deleteCategory(categoryId) {
    const deletedCategory = await CategoryModel.findOneAndUpdate(
      {
        _id: new ObjectId(categoryId)
      },
      { isActive: false }
    );

    if (!deletedCategory) {
      throw new Error('Category not found!');
    }

    return deletedCategory;
  }
};

module.exports = CategoryService;
