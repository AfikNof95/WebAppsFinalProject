const AddressModel = require('../models/address.model');
const ObjectId = require('mongoose').Types.ObjectId;

const AddressService = {
  async getAddress(addressId) {
    return await AddressModel.find({ _id: new ObjectId(addressId) });
  },
  async getAddressByUserId(userId) {
    return await AddressModel.find({ user: userId });
  },
  async createAddress(address) {
    return await AddressModel.create(address);
  },
  async updateAddress(addressId, address) {
    const updatedAddress = await AddressModel.findOneAndUpdate(
      { user: address.user, _id: new ObjectId(addressId) },
      address
    );

    if (!updatedAddress) {
      throw new Error('Address not found!');
    }

    return updatedAddress;
  },
  async deleteAddress(addressId) {
    const deletedAddress = await AddressModel.findOneAndUpdate(
      {
        _id: new ObjectId(addressId),
        isActive: true
      },
      { isActive: false }
    );

    if (!deletedAddress) {
      throw new Error('Address not found!');
    }

    return deletedAddress;
  }
};

module.exports = AddressService;
