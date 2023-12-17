// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
require("dotenv").config();

const generateToken = (user) => jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

module.exports = {
  generateToken,
};
