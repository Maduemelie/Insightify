const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.route("/newSale").post(salesController.createNewSale);
router.route("/dailySales").get(salesController.dailySalesAnalysis);
router.route("/bestAndLeastSellingProducts").get(salesController.getBestAndLeastSellingProducts);
router.route("/renderDailySalesPage").get(salesController.renderDailySalesPage);

module.exports = router;