const Sales = require("../models/salesModel");
const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const catchAsync = require("../utils/catchAsync");

const createNewSale = catchAsync(async (req, res) => {
  const {
    product: productId,
    customer: customerId,
    quantity,
    totalAmount,
    saleDate,
    paymentMethod,
    paymentStatus,
    discount,
    salesPerson,
  } = req.body;

  // Find the corresponding Product and Customer documents using their IDs
  const product = await Product.findById(productId);
  const customer = await Customer.findById(customerId);

  // Ensure that both Product and Customer exist
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  const sale = await Sales.create({
    product,
    customer,
    quantity,
    totalAmount,
    saleDate,
    paymentMethod,
    paymentStatus,
    discount,
    salesPerson,
  });

  res.status(201).json({ sale });
});

module.exports = { createNewSale };
