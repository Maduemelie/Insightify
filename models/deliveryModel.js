const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Expense = require('./expenseModel');

const deliverySchema = new Schema({
  // Additional fields specific to the delivery type
  deliveryDate: {
    type: Date,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
});

const Delivery = Expense.discriminator('Delivery', deliverySchema);

module.exports = Delivery;
