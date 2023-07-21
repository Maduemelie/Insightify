function createNewSaleForm() {
  // Create the form elements
  const form = document.createElement("form");
  form.action = "/sales";
  form.method = "POST";
  form.id = "newSaleForm";

  // Product
  const productLabel = document.createElement("label");
  productLabel.htmlFor = "product";
  productLabel.textContent = "Product:";
  form.appendChild(productLabel);

  const productSelect = document.createElement("select");
  productSelect.name = "product";
  productSelect.id = "product";
  productSelect.required = true;
  form.appendChild(productSelect);

  // Customer
  const customerLabel = document.createElement("label");
  customerLabel.htmlFor = "customer";
  customerLabel.textContent = "Customer:";
  form.appendChild(customerLabel);

  const customerSelect = document.createElement("select");
  customerSelect.name = "customer";
  customerSelect.id = "customer";
  customerSelect.required = true;
  form.appendChild(customerSelect);

  // Quantity
  const quantityLabel = document.createElement("label");
  quantityLabel.htmlFor = "quantity";
  quantityLabel.textContent = "Quantity:";
  form.appendChild(quantityLabel);

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.name = "quantity";
  quantityInput.id = "quantity";
  quantityInput.required = true;
  form.appendChild(quantityInput);
  form.appendChild(document.createElement("br"));

  // Total Amount
  const totalAmountLabel = document.createElement("label");
  totalAmountLabel.htmlFor = "totalAmount";
  totalAmountLabel.textContent = "Total Amount:";
  form.appendChild(totalAmountLabel);

  const totalAmountInput = document.createElement("input");
  totalAmountInput.type = "number";
  totalAmountInput.name = "totalAmount";
  totalAmountInput.id = "totalAmount";
  totalAmountInput.required = true;
  form.appendChild(totalAmountInput);
  form.appendChild(document.createElement("br"));

  // Sale Date
  const saleDateLabel = document.createElement("label");
  saleDateLabel.htmlFor = "saleDate";
  saleDateLabel.textContent = "Sale Date:";
  form.appendChild(saleDateLabel);

  const saleDateInput = document.createElement("input");
  saleDateInput.type = "date";
  saleDateInput.name = "saleDate";
  saleDateInput.id = "saleDate";
  saleDateInput.required = true;
  form.appendChild(saleDateInput);
  form.appendChild(document.createElement("br"));
  // Payment Method
  const paymentMethodLabel = document.createElement("label");
  paymentMethodLabel.htmlFor = "paymentMethod";
  paymentMethodLabel.textContent = "Payment Method:";
  form.appendChild(paymentMethodLabel);

  const paymentMethodInput = document.createElement("input");
  paymentMethodInput.type = "text";
  paymentMethodInput.name = "paymentMethod";
  paymentMethodInput.id = "paymentMethod";
  paymentMethodInput.required = true;
  form.appendChild(paymentMethodInput);
  form.appendChild(document.createElement("br"));

  // Payment Status
  const paymentStatusLabel = document.createElement("label");
  paymentStatusLabel.htmlFor = "paymentStatus";
  paymentStatusLabel.textContent = "Payment Status:";
  form.appendChild(paymentStatusLabel);

  const paymentStatusInput = document.createElement("input");
  paymentStatusInput.type = "text";
  paymentStatusInput.name = "paymentStatus";
  paymentStatusInput.id = "paymentStatus";
  paymentStatusInput.required = true;
  form.appendChild(paymentStatusInput);
  form.appendChild(document.createElement("br"));

  // Discount
  const discountLabel = document.createElement("label");
  discountLabel.htmlFor = "discount";
  discountLabel.textContent = "Discount:";
  form.appendChild(discountLabel);

  const discountInput = document.createElement("input");
  discountInput.type = "number";
  discountInput.name = "discount";
  discountInput.id = "discount";
  discountInput.value = "0";
  form.appendChild(discountInput);
  form.appendChild(document.createElement("br"));

  // Sales Person
  const salesPersonLabel = document.createElement("label");
  salesPersonLabel.htmlFor = "salesPerson";
  salesPersonLabel.textContent = "Sales Person:";
  form.appendChild(salesPersonLabel);

  const salesPersonInput = document.createElement("input");
  salesPersonInput.type = "text";
  salesPersonInput.name = "salesPerson";
  salesPersonInput.id = "salesPerson";
  form.appendChild(salesPersonInput);
  form.appendChild(document.createElement("br"));

  // Submit Button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Sale";
  form.appendChild(submitButton);

  // Append the form to the document body
  //   document.body.appendChild(form);
  return form;
}

function toggleNewSaleForm() {
  const formContainer = document.getElementById("newSaleFormContainer");
  formContainer.style.display =
    formContainer.style.display === "none" ? "block" : "none";
}

// Function to generate the Advert form
function generateAdvertForm() {
  const form = document.createElement("form");
  form.action = "/advert"; // Replace with the actual API endpoint for creating adverts
  form.method = "POST";
  form.id = "advertForm";

  const heading = document.createElement("h1");
  heading.textContent = "Create New Advert";
  form.insertBefore(heading, form.firstChild);

  const platformLabel = document.createElement("label");
  platformLabel.textContent = "Platform:";
  form.appendChild(platformLabel);

  const platformInput = document.createElement("input");
  platformInput.type = "text";
  platformInput.name = "platform";
  platformInput.required = true;
  form.appendChild(platformInput);
  form.appendChild(document.createElement("br"));

  const impressionsLabel = document.createElement("label");
  impressionsLabel.textContent = "Impressions:";
  form.appendChild(impressionsLabel);

  const impressionsInput = document.createElement("input");
  impressionsInput.type = "number";
  impressionsInput.name = "impressions";
  impressionsInput.required = true;
  form.appendChild(impressionsInput);
  form.appendChild(document.createElement("br"));

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  form.appendChild(descriptionLabel);

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "description";
  //   descriptionInput.required = true;
  form.appendChild(descriptionInput);
  form.appendChild(document.createElement("br"));

  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Amount:";
  form.appendChild(amountLabel);

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.name = "amount";
  amountInput.required = true;
  form.appendChild(amountInput);
  form.appendChild(document.createElement("br"));

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Date:";
  form.appendChild(dateLabel);

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "date";
  dateInput.required = true;
  form.appendChild(dateInput);
  form.appendChild(document.createElement("br"));

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Advert";
  form.appendChild(submitButton);

  return form;
}

// Function to generate the Item Purchase form
function generateItemPurchaseForm() {
  const form = document.createElement("form");
  form.action = "/itemPurchase"; // Replace with the actual API endpoint for creating item purchases
  form.method = "POST";
  form.id = "itemPurchaseForm";

  // Add the heading for "Create New Item Purchase"
  const heading = document.createElement("h1");
  heading.textContent = "Create New Item Purchase";
  form.insertBefore(heading, form.firstChild);

  const itemNameLabel = document.createElement("label");
  itemNameLabel.textContent = "Item Name:";
  form.appendChild(itemNameLabel);

  const itemNameInput = document.createElement("input");
  itemNameInput.type = "text";
  itemNameInput.name = "itemName";
  itemNameInput.required = true;
  form.appendChild(itemNameInput);
  form.appendChild(document.createElement("br"));

  const quantityLabel = document.createElement("label");
  quantityLabel.textContent = "Quantity:";
  form.appendChild(quantityLabel);

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.name = "quantity";
  quantityInput.required = true;
  form.appendChild(quantityInput);
  form.appendChild(document.createElement("br"));

  const unitPriceLabel = document.createElement("label");
  unitPriceLabel.textContent = "Unit Price:";
  form.appendChild(unitPriceLabel);

  const unitPriceInput = document.createElement("input");
  unitPriceInput.type = "number";
  unitPriceInput.name = "unitPrice";
  unitPriceInput.required = true;
  form.appendChild(unitPriceInput);
  form.appendChild(document.createElement("br"));

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  form.appendChild(descriptionLabel);

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "description";
  //   descriptionInput.required = true;
  form.appendChild(descriptionInput);
  form.appendChild(document.createElement("br"));

  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Amount:";
  form.appendChild(amountLabel);

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.name = "amount";
  amountInput.required = true;
  form.appendChild(amountInput);
  form.appendChild(document.createElement("br"));

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Date:";
  form.appendChild(dateLabel);

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "date";
  dateInput.required = true;
  form.appendChild(dateInput);
  form.appendChild(document.createElement("br"));

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Item Purchase";
  form.appendChild(submitButton);

  return form;
}

// Function to generate the Delivery form
function generateDeliveryForm() {
  const form = document.createElement("form");
  form.action = "/delivery"; // Replace with the actual API endpoint for creating deliveries
  form.method = "POST";
  form.id = "deliveryForm";
  // Add the heading for "Create New Delivery"
  const heading = document.createElement("h1");
  heading.textContent = "Create New Delivery";
  form.insertBefore(heading, form.firstChild);

  const deliveryDateLabel = document.createElement("label");
  deliveryDateLabel.textContent = "Delivery Date:";
  form.appendChild(deliveryDateLabel);

  const deliveryDateInput = document.createElement("input");
  deliveryDateInput.type = "date";
  deliveryDateInput.name = "deliveryDate";
  deliveryDateInput.required = true;
  form.appendChild(deliveryDateInput);
  form.appendChild(document.createElement("br"));

  const recipientNameLabel = document.createElement("label");
  recipientNameLabel.textContent = "Recipient Name:";
  form.appendChild(recipientNameLabel);

  const recipientNameInput = document.createElement("input");
  recipientNameInput.type = "text";
  recipientNameInput.name = "recipientName";
  recipientNameInput.required = true;
  form.appendChild(recipientNameInput);
  form.appendChild(document.createElement("br"));

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  form.appendChild(descriptionLabel);

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "description";
  //   descriptionInput.required = true;
  form.appendChild(descriptionInput);
  form.appendChild(document.createElement("br"));

  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Amount:";
  form.appendChild(amountLabel);

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.name = "amount";
  amountInput.required = true;
  form.appendChild(amountInput);
  form.appendChild(document.createElement("br"));

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Date:";
  form.appendChild(dateLabel);

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "date";
  dateInput.required = true;
  form.appendChild(dateInput);
  form.appendChild(document.createElement("br"));

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Delivery";
  form.appendChild(submitButton);
  console.log(form);
  return form;
}

export default {
  createNewSaleForm,
  toggleNewSaleForm,
  generateAdvertForm,
  generateItemPurchaseForm,
  generateDeliveryForm,
};
