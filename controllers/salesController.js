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

//function to get the daily sales data
const getDailySalesData = async () => {
  const dailySales = await Sales.aggregate([
    {
      $group: {
        _id: {
          product: "$product",
          saleDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$saleDate" },
          },
        },
        totalAmount: { $sum: "$totalAmount" },
        totalProfit: { $sum: "$profit" },
        quantity: { $sum: "$quantity" },
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
        unitPrice: "$productData.sellingPrice",
        profit: 1,
        totalProfit: 1,
      },
    },
    {
      $sort: {
        saleDate: 1,
      },
    },
  ]);
// console.log(dailySales);
  return dailySales;
};

//function to crate the daily sales analysis
const dailySalesAnalysis = catchAsync(async (req, res) => {
  const dailySales = await getDailySalesData();
  console.log(dailySales);
  res.status(200).json({ dailySales });
});

//function to get the profit analysis
const profitAnalysis = catchAsync(async (req, res) => {
  const dailySales = await getDailySalesData();
  
  const profitByDay = dailySales.reduce((result, sale) => {
    const date = sale.saleDate;
    if (!result[date]) {
      result[date] = {
        totalProfit: 0,
      };
    }
    result[date].totalProfit += sale.totalProfit;
    return result;
  }, {});
  
  res.status(200).json({ profitByDay });
});


//function to render the daily sales page
const renderDailySalesPage = catchAsync(async (req, res) => {
  const dailySales = await getDailySalesData();
  res.status(200).render("incomeDailySaleData", { dailySales });
});
//function to get the best and least selling products
const getBestAndLeastSellingProducts = catchAsync(async (req, res) => {
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
    products.push({
      type: "Best Selling",
      details: bestSellingProductDetails,
      quantitySold: bestSellingProduct[0].totalQuantitySold,
      revenue:
        bestSellingProductDetails.sellingPrice *
        bestSellingProduct[0].totalQuantitySold,
      profit:
        (bestSellingProductDetails.sellingPrice -
          bestSellingProductDetails.costPrice) *
        bestSellingProduct[0].totalQuantitySold,
    });
  }

  if (leastSellingProduct.length > 0) {
    const leastProductId = leastSellingProduct[0]._id;
    const leastSellingProductDetails = await Product.findById(leastProductId);
    products.push({
      type: "Least Selling",
      details: leastSellingProductDetails,
      quantitySold: leastSellingProduct[0].totalQuantitySold,
      revenue:
        leastSellingProductDetails.sellingPrice *
        leastSellingProduct[0].totalQuantitySold,
      profit:
        (leastSellingProductDetails.sellingPrice -
          leastSellingProductDetails.costPrice) *
        leastSellingProduct[0].totalQuantitySold,
    });
  }
  // console.log(products);
  res.status(200).json({ products });
});

const getAllProductsBySales = catchAsync(async (req, res) => {
  const products = await Sales.aggregate([
    {
      $group: {
        _id: "$product",
        totalQuantitySold: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $project: {
        _id: 0,
        productName: "$productDetails.productName",
        costPrice: "$productDetails.costPrice",
        sellingPrice: "$productDetails.sellingPrice",
        totalQuantitySold: 1,
        revenue: {
          $multiply: ["$productDetails.sellingPrice", "$totalQuantitySold"],
        },
        profit: {
          $multiply: [
            {
              $subtract: [
                "$productDetails.sellingPrice",
                "$productDetails.costPrice",
              ],
            },
            "$totalQuantitySold",
          ],
        },
      },
    },
    {
      $sort: { totalQuantitySold: -1 }, // Sort by totalQuantitySold in descending order
    },
  ]);
  // Calculate total revenue and total profit
  const totalRevenue = products.reduce(
    (sum, product) => sum + product.revenue,
    0
  );
  const totalProfit = products.reduce(
    (sum, product) => sum + product.profit,
    0
  );

  // Find the best selling and least selling products
  const bestSellingProduct = products[0];
  const leastSellingProduct = products[products.length - 1];

  res.render("income_bestAndLeast", {
    products,
    totalRevenue,
    totalProfit,
    bestSellingProduct,
    leastSellingProduct,
  });
});

module.exports = {
  createNewSale,
  dailySalesAnalysis,
  getBestAndLeastSellingProducts,
  renderDailySalesPage,
  getAllProductsBySales,
  profitAnalysis,
};
