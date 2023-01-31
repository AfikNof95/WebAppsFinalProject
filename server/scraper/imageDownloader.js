const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const ProductModel = require("../models/product.model");
const fs = require("fs");
const axios = require("axios");

async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => {
        console.log("Finished downloading: " + filepath);
        resolve(filepath);
      });
  });
}

const imageDownloader = async () => {
  await mongoose.connect(
    "mongodb+srv://afikn:g9DdFeyb4SKZz4Vx@cluster0.xjawb8j.mongodb.net/Effi"
  );
  console.log("Image Downloader Running");

  const products = await ProductModel.find().lean().exec();

  for (let product of products) {
    const images = [];
    for (let imageURL of product.images) {
      const imageName = imageURL
        .split("/")
        .filter((pathName) => pathName.indexOf(".jpg") !== -1);

      console.log(imageName);

      try {
        // await downloadImage(imageURL, "../public/images/" + imageName[0]);
        console.log("Image Downloaded!");
        images.push(`http://localhost:2308/images/${imageName[0]}`);
      } catch (ex) {
        console.error("Failed to download image for: " + product.name);
      }
    }
    product.images = images;
    await ProductModel.findOneAndUpdate(
      { _id: new ObjectId(product._id) },
      product
    );
  }
};

try {
  imageDownloader();
} catch (ex) {
  console.error(ex);
}
