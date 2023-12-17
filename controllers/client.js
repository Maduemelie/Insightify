const Product = require('../models/productModel');
const ProductStat = require('../models/productStats');
const catchAsync = require('../utils/catchAsync');

const createNewProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
});

const getAllProducts = catchAsync(async (req, res) => {
  const productsWithStats = await Product.aggregate([
    {
      $lookup: {
        from: 'productstats',
        localField: '_id',
        foreignField: 'productId',
        as: 'stat',
      },
    },
    {
      $project: {
        _id: 0,
        ...Product.schema.obj,
        stat: 1,
      },
    },
  ]);
console.log(productsWithStats);
  res.status(200).json(productsWithStats);
});

module.exports = { createNewProduct  , getAllProducts };
