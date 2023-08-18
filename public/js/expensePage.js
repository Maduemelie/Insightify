// Add an event listener to the "Apply" link
 const applyButton = document.getElementById("apply")
  applyButton.addEventListener("click", () => {
  const sortOption = document.getElementById("sort").value;
  const filterOption = document.getElementById("filter").value;

  console.log(sortOption, filterOption, applyButton);

  // Construct the URL with selected options
  const url = `/api/v1/expenses?page=1&sort=${sortOption}&filter=${filterOption}`;

  // Redirect to the constructed URL
  window.location.href = url;
});
