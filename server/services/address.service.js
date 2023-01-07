const AddressModel = require("../models/address.model");
const ObjectId = require("mongoose").Types.ObjectId;

const AddressService = {
  async getAddress(addressId) {
    return await AddressModel.find({ _id: new ObjectId(addressId) });
  },
  async getAddressByUserId(userId) {
    return await AddressModel.find({ user: userId });
  },
  async createAddress(userId) {
    return await AddressModel.create({ user: userId });
  },
  async updateAddress(address) {
    return await AddressModel.updateOne(
      { user: address.userId, _id: new ObjectId(address._id) },
      address
    );
  },
};

module.exports = AddressService;
