const Expense = require('../../models/expenseModel');
const catchAsync = require('../../utils/catchAsync');
const Delivery = require('../../models/deliveryModel');
const Advert = require('../../models/advertModel');
const ItemPurchase = require('../../models/itemPurchasedModel');

const createNewExpense = catchAsync(async (req, res) => {
  const { type, description, amount, date } = req.body;
  console.log(req.body);
  // Create a new expense document based on the expense type
  let newExpense;
  switch (type) {
    case 'delivery':
      const deliveryData = {
        deliveryDate: req.body.deliveryDate,
        recipientName: req.body.recipientName,
      };
      newExpense = await Delivery.create({
        description,
        amount,
        date,
        ...deliveryData,
      });
      break;
    case 'advert':
      newExpense = await Advert.create({
        type,
        description,
        amount,
        date,
        // Add any specific properties for the advert expense
        platform: req.body.platform,
      });
      break;
    case 'itemPurchase':
      console.log(req.body.type);
      newExpense = await ItemPurchase.create({
        type,
        description,
        amount,
        date,
        // Add any specific properties for the office equipment purchase expense
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
      });
      break;
    default:
      return res.status(400).json({ error: 'Invalid expense type' });
  }
  res.status(201).json({
    status: 'success',
    data: {
      expense: newExpense,
    },
  });
});
const getdailyExpenseAnalysis = async () => {
  let dailyExpenses = await Expense.aggregate([
    {
      $group: {
        _id: {
          expenseType: '$__t',
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        },
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 }, // Count the number of expenses for each type and date
      },
    },
    {
      $project: {
        _id: 0,
        expenseType: '$_id.expenseType',
        date: '$_id.date',
        totalAmount: 1,
        count: 1,
      },
    },
  ]);
  console.log(dailyExpenses);
  return dailyExpenses;
};

const dailyExpenseAnalysis = catchAsync(async (req, res) => {
  const dailyExpenses = await getdailyExpenseAnalysis();
  res.status(200).json({
    dailyExpenses,
  });
});

const displayDailyExpensePage = catchAsync(async (req, res) => {
  const dailyExpenses = await getdailyExpenseAnalysis();
  console.log(dailyExpenses);
  res.status(200).render('expense_DailyExpense', {
    title: 'Daily Expense Analysis',

    dailyExpenses,
  });
});

const generateExpensePageData = catchAsync(async (req, res) => {
  let query = {};
  const page = parseInt(req.query.page) || 1; // Default to page 1 if no page query parameter
  const limit = 10; // Number of expenses per page
  const sortOption = req.query.sort || 'date'; // Default to 'date'
  const filterOption = req.query.filter || 'all'; // Default to 'all'

  // Check for query parameters and construct the query accordingly
  if (req.query.day) {
    query.date = {
      $gte: new Date(req.query.day),
      $lt: new Date(req.query.day).setDate(
        new Date(req.query.day).getDate() + 1
      ),
    };
  } else if (req.query.week) {
    const startDate = new Date(req.query.week);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    query.date = { $gte: startDate, $lt: endDate };
  } else if (req.query.month) {
    const startOfMonth = new Date(req.query.month);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);
    query.date = { $gte: startOfMonth, $lt: endOfMonth };
  } else if (req.query.year) {
    const startOfYear = new Date(req.query.year);
    startOfYear.setMonth(0, 1);
    startOfYear.setHours(0, 0, 0, 0);
    const endOfYear = new Date(startOfYear);
    endOfYear.setFullYear(startOfYear.getFullYear() + 1);
    query.date = { $gte: startOfYear, $lt: endOfYear };
  }

  try {
    const count = await Expense.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    // Calculate the skip value based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch expenses with sorting, pagination, and limit applied
    const expenses = await Expense.find(query)
      .sort({ [sortOption]: -1 }) // Sort by date in descending order
      .skip(skip)
      .limit(limit);

    // Check if the client accepts HTML or JSON
    const acceptHeader = req.get('Accept');
    if (acceptHeader && acceptHeader.includes('text/html')) {
      // If the client accepts HTML, render the "expensesPage" view with expenses data
      res.render('expensesPage', {
        expenses,
        totalPages,
        currentPage: page,
        sortOption,
        filterOption,
      });
    } else {
      // If the client accepts JSON, send the expenses data as JSON in the response
      res.status(200).json(expenses);
    }
  } catch (error) {
    console.error('Error fetching and rendering expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  createNewExpense,
  displayDailyExpensePage,
  dailyExpenseAnalysis,
  generateExpensePageData,
};
