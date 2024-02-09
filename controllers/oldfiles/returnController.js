const Return = require('../../models/returnModel'); // Import the Return model
const Product = require('../../models/productModel'); // Import the Product model
const Customer = require('../../models/customerModel'); // Import the Customer model
const catchAsync = require('../../utils/catchAsync'); // Import the catchAsync utility function

const createNewReturn = catchAsync(async (req, res, next) => {
  const { product, customer, ...rest } = req.body;

  // Split the customer name into first name and last name
  const [firstName, lastName] = customer.split(' ');

  // Find the corresponding Product and Customer documents using their names
  const [foundProduct, foundCustomer] = await Promise.all([
    Product.findOne({ productName: product }).select('_id'),
    Customer.findOne({ firstName, lastName }).select('_id'),
  ]);

  // Ensure that both Product and Customer exist
  if (!foundProduct || !foundCustomer) {
    return res.status(404).json({ error: 'Product or Customer not found' });
  }

  const newReturn = await Return.create({
    product: foundProduct,
    customer: foundCustomer,
    ...rest,
  });
  res.status(201).json({
    status: 'success',
    data: {
      newReturn,
    },
  });
});

module.exports = { createNewReturn };
