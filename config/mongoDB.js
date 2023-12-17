const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./configfile');

const MONGOOSE_URL = config.MONGOOSE_URL;
console.log(MONGOOSE_URL);

const connectToDb = () => {
  mongoose.connect(MONGOOSE_URL);
  mongoose.connection.on('connected', () => {
    console.log('connected to MongoDB successfully');
    
  });

  mongoose.connection.on('error', (error) => {
    console.log('An error occurred', error);
  });
};

module.exports = connectToDb;
