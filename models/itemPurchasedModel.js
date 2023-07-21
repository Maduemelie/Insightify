const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Expense = require('./expenseModel');

const itemPurchaseSchema = new Schema({
  // Additional fields specific to the item purchase type
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
});

const ItemPurchase = Expense.discriminator('ItemPurchase', itemPurchaseSchema);

module.exports = ItemPurchase;
