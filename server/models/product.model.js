const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const ProductModel = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required!'],
      minLength: [1, 'Product name should not be empty!']
    },
    description: {
      type: String,
      required: [true, 'Product description is required!'],
      minLength: [1, 'Product description should not be empty!']
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required!'],
      min: [0, 'Product quantity should be higher than 0!']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price should be higher than 0!']
    },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductModel);
