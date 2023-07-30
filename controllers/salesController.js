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
          totalProit: { $sum: "$profit"  },
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
  console.log(dailySales);
  res.status(200).json({ dailySales });
});

// const updateProducts = async () => {
//   try {
//     // Update documents that have "sellingPrice" and do not have "unitPrice"
//     await Sales.updateMany(
//       { sellingPrice: { $exists: true }, unitPrice: { $exists: false } },
//       console.log("Updating products..."),
//       { $unset: { sellingPrice: "" } },
//       console.log("All products updated successfully."),
//       { maxTimeMS: 60000 } // Set the timeout limit to 1 minute
//     );

//     console.log("Updating products...");

//     // Find documents that do not have "unitPrice" or "sellingPrice" using a cursor
//     const cursor = Sales.find({
//       $or: [
//         { unitPrice: { $exists: false } },
//         { sellingPrice: { $exists: false } },
//       ],
//     }).cursor();

//     // Update documents without "unitPrice" or "sellingPrice" using the cursor
//     for (
//       let doc = await cursor.next();
//       doc != null;
//       doc = await cursor.next()
//     ) {
//       // Calculate the unitPrice by dividing the totalAmount by quantity
//       const unitPrice = doc.totalAmount / doc.quantity;

//       // Update the document with the calculated unitPrice
//       await Sales.updateOne({ _id: doc._id }, { $set: { unitPrice } });
//     }

//     console.log("All products updated successfully.");
//   } catch (error) {
//     console.error("Error updating products:", error);
//   }
// };

// // Call the function to update the products
// updateProducts();

module.exports = { createNewSale, dailySalesAnalysis };
