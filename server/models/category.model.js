const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const CategoryModel = new Schema(
  {
    name: {
      type: String,
      unique:[true,"Category already exists!"],
      required: [true, "Category name should not be empty!"],
      min: [1, "Category name should not be empty!"],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategoryModel);
