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
    default: function() {
      // Default selling price can be calculated based on costPrice
      return this.costPrice * 2; // Selling price is twice the cost price
    },
    validate: {
      validator: function(value) {
        // Custom validator to ensure sellingPrice is not less than costPrice
        return value >= this.costPrice;
      },
      message: 'Selling price cannot be less than cost price.',
    },
  },
  category: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  totalQuantitySold: {
    type: Number,
    default: 0,
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


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
