import element from "../js/element.js";

// add an event listener to the "addNewSalesButton" button
const addNewSale = document.getElementById("addNewSalesButton");
addNewSale.addEventListener("click", () => {
  // Create the new sale form
  const form = element.createNewSaleForm();

  // Append the form to the newSaleFormContainer div
  const newSaleFormContainer = document.getElementById("newSaleFormContainer");
  newSaleFormContainer.innerHTML = ""; // Clear any existing content
  newSaleFormContainer.appendChild(form);

  // Toggle the visibility of the newSaleFormContainer
  element.toggleNewSaleForm();
});

// Add event listener to the "Add New" button
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
    advertFormContainer.style.display =
      advertFormContainer.style.display === "none" ? "block" : "none";
  } else if (selectedExpenseType === "officeEquipmentPurchase") {
    const itemPurchaseForm = element.generateItemPurchaseForm();
    itemPurchaseFormContainer.appendChild(itemPurchaseForm);
    itemPurchaseFormContainer.style.display =
      itemPurchaseFormContainer.style.display === "none" ? "block" : "none";
  } else if (selectedExpenseType === "delivery") {
    const deliveryForm = element.generateDeliveryForm();
    deliveryFormContainer.appendChild(deliveryForm);
    deliveryFormContainer.style.display =
      deliveryFormContainer.style.display === "none" ? "block" : "none";
  }
});
