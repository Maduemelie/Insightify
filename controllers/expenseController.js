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

module.exports = { createNewExpense };
