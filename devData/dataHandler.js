const fs = require('fs');
const mongoose = require('mongoose');
const productModel = require('../models/productModel');
const saleModel = require('../models/salesModel');
const customerModel = require('../models/customerModel');
require('dotenv').config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
const connectToDb = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(MONGOOSE_URL).then(console.log('connected'));
};
connectToDb();
const customer = JSON.parse(fs.readFileSync(`${__dirname}/customerData.json`));
// const product = JSON.parse(fs.readFileSync(`${__dirname}/productData.json`));
// const sales = JSON.parse(fs.readFileSync(`${__dirname}/salesData.json`));
// console.log(tours);

const deleteData = async () => {
  try {
      await customerModel.deleteMany();
      console.log('customer deleted');
      // await productModel.deleteMany();
      console.log('product deleted'); 
      // await saleModel.deleteMany();
        console.log('sales deleted');
    console.log('files deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const importData = async () => {
  try {
      await customerModel.create(customer);
      console.log('customer created');
      // await productModel.create(product);
        console.log('product created');
      // await saleModel.create(sales);
        console.log('sales created');
      
    console.log('file created successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
//the process
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
