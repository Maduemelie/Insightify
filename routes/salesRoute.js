const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.route("/newSale").post(salesController.createNewSale);

module.exports = router;