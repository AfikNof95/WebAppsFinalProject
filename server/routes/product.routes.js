const ProductController = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/id/:productId", ProductController.getProduct);
router.get("/", ProductController.getAllProducts);

router.post(
  "/getAllProductsByFilters",
  ProductController.getAllProductsByFilters
);
router.post("/", ProductController.createProduct);

router.put("/id/:productId", ProductController.updateProduct);

router.delete("/id/:productId",ProductController.deleteProduct)

module.exports = router;