const Sales = require('../models/salesModel');
const Expense = require('../models/expenseModel');


const fetchDataForIntervals = async (req, res) => {
 const { startDate, endDate, interval } = req.query;
  try {
    const getAggregateData = async (
      collection,
      startDate,
      endDate,
      fieldName
    ) => {
      const pipeline = [
        {
          $match: {
            date: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: `$${fieldName}` },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
          },
        },
      ];

      return await collection.aggregate(pipeline);
    };

    const getDateRangeData = async (
      collection,
      startDate,
      endDate,
      fieldName,
      dateIncrement
    ) => {
      const data = {};
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const rangeStart = new Date(currentDate);
        rangeStart.setHours(0, 0, 0, 0);
        const rangeEnd = new Date(currentDate);
        rangeEnd.setHours(23, 59, 59, 999);
        rangeEnd.setDate(rangeStart.getDate() + dateIncrement - 1);

        const formattedRange = `${rangeStart.toISOString().split('T')[0]} - ${
          rangeEnd.toISOString().split('T')[0]
        }`;
        const rangeData = await getAggregateData(
          collection,
          rangeStart,
          rangeEnd,
          fieldName
        );

        // Use null or an empty array if no data is found
        data[formattedRange] =
          rangeData.length > 0 ? rangeData[0].totalAmount : null; // Change to null or [] as needed

        currentDate.setDate(currentDate.getDate() + dateIncrement);
      }

      return data;
    };

    

        let data;

    if (interval === 'daily') {
      data = {
        dailyRevenue: await getDateRangeData(Sales, startDate, endDate, 'totalAmount', 1),
        dailyExpense: await getDateRangeData(Expense, startDate, endDate, 'amount', 1),
      };
    } else if (interval === 'weekly') {
      data = {
        weeklyRevenue: await getDateRangeData(Sales, startDate, endDate, 'totalAmount', 7),
        weeklyExpense: await getDateRangeData(Expense, startDate, endDate, 'amount', 7),
      };
    } else if (interval === 'monthly') {
      data = {
        monthlyRevenue: await getDateRangeData(Sales, startDate, endDate, 'totalAmount', 30),
        monthlyExpense: await getDateRangeData(Expense, startDate, endDate, 'amount', 30),
      };
    }else {
      throw new Error('Invalid interval specified');
    }

    return data;
 
  
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You can handle the error further up in your code
  }
};

module.exports = { fetchDataForIntervals };
