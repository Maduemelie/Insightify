import element from "../js/element.js";

// Add event listener to the "Add New Sales" button
const addNewSalesButton = document.getElementById("addNewSalesButton");
addNewSalesButton.addEventListener("click", () => {
  // Create the new sale form
  const form = element.createNewSaleForm();

  // Append the form to the newSaleFormContainer div
  const newSaleFormContainer = document.getElementById("newSaleFormContainer");
  newSaleFormContainer.innerHTML = ""; // Clear any existing content
  newSaleFormContainer.appendChild(form);

  // Toggle the visibility of the newSaleFormContainer
  element.toggleFormContainer("newSaleFormContainer", "addNewSalesButton");
});

// Add event listener to the "AddNewExpense" button
const addNewExpense = document.getElementById("addNewExpenseButton");
addNewExpense.addEventListener("click", () => {
  // Get the selected expense type from the dropdown
  const expenseTypeSelect = document.getElementById("expenseType");
  const selectedExpenseType = expenseTypeSelect.value;
  console.log(selectedExpenseType);
  // Hide all form containers first
  const advertFormContainer = document.getElementById("advertFormContainer");
  //   advertFormContainer.style.display = "none";
  advertFormContainer.innerHTML = "";
  //
  const itemPurchaseFormContainer = document.getElementById(
    "itemPurchaseFormContainer"
  );
  //   console.log(itemPurchaseFormContainer);
  itemPurchaseFormContainer.innerHTML = "";

  const deliveryFormContainer = document.getElementById(
    "deliveryFormContainer"
  );
  deliveryFormContainer.innerHTML = "";

  // Show the form container based on the selected expense type
  if (selectedExpenseType === "advert") {
    const advertForm = element.generateAdvertForm();
    advertFormContainer.appendChild(advertForm);
    element.toggleFormContainer("advertFormContainer", "addNewExpenseButton");
  } else if (selectedExpenseType === "itemPurchase") {
    const itemPurchaseForm = element.generateItemPurchaseForm();
    itemPurchaseFormContainer.appendChild(itemPurchaseForm);
    element.toggleFormContainer(
      "itemPurchaseFormContainer",
      "addNewExpenseButton"
    );
  } else if (selectedExpenseType === "delivery") {
    const deliveryForm = element.generateDeliveryForm();
    deliveryFormContainer.appendChild(deliveryForm);
    element.toggleFormContainer("deliveryFormContainer", "addNewExpenseButton");
  }
});

// Get the "Add New Return" button and the form container
const addNewReturnButton = document.getElementById("addNewReturnButton");
const returnFormContainer = document.getElementById("returnFormContainer");

// Add event listener to the button
addNewReturnButton.addEventListener("click", () => {
  // Generate the Return form
  const returnForm = element.generateReturnForm();

  // Clear any existing form inside the form container
  returnFormContainer.innerHTML = "";

  // Append the generated form to the form container
  returnFormContainer.appendChild(returnForm);

  // Show the form container
  element.toggleFormContainer("returnFormContainer", "addNewReturnButton");
});
