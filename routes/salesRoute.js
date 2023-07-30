const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.route("/newSale").post(salesController.createNewSale);
router.route("/dailySales").get(salesController.dailySalesAnalysis);

module.exports = router;