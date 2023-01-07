const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const OrderModel = new Schema(
  {
    user: String, //We get it from the firebase UID
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    products: {
      count: Number,
      product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    status: { type: String, enum: ["Created", "Packed", "Delivered"] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderModel);
