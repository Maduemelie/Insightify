const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
  profit: {
    type: Number,
  },
  saleDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Bank Transfer"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid"],
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  salesPerson: {
    type: String,
  },
});
// Pre-save middleware to set the default unitPrice based on the sellingPrice of the product
salesSchema.pre("save", async function (next) {
  try {
    const product = await mongoose.model("Product").findById(this.product);

    if (!product) {
      throw new Error("Product not found");
    }

    this.unitPrice = product.sellingPrice;
    this.totalAmount = this.unitPrice * this.quantity;
    this.profit = (this.unitPrice - product.costPrice) * this.quantity;
    next();
  } catch (error) {
    next(error);
  }
});
// Function to update product stock quantity after a new sale
const updateProductStockQuantity = async (productId, soldQuantity) => {
  try {
    const Product = mongoose.model("Product");
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    product.stockQuantity -= soldQuantity;
    product.totalQuantitySold += soldQuantity;
    await product.save();
  } catch (error) {
    throw error;
  }
};

// Post-save middleware to trigger the update of product stock quantity after a new sale
salesSchema.post("save", async function (doc) {
  try {
    await updateProductStockQuantity(doc.product, doc.quantity);
  } catch (error) {
    console.error("Error updating product stock quantity:", error);
  }
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
