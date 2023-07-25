const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

const createNewProduct = catchAsync(async (req, res) => { 
    const product = await Product.create(req.body);
    res.status(201).json({ product });
});

module.exports = { createNewProduct };