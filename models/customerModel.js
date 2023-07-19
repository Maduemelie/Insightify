const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  companyName: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  gender: {
    type: String,
  },
  notes: {
    type: String,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
