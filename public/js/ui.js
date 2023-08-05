//function to crate the daily sales analysis table
const dailySalesAnalysis = async () => {
  try {
    const response = await fetch("/api/v1/sales/dailySales");
    const data = await response.json();
    console.log(data);
    if (data.dailySales && data.dailySales.length > 0) {
      const dailySalesTable = document.getElementById("dailySalesTable");

      // Create the table header row
      const tableHeader = document.createElement("tr");
      tableHeader.innerHTML =
        "<th>Product</th><th>Sale Date</th><th>Total Amount</th>";
      dailySalesTable.appendChild(tableHeader);

      // Loop through the dailySales data and create table rows
      data.dailySales.forEach((item) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${item.product}</td><td>${item.saleDate}</td><td>${item.totalAmount}</td>`;
        dailySalesTable.appendChild(tableRow);
      });

      const totalSales = document.getElementById("totalSales");
      const totalProduct = document.getElementById("totalProducts");

      const totalAmount = data.dailySales.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      const totalProductSold = data.dailySales.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      totalSales.innerHTML = `$${totalAmount}`;
      totalProduct.innerHTML = `${totalProductSold}`;
    }
  } catch (error) {
    console.error("Error fetching daily sales data:", error);
  }
};

//function to crate the daily expense analysis table
const dailyExpenseAnalysis = async () => {
  try {
    const response = await fetch("/api/v1/expenses/dailyExpenseAnalysis");
    const data = await response.json();
    console.log(data);
    console.log(data.dailyExpenses);
    if (data.dailyExpenses && data.dailyExpenses.length > 0) {
      const dailyExpenseTable = document.getElementById("dailyExpenseTable");

      // Create the table header row
      const tableHeader = document.createElement("tr");
      tableHeader.innerHTML =
        "<th>Expense Type</th><th>Expense Date</th><th>Total Amount</th>";
      dailyExpenseTable.appendChild(tableHeader);

      // Loop through the dailyExpenses data and create table rows
      data.dailyExpenses.forEach((item) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${item.expenseType}</td><td>${item.date}</td><td>${item.totalAmount}</td>`;
        dailyExpenseTable.appendChild(tableRow);
      });
      //additional information on expenses
      const totalExpenses = document.getElementById("totalExpenses");

      // Calculate the total expenses
      let totalExpenseAmount = data.dailyExpenses.reduce(
        (total, item) => total + item.totalAmount,
        0
      );
      totalExpenses.innerHTML = `$${totalExpenseAmount}`;

      // Calculate the total expense amount and total number of expenses
      totalExpenseAmount = 0;
      let totalExpenseCount = 0;

      data.dailyExpenses.forEach((item) => {
        totalExpenseAmount += item.totalAmount;
        totalExpenseCount += 1;
      });

      // Calculate the average expense amount
      const averageExpense = totalExpenseAmount / totalExpenseCount;

      // Display the average expense amount
      const averageExpenseElement = document.getElementById("averageExpense");
      averageExpenseElement.textContent = ` $${averageExpense.toFixed(2)}`;
    }
  } catch (error) {
    console.error("Error fetching daily expense data:", error);
  }
};

// Function to create the profit chart
function createProfitChart(dailyProfits) {
  const chartContainer = document.getElementById("profitchart-container");
  const chartContainerWidth = chartContainer.clientWidth; // Get the width of the container
  const chartWidth = chartContainerWidth * 0.4; // Set the chart width to 20% of the container width

  // Set the height of the container based on the width to maintain the aspect ratio
  const chartHeight = chartWidth * 1.2;

  // Set the width and height of the chart container
  chartContainer.style.width = chartWidth + "px";
  chartContainer.style.height = chartHeight + "px";

  const profitChartCanvas = document.getElementById("profitChart");
  profitChartCanvas.width = chartWidth;
  profitChartCanvas.height = chartHeight;
  const profitChart = new Chart(profitChartCanvas, {
    type: "line", // You can use "line" for a line chart or "area" for an area chart
    data: {
      // Update the labels array for 30 days
      labels: Array.from({ length: 10 }, (_, index) => `Day ${index + 1}`),
      datasets: [
        {
          label: "Daily Profit",
          data: dailyProfits, // Array of profit values for each day
          borderColor: "rgba(75, 192, 192, 1)", // Color of the line
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Color of the area under the line (for area chart)
        },
      ],
    },
    options: {
      tooltips: {
        callbacks: {
          label: (tooltipItem) => `Profit: $${tooltipItem.yLabel}`, // Tooltip label to display the profit value
        },
      },
      responsive: true,
      maintainAspectRatio: false, // Set this to false to allow the chart to dynamically resize based on container size
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Day", // X-axis title
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Profit ($)", // Y-axis title
          },
        },
      },
    },
  });
}
//function to create best selling and least selling products
const bestAndLeastSellingProductsDiv = document.getElementById(
  "bestAndLeastSellingProducts"
);

const fetchAndDisplayBestAndLeastSellingProducts = async () => {
  console.log("fetching best and least selling products");
  try {
    const response = await fetch("/api/v1/sales/bestAndLeastSellingProducts");
    console.log(response);
    const data = await response.json();
    console.log(data);
    const products = data.products;
    console.log(products);
    if (products.length > 0) {
      const productsList = products
        .map(
          (product) => `
            <p>${product.type}: ${product.details.productName}</p>
          `
        )
        .join("");
      console.log(productsList);
      bestAndLeastSellingProductsDiv.innerHTML = `
            <h2>Best and Least Selling Products:</h2>
            ${productsList}
          `;
      console.log(bestAndLeastSellingProductsDiv);
    } else {
      bestAndLeastSellingProductsDiv.innerHTML = "<p>No data available.</p>";
    }
  } catch (error) {
    console.error(
      "Error fetching and displaying Best and Least Selling Products:",
      error
    );
    bestAndLeastSellingProductsDiv.innerHTML = "<p>An error occurred.</p>";
  }
};

// Fetch and display Best and Least Selling Products data

export default {
  createProfitChart,
  dailySalesAnalysis,
  dailyExpenseAnalysis,
  fetchAndDisplayBestAndLeastSellingProducts,
};
