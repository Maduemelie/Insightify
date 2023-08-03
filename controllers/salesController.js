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
// Use the aggregation pipeline to calculate the total amount sold for each day and product
const dailySalesAnalysis = catchAsync(async (req, res) => {
  let dailySales = await Sales.aggregate(
    [
      {
        $group: {
          _id: {
            product: "$product",
            saleDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$saleDate" },
            },
          },
          totalAmount: { $sum: "$totalAmount" },
          totalProit: { $sum: "$profit" },
          quantity: { $sum: "$quantity" }, // Count the number of sales for each product and date
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id.product",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $project: {
          _id: 0,
          product: "$productData.productName",
          costPrice: "$productData.costPrice",
          saleDate: "$_id.saleDate",
          totalAmount: 1,
          quantity: 1,
          unitPrice: 1, // Use 1 to preserve the existing value (which is the totalAmount divided by quantity)
          profit: 1, // Use 1 to preserve the existing value (which is the totalAmount minus costPrice)
          totalProit: 1, // Calculate the total profit by multiplying the profit by the quantity
        },
      },
      {
        $sort: {
          saleDate: 1, // Sort in ascending order (earliest to latest date)
        },
      },
    ],
    { cursor: { batchSize: 100 } }
  );
  dailySales = await dailySales.toArray();
  // console.log(dailySales);
  res.status(200).json({ dailySales });
});

//function to get the best and least selling products
const getBestAndLeastSellingProducts = catchAsync(async (req,res) => {
  const bestSellingProduct = await Sales.aggregate([
    {
      $group: {
        _id: "$product",
        totalQuantitySold: { $sum: "$quantity" },
      },
    },
    {
      $sort: { totalQuantitySold: -1 }, 
    },
    {
      $limit: 1, // Get only the top product
    },
  ]);

  const leastSellingProduct = await Sales.aggregate([
    {
      $group: {
        _id: "$product",
        totalQuantitySold: { $sum: "$quantity" },
      },
    },
    {
      $sort: { totalQuantitySold: 1 }, // Sort in ascending order of totalQuantitySold
    },
    {
      $limit: 1, // Get only the top product
    },
  ]);

  const products = [];

  if (bestSellingProduct.length > 0) {
    const bestProductId = bestSellingProduct[0]._id;
    const bestSellingProductDetails = await Product.findById(bestProductId);
    products.push({ type: "Best Selling", details: bestSellingProductDetails });
  }

  if (leastSellingProduct.length > 0) {
    const leastProductId = leastSellingProduct[0]._id;
    const leastSellingProductDetails = await Product.findById(leastProductId);
    products.push({
      type: "Least Selling",
      details: leastSellingProductDetails,
    });
  }
 res.status(200).json({ products });
  // return products;
});

module.exports = {
  createNewSale,
  dailySalesAnalysis,
  getBestAndLeastSellingProducts,
};
