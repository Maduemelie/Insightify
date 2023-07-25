const Sales = require("../models/salesModel");
const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const catchAsync = require("../utils/catchAsync");

const createNewSale = catchAsync(async (req, res) => {
  const { product, customer, ...rest } = req.body;

   // Split the customer name into first name and last name
   const [firstName, lastName] = customer.split(" ");

   // Find the corresponding Product and Customer documents using their names
   const [foundProduct, foundCustomer] = await Promise.all([
     Product.findOne({ productName: product }).select("_id"),
     Customer.findOne({ firstName, lastName }).select("_id"),
   ]);
 
  // Ensure that both Product and Customer exist
  if (!foundProduct || !foundCustomer) {
    return res.status(404).json({ error: "Product or Customer not found" });
  }

  const sale = await Sales.create({
    product: foundProduct,
    customer: foundCustomer,
    ...rest,
  });
  res.status(201).json({ sale });
});

module.exports = { createNewSale };
