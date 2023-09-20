const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');

router.route('/fetchDataForIntervals').get(revenueController.fetchDataForIntervals);

module.exports = router