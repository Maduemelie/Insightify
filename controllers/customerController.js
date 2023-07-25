const catchAsync = require("../utils/catchAsync");
const Customer = require("../models/customerModel");

const createNewCustomer = catchAsync(async (req, res) => { 
    const customer = await Customer.create(req.body);
    res.status(201).json({ customer });
});

const getAllCustomers = catchAsync(async (req, res) => { 
    const customers = await Customer.find();
    res.status(200).json({ customers });
});

module.exports = { createNewCustomer, getAllCustomers };