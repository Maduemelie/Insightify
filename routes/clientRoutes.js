const express = require('express');
const clientController = require('../controllers/client');
const router = express.Router();

router.get("/products", clientController.getAllProducts);
router.get ('/customers',clientController.getCustomers )
router.get('/transactions', clientController.getTransactions)
router.get('/geography', clientController.getGeography);

module.exports = router;