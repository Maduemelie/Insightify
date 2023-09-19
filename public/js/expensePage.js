document.addEventListener("DOMContentLoaded", () => {
  const applyButton = document.getElementById("apply");
  applyButton.addEventListener("click", () => applyFilters());
});

function applyFilters() {
  const sortOption = document.getElementById("sort").value;
  const filterOption = document.getElementById("filter").value;

  let url = `/api/v1/expenses?sort=${sortOption}&filter=${filterOption}`;

  if (filterOption === "amount") {
    const minAmount = document.getElementById("minAmount").value;
    const maxAmount = document.getElementById("maxAmount").value;
    url += `&minAmount=${minAmount}&maxAmount=${maxAmount}`;
  } else if (filterOption === "date") {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }

  // Redirect to the constructed URL
  window.location.href = url;
}

// function applyFilters() {
//   const sortOption = document.getElementById("sort").value;
//   const filterOption = document.getElementById("filter").value;

//   let url = `/api/v1/expenses?sort=${sortOption}&filter=${filterOption}`;

//   if (filterOption === "amount") {
//     const minAmount = document.getElementById("minAmount").value;
//     const maxAmount = document.getElementById("maxAmount").value;
//     url += `&minAmount=${minAmount}&maxAmount=${maxAmount}`;
//   } else if (filterOption === "date") {
//     const startDate = document.getElementById("startDate").value;
//     const endDate = document.getElementById("endDate").value;
//     url += `&startDate=${startDate}&endDate=${endDate}`;
//   }

//   // Get the current page number
//   const currentPage = document.getElementById("currentPage").value;

//   // Get the total number of pages
//   const totalPages = getNumberOfPages(url);

//   // Add the next and previous buttons
//   if (currentPage > 1) {
//     const previousButton = document.createElement("button");
//     previousButton.textContent = "Previous";
//     previousButton.addEventListener("click", () => {
//       currentPage--;
//       applyFilters();
//     });
//     document.getElementById("buttons").appendChild(previousButton);
//   }

//   if (currentPage < totalPages) {
//     const nextButton = document.createElement("button");
//     nextButton.textContent = "Next";
//     nextButton.addEventListener("click", () => {
//       currentPage++;
//       applyFilters();
//     });
//     document.getElementById("buttons").appendChild(nextButton);
//   }

//   // Redirect to the constructed URL
//   window.location.href = url;
// }

// async function getNumberOfPages(url) {
//   // Make a GET request to the API endpoint
//   const response = fetch(url);

//   // Check if the response was successful
//   if (response.ok) {
//     // Get the number of expenses from the response
//     const expenses = await response.json();
//     return Math.ceil(expenses.length / 10);
//   } else {
//     throw new Error("Something went wrong");
//   }
// }

