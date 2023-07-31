const Expense = require("../models/expenseModel");
const catchAsync = require("../utils/catchAsync");
const Delivery = require("../models/deliveryModel");
const Advert = require("../models/advertModel");
const ItemPurchase = require("../models/itemPurchasedModel");

const createNewExpense = catchAsync(async (req, res) => {
  const { type, description, amount, date } = req.body;
  console.log(req.body);
  // Create a new expense document based on the expense type
  let newExpense;
  switch (type) {
    case "delivery":
      const deliveryData = {
        deliveryDate: req.body.deliveryDate,
        recipientName: req.body.recipientName,
      };
      newExpense = await Delivery.create({
        description,
        amount,
        date,
        ...deliveryData,
      });
      break;
    case "advert":
      newExpense = await Advert.create({
        type,
        description,
        amount,
        date,
        // Add any specific properties for the advert expense
        platform: req.body.platform,
      });
      break;
    case "itemPurchase":
      console.log(req.body.type);
      newExpense = await ItemPurchase.create({
        type,
        description,
        amount,
        date,
        // Add any specific properties for the office equipment purchase expense
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
      });
      break;
    default:
      return res.status(400).json({ error: "Invalid expense type" });
  }
  res.status(201).json({
    status: "success",
    data: {
      expense: newExpense,
    },
  });
});
const dailyExpenseAnalysis = catchAsync(async (req, res) => {
  let dailyExpenses = await Expense.aggregate([
    {
      $group: {
        _id: {
          expenseType: "$__t",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        },
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 }, // Count the number of expenses for each type and date
      },
    },
    {
      $project: {
        _id: 0,
        expenseType: "$_id.expenseType",
        date: "$_id.date",
        totalAmount: 1,
        count: 1,
      },
    },
  ]);
  res.status(200).json({
    dailyExpenses,
  });
});
module.exports = { createNewExpense, dailyExpenseAnalysis };
