//generate form function
function generateForm(headingText, fieldData, actionEndpoint) {
  const form = document.createElement("form");
  form.action = actionEndpoint;
  form.method = "POST";
  form.id = `${headingText.replace(/\s/g, "").toLowerCase()}Form`;

  const heading = document.createElement("h1");
  heading.textContent = headingText;
  form.appendChild(heading);

  // Create input fields dynamically based on the fieldData array
  for (const field of fieldData) {
    const label = document.createElement("label");
    label.textContent = `${field.label}:`;

    const input = document.createElement("input");
    input.type = field.type;
    input.name = field.name;
    input.required = field.required;

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
  }

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = `Create ${headingText}`;
  form.appendChild(submitButton);

  return form;
}

function createNewSaleForm() {
  // Create the form elements
  const salesFormFields = [
    { name: "product", label: "Product", type: "text", required: true },
    { name: "customer", label: "Customer", type: "text", required: true },
    { name: "quantity", label: "Quantity", type: "number", required: true },
    // { name: "unitPrice", label: "unit Price", type: "number", required: true },
    // {
    //   name: "totalAmount",
    //   label: "Total Amount",
    //   type: "number",
    //   required: true,
    // },
    { name: "saleDate", label: "Sale Date", type: "date", required: true },
    {
      name: "paymentMethod",
      label: "Payment Method",
      type: "text",
      required: true,
    },
    {
      name: "paymentStatus",
      label: "Payment Status",
      type: "text",
      required: true,
    },
    { name: "discount", label: "Discount", type: "number", required: false },
    {
      name: "salesPerson",
      label: "Sales Person",
      type: "text",
      required: false,
    },
  ];
  return generateForm("New Sale", salesFormFields, "/api/v1/sales/newSale");
}

// Function to generate the Advert form
function generateAdvertForm() {
  const advertFormFields = [
    { name: "platform", label: "Platform", type: "text", required: true },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
    { name: "amount", label: "Amount", type: "number", required: true },
    { name: "date", label: "Date", type: "date", required: true },
  ];
  const form = generateForm(
    "New Advert",
    advertFormFields,
    "/api/v1/expenses/newExpense"
  );

  // Add a hidden input field to store the type value
  const expenseTypeSelect = document.getElementById("expenseType");
  const selectedExpenseType = expenseTypeSelect.value;

  const typeInput = document.createElement("input");
  typeInput.type = "hidden";
  typeInput.name = "type";
  typeInput.value = selectedExpenseType;
  form.appendChild(typeInput);

  return form;
}

// Function to generate the Item Purchase form
function generateItemPurchaseForm() {
  const itemPurchaseFormFields = [
    { name: "itemName", label: "Item Name", type: "text", required: true },
    { name: "quantity", label: "Quantity", type: "number", required: true },
    { name: "unitPrice", label: "Unit Price", type: "number", required: true },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
    { name: "amount", label: "Amount", type: "number", required: true },
    { name: "date", label: "Date", type: "date", required: true },
  ];
  const form = generateForm(
    "New Item Purchase",
    itemPurchaseFormFields,
    "/api/v1/expenses/newExpense"
  );

  // Add a hidden input field to store the type value
  const expenseTypeSelect = document.getElementById("expenseType");
  const selectedExpenseType = expenseTypeSelect.value;

  const typeInput = document.createElement("input");
  typeInput.type = "hidden";
  typeInput.name = "type";
  typeInput.value = selectedExpenseType;
  form.appendChild(typeInput);

  return form;
}

// Function to generate the Delivery form
function generateDeliveryForm() {
  const deliveryFormFields = [
    // {
    //   name: "deliveryDate",
    //   label: "Delivery Date",
    //   type: "date",
    //   required: true,
    // },
    {
      name: "recipientName",
      label: "Recipient Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
    { name: "amount", label: "Amount", type: "number", required: true },
    { name: "date", label: "Date", type: "date", required: true },
  ];

  const form = generateForm(
    "New Delivery",
    deliveryFormFields,
    "/api/v1/expenses/newExpense"
  );

  // Add a hidden input field to store the type value
  const expenseTypeSelect = document.getElementById("expenseType");
  const selectedExpenseType = expenseTypeSelect.value;

  const typeInput = document.createElement("input");
  typeInput.type = "hidden";
  typeInput.name = "type";
  typeInput.value = selectedExpenseType;
  form.appendChild(typeInput);

  return form;
}

// Function to generate the Return form
function generateReturnForm() {
  const fieldData = [
    { name: "product", label: "Product", type: "text", required: true },
    { name: "customer", label: "Customer", type: "text", required: true },
    { name: "quantity", label: "Quantity", type: "number", required: true },
    { name: "reason", label: "Reason", type: "text", required: true },
    { name: "amount", label: "Amount", type: "number", required: true },
    { name: "date", label: "Date", type: "date", required: true },
  ];

  return generateForm("New Return", fieldData, "/api/v1/returns/newReturn");
}

function toggleFormContainer(formContainerId, buttonId) {
  const formContainer = document.getElementById(formContainerId);
  console.log(formContainer);
  formContainer.style.display =
    formContainer.style.display === "none" ? "block" : "none";

  const button = document.getElementById(buttonId);
  button.textContent =
    formContainer.style.display === "none" ? "Add New" : "Close";
}

export default {
  createNewSaleForm,
  toggleFormContainer,
  generateAdvertForm,
  generateItemPurchaseForm,
  generateDeliveryForm,
  generateReturnForm,
};
