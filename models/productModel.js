const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  shipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});
// Define a virtual field "profit" to calculate the profit dynamically
productSchema.virtual('profit').get(function () {
    return this.sellingPrice - this.costPrice;
  });
  

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
