const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.route("/newSale").post(salesController.createNewSale);
router.route("/dailySales").get(salesController.dailySalesAnalysis);
router.route("/bestAndLeastSellingProducts").get(salesController.getBestAndLeastSellingProducts);
router.route("/renderDailySalesPage").get(salesController.renderDailySalesPage);
router.route('/allBySaleQuantity').get(salesController.getAllProductsBySales);
router.route('/profitAnalysis').get(salesController.profitAnalysis);

module.exports = router;