const dailySalesAnalysis = async () => {
  try {
    const response = await fetch("/api/v1/sales/dailySales");
    const data = await response.json();
    console.log(data);
    if (data.dailySales && data.dailySales.length > 0) {
      
      // Get the #dailySalesAnalysis container
      const dailySalesAnalysisContainer =
        document.getElementById("dailySalesAnalysis");
        const dailySalesAnalysisContainerWidth = dailySalesAnalysisContainer.clientWidth; // Get the width of the container
      const tableWidth = dailySalesAnalysisContainerWidth * 0.4; 
       // Set the height of the container based on the width to maintain the aspect ratio
  const tableHeight = tableWidth * 1.2;

      // Set the width and height of the #dailySalesTable
      const dailySalesTableWidth = dailySalesAnalysisContainerWidth * 0.4; // Set the #dailySalesTable width to 40% of the container width
      const dailySalesTableHeight = tableHeight; // Set the #dailySalesTable height to be the same as the chart height

      dailySalesAnalysisContainer.style.width = dailySalesTableWidth + "px";
      dailySalesAnalysisContainer.style.height = dailySalesTableHeight + "px";

      const dailySalesTable = document.getElementById("dailySalesTable");
      dailySalesTable.width = dailySalesTableWidth;
      dailySalesTable.height = dailySalesTableHeight;
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
      
      const totalAmount = data.dailySales[0].totalAmount;
      const totalProductSold = data.dailySales[0].quantity;


      totalSales.innerHTML = `$${totalAmount}`;
      totalProducts.innerHTML = `${totalProductSold}`;
    }
  } catch (error) {
    console.error("Error fetching daily sales data:", error);
  }
};

// Function to create the chart
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

export default { createProfitChart, dailySalesAnalysis };
