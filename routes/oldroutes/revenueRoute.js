const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');

router.route('/').get(revenueController.getRevenueData);

module.exports = router;
