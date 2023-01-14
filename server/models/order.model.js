const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const OrderModel = new Schema(
  {
    user: String, //We get it from the firebase UID
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    products: [
      {
        quantity: { type: Number, default: 1 },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Created", "Packed", "Delivered"],
      default: "Created",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderModel);
