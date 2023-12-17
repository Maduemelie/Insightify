const router = require('express').Router();
const customerController = require('../controllers/customerController');


router.route("/newCustomer").post(customerController.createNewCustomer);

module.exports = router;