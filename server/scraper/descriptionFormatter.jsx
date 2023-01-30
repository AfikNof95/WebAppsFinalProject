const mongoose = require("mongoose");
const ProductModel = require("../models/product.model");
const ObjectId = require("mongoose").Types.ObjectId;

const descriptionFormatter = async () => {
  await mongoose.connect(
    "mongodb+srv://afikn:g9DdFeyb4SKZz4Vx@cluster0.xjawb8j.mongodb.net/Effi"
  );
  const prods = await ProductModel.find().lean().exec();

  let i = 1;

  for (let prod of prods) {
    console.log(`Formatting ${i}/${prods.length}`);
    prod.description = prod.description
      .split("  ")
      .filter((desc) => desc !== "")
      .map((desc) => desc.trim())
      .join("\n");

    await ProductModel.findOneAndUpdate(
      { _id: new ObjectId(prod._id) },
      { ...prod }
    );
    ++i;
  }
  process.exit();
};

descriptionFormatter();
