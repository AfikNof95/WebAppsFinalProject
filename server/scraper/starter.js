const scraper = require("./main");
const mongoose = require("mongoose");
const startScraper = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://afikn:g9DdFeyb4SKZz4Vx@cluster0.xjawb8j.mongodb.net/Effi"
    );
    await scraper();
  } catch (ex) {
    console.error(ex);
  }

  process.exit();
};

startScraper();
