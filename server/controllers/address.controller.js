const AddressService = require("../services/address.service");

const AddressController = {
  async getAddress(req, res, next) {
    try {
      const { addressId } = req.query;
      const response = await AddressService.getAddress(addressId);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
  async getAddressByUserId(req, res, next) {
    try {
      const { userId, addressId } = req.query;
      const response = await AddressService.getAddressByUserId(
        userId,
        addressId
      );
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
  async createAddress(req, res, next) {
    try {
      const { userId, addressId } = req.body;
      const response = await AddressService.createAddress(userId, addressId);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      res.status('400').json(ex.errors);
      next(ex);
    }
  },
  async updateAddress(req, res, next) {
    try {
      const { addressId } = req.body;
      const response = await AddressService.updateAddress(addressId);
      res.json(response);
    } catch (ex) {
      console.error(ex.message);
      console.log(ex.stack);
      next(ex);
    }
  },
};

module.exports = AddressController;
