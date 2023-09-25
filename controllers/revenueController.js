const Sales = require('../models/salesModel')

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

    // Fetch revenue data for each day in the date array
    const revenueData = [];

    for (const date of dateArray) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const totalRevenue = await Sales.aggregate([
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
            total: { $sum: '$totalAmount' },
          },
        },
      ]);

      revenueData.push({
        date: date.toISOString().split('T')[0],
        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      });
    }
console.log(revenueData)
    res.status(200).json({ revenueData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
