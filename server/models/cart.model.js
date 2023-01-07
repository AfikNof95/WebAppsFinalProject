const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const CartModel = new Schema(
  {
    products: {
      count: Number,
      product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    user: String, //We get it from the firebase UID
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartModel);
