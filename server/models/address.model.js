const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const AddressModel = new Schema(
  {
    country: {
      type: String,
      required: [true, "Country field should not be empty!"],
    },
    city: {
      type: String,
      required: [true, "City field should not be empty!"],
    },
    street: {
      type: String,
      required: [true, "Street field should not be empty!"],
    },
    houseNumber: {
      type: Number,
      required: [true, "House number field should not be empty!"],
    },
    zipCode: {
      type: Number,
      required: [true, "Zip code field should not be empty!"],
    },
    user: String, //We get it from the firebase UID
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressModel);
