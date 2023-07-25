const expenseController = require('../controllers/expenseController');
const router = require('express').Router();

router.route('/newExpense').post(expenseController.createNewExpense);

module.exports = router;