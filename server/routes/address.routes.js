const router = require("express").Router();
const AddressController = require("../controllers/address.controller");
router.get("/:userId/:addressId");
router.get("/:addressId");
router.post("/", AddressController.createAddress);

module.exports = router;
