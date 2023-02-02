const AddressService = require("../services/address.service");

const AddressController = {
  async getAddress(req, res, next) {
    try {
      const { addressId } = req.params;
      const response = await AddressService.getAddress(addressId);
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },
  async getAddressByUserId(req, res, next) {
    try {
      const { userId, addressId } = req.params;
      const response = await AddressService.getAddressByUserId(
        userId,
        addressId
      );
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },

  async createAddress(req, res, next) {
    try {
      const response = await AddressService.createAddress(req.body);
      res.json(response);
    } catch (ex) {
      next(ex);
    }
  },

  async updateAddress(req, res, next) {
    try {
      const { addressId } = req.params;
      const response = await AddressService.updateAddress(addressId, req.body);
      return res.json({ message: "Address updated successfully!" });
    } catch (ex) {
      next(ex);
    }
  },
  async deleteAddress(req, res, next) {
    try {
      const { addressId } = req.params;
      const response = await AddressService.deleteAddress(addressId);
      return res.json({ message: "Address deleted successfully!" });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = AddressController;
