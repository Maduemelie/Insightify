const Sales = require("../models/salesModel");
const Product = require("../models/productModel");
const Customer = require("../models/customerModel");
const catchAsync = require("../utils/catchAsync");

const createNewSale = catchAsync(async (req, res) => {
    const {
      product,
      customer,
      quantity,
      totalAmount,
      saleDate,
      paymentMethod,
      paymentStatus,
      discount,
      salesPerson,
    } = req.body;
  
    const sale = await Sales.create({
      product,
      customer,
      quantity,
      totalAmount,
      saleDate,
      paymentMethod,
      paymentStatus,
      discount,
      salesPerson,
    });
  
    res.status(201).json({ sale });
  });
  

module.exports = {createNewSale}