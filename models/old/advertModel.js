const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Expense = require('./expenseModel');

const advertSchema = new Schema({
  // Additional fields specific to the advert type
  platform: {
    type: String,
    required: true,
  },
});

const Advert = Expense.discriminator('Advert', advertSchema);

module.exports = Advert;
