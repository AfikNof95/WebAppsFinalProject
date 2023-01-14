const axios = require("axios");
const cheerio = require("cheerio");
const ProductModel = require("../models/product.model");
const productLinks = {
  "Computers & Tablets":
    "https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A13896617011&ref=nav_em__nav_desktop_sa_intl_computers_tablets_0_2_6_4",
  Kitchen:
    "https://www.amazon.com/s?i=specialty-aps&bbn=16225011011&rh=n%3A%2116225011011%2Cn%3A284507&ref=nav_em__nav_desktop_sa_intl_kitchen_and_dining_0_2_17_3",
  Shoes:
    "https://www.amazon.com/s?i=specialty-aps&bbn=16225019011&rh=n%3A7141123011%2Cn%3A16225019011%2Cn%3A679255011&ref=nav_em__nav_desktop_sa_intl_shoes_0_2_13_3",
  Headphones:
    "https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A172541&ref=nav_em__nav_desktop_sa_intl_headphones_0_2_5_8",
  "Video Games":
    "https://www.amazon.com/gp/browse.html?node=16225016011&ref_=nav_em__nav_desktop_sa_intl_video_games_0_2_26_2",
  Watches:
    "https://www.amazon.com/s?i=specialty-aps&bbn=16225018011&rh=n%3A7141123011%2Cn%3A16225018011%2Cn%3A6358543011&ref=nav_em__nav_desktop_sa_intl_watches_0_2_12_5",
};

const productCategories = ["Computers & Tablets", "Kitchen", "Shoes", ""];

const fetchProducts = async () => {
  try {
    const products = [];

    for (let [category, link] of Object.entries(productLinks)) {
      const timeOut = Math.random(3000, 15000);
      await new Promise((res) => setTimeout(res, 10000));
      const response = await axios.get(link);

      const html = response.data;

      let $ = cheerio.load(html);

      const productElements = $(
        "div.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20"
      );

      for (let el of productElements) {
        await new Promise((res) => setTimeout(res, timeOut));
        const product = $(el);
        const name = product
          .find("span.a-size-base-plus.a-color-base.a-text-normal")
          .text();

        const price = product
          .find("span.a-price > span.a-offscreen")
          .first()
          .text()
          .replace("$", "");

        const link = `https://amazon.com${product
          .find("a.a-link-normal.a-text-normal")
          .attr("href")}`;

        const productDetails = await axios.get(link);
        const html = productDetails.data;
        $ = cheerio.load(html);

        const description = $("div#feature-bullets span.a-list-item").text();
        const scripts = $("script");
        let productImages;
        for (let amazonScript of scripts) {
          productImages = $(amazonScript)
            .text()
            .match(/{"hiRes":"https[^"]+"/gi);
          if (productImages) {
            break;
          }
        }
        const images = [];
        if(productImages){
          for (let imageUrl of productImages) {
            imageUrl += "}";
            const url = JSON.parse(imageUrl).hiRes;
            images.push(url);
          }

          let quantity = Math.floor(Math.random() * 101);

          let element = {
            name,
            images,
            price,
            description,
            category,
            quantity,
          };
  
          if (price) {
            products.push(element);
          }

        }


      
      }
    }
    return products;
  } catch (error) {
    throw error;
  }
};

const insertProductsToMongo = async (products) => {
  for (let product of products) {
    await ProductModel.create(product);
  }
};

const initialize = async () => {
  const products = await fetchProducts();
  insertProductsToMongo(products);
};

module.exports = initialize;
