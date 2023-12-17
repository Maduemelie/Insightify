const expenseController = require('../controllers/expenseController');
const router = require('express').Router();


router.route('/').get(expenseController.generateExpensePageData);
router.route('/newExpense').post(expenseController.createNewExpense);
router.route('/dailyExpenseAnalysis').get(expenseController.dailyExpenseAnalysis);
router.route('/renderDailyExpensePage').get(expenseController.displayDailyExpensePage);


module.exports = router;