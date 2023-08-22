//When DOM content loads injects invoice info to html
document.addEventListener("DOMContentLoaded", function () {
  let parsedInvoiceData = JSON.parse(localStorage.getItem("invoiceJSON"));
  let checkedInvoiceData = `
  <h4>Hi ${parsedInvoiceData.company},</h4>
  <p class="mb-3">You have an invoice due, please <br> see the details below:</p>
  <p><strong>Invoice: #${parsedInvoiceData.number} <br> Amount due: $${parsedInvoiceData.amount.toFixed(2).toLocaleString("en-US")} <br> Due date: ${parsedInvoiceData.due.slice(0,10)}</strong></p>
  <p class="mb-3">Please enter your payment information.</p>`;
  document.getElementById("invoice-data").innerHTML += checkedInvoiceData;

  // Disables Pay Now button if invoice is already paid.
  const parsedInvoiceStatus = JSON.parse(localStorage.getItem("invoices"));
  let currentInvoiceStatus = parsedInvoiceStatus[parsedInvoiceData.number];
  if (currentInvoiceStatus == "paid") {
    let payNowButton = document.getElementById("payNow");
    payNowButton.innerHTML = "Invoice Paid";
    payNowButton.setAttribute("disabled", true);
    payNowButton.parentNode.removeAttribute("href");
  }

  customPaymentAmount.value = parsedInvoiceData["amount"].toFixed(2);
});

let customPaymentAmount = document.getElementById("customPaymentAmount"); // Holds the custom value that the customer would like to pay towards invoice
let submit = document.getElementById("submit");

// Any time the partial payment value is changed, updatePaymentAmount function is called
// customPaymentAmount.addEventListener("change", updatePaymentAmount);

// Reveals the form when form finishes loading when window is done loading
window.addEventListener("load", revealForm);

let partialPayment;


// Updates amount that customer is paying/must pay
function updatePaymentAmount() {
  // Check for invalid values
  
  if (validPartialPayment(partialPayment) == false) {
    return console.log("Invalid partial payment.");
  }
  // Sets paymentAmount to the custom payment value in the invoiceJSON data
  let parsedInvoiceData = JSON.parse(localStorage.getItem("invoiceJSON"));
  parsedInvoiceData["paymentAmount"] = partialPayment;
  localStorage.setItem("invoiceJSON", JSON.stringify(parsedInvoiceData));
  const items = [
    { invoiceNumber: parsedInvoiceData["number"] },
    { invoiceAmount: Math.ceil(partialPayment * 100) },
  ];

  // Sets styling of customPaymentAmount back to normal if error-checking passes
  customPaymentAmount.className = "customPaymentAmount";

  // Create a new payment intent by making a POST with partial payment amount.
  // fetch("/create.php", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ items }),
  // }).then((r) => r.json());
  let currentPaymentIntent = initialize(items);


}

// Checks if custom payment amount entered by customer is valid/error-checking
function validPartialPayment(partialPayment) {
  if (
    partialPayment <= 0 ||
    partialPayment > parsedInvoiceData["amount"] ||
    Number.isNaN(partialPayment)
  ) {
    customPaymentAmount.className = "customPaymentAmount-invalid";
    submit.disabled = true;
    return false;
  } else {
    submit.disabled = false;
    return true;
  }
}

//Reveals the form when form finishes loading
function revealForm() {
  setTimeout(() => {
    let paymentForm = document.getElementById("payment-form");
    let loadingSpinner = document.getElementById("custom-loader");
    paymentForm.hidden = false;
    loadingSpinner.remove();
    partialPayment= Number(customPaymentAmount.value);
    console.log("LOADED +++++++++++++++++++++");
    console.log(partialPayment);
  }, 2000);
}

customPaymentAmount.addEventListener("keyup", partialPaymentChanged);
customPaymentAmount.addEventListener("focus", partialPaymentChanged);

function partialPaymentChanged() {
  if (partialPayment == Number(customPaymentAmount.value)) {
    return false;
  } else {
    submit.disabled = true;
    partialPayment = Number(customPaymentAmount.value);
    return true;
  }
}

const confirmButton = document.querySelector(".customPaymentContainer button");

confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  updatePaymentAmount();
});
