const Product = require('../models/productModel');
const ProductStat = require('../models/productStats');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const getCountryIso3 = require('country-iso-2-to-3');

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
        name: '$name',
        price: '$price',
        category: '$category',
        supply: '$supply',
        rating: '$rating',
        description: '$description',
        inStock: '$inStock',
        stat: 1,
      },
    },
  ]);

  res.status(200).json(productsWithStats);
});

const getCustomers = catchAsync(async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(200).json(users);
  // console.log(users)
});

const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: 'i' },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getCustomers,
  getTransactions,
  getGeography,
};
