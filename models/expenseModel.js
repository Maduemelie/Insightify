const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  // type: {
  //   type: String,
  //   enum: ['delivery', 'advert', 'itemPurchase'],
  //   required: true,
  // },
  // Common fields for all types of expenses
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
