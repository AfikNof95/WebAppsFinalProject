const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const CartModel = new Schema(
  {
    products: [
      {
        quantity: { type: Number, default: 1 },
        product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      },
    ],
    user: { type: String, unique: true }, //We get it from the firebase UID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartModel);
