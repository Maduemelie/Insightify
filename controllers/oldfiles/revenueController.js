const Sales = require('../../models/salesModel');
const mongoose = require('mongoose');

exports.getRevenueData = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the date 7 days ago from the start date
    const sevenDaysAgo = new Date(start);
    sevenDaysAgo.setDate(start.getDate() - 7);

    // Create an array of date objects for the last 7 days
    const dateArray = [];
    let currentDate = new Date(sevenDaysAgo);
    while (currentDate <= end) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Fetch daily revenue data for each day in the date array
    const dailyRevenueData = [];

    for (const date of dateArray) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const dailyTotalRevenue = await Sales.aggregate([
        {
          $match: {
            saleDate: {
              $gte: date,
              $lt: nextDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalDailyRevenue: { $sum: '$totalAmount' },
          },
        },
      ]);

      dailyRevenueData.push({
        date: date.toISOString().split('T')[0],
        totalDailyRevenue:
          dailyTotalRevenue.length > 0
            ? dailyTotalRevenue[0].totalDailyRevenue
            : 0,
      });
    }

    // Now, let's aggregate the daily data to get weekly data
    const weeklyRevenueData = [];
    let weeklyTotalRevenue = 0;

    for (const dailyData of dailyRevenueData) {
      weeklyTotalRevenue += dailyData.totalDailyRevenue;

      if (new Date(dailyData.date).getDay() === 6) {
        // If it's the last day of the week (Saturday), add the weekly total
        weeklyRevenueData.push({
          startDate: dailyData.date,
          endDate: new Date(dailyData.date).toISOString().split('T')[0],
          totalWeeklyRevenue: weeklyTotalRevenue,
        });

        // Reset the weekly total for the next week
        weeklyTotalRevenue = 0;
      }
    }

    res.status(200).json({ dailyRevenueData, weeklyRevenueData });
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
