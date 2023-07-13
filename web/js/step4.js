let customPaymentAmout = document.getElementById("customPaymentAmount");
let submit = document.getElementById("submit");

// updates amount that customer is paying/must pay
function updatePaymentAmount(){
  // Check for invalid values
  let partialPayment = Number(customPaymentAmout.value);
  if (validPartialPayment(partialPayment) == false){
    return console.log("Invalid partial payment.");
  }
  let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
  parsedInvoiceData["paymentAmount"] = partialPayment;
  localStorage.setItem("invoiceJSON",JSON.stringify(parsedInvoiceData));
  const items = [{invoiceNumber: parsedInvoiceData["number"]},
               {invoiceAmount: Math.ceil(partialPayment*100)} ];

  customPaymentAmout.className = "customPaymentAmount";

  // Create a new payment intent by making a POST with partial payment amount.
  fetch("/create.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }).then((r) => r.json())
}

// checks if custom payment amount entered by customer is valid/error-checking
function validPartialPayment(partialPayment) {
  if (partialPayment <= 0 || partialPayment > parsedInvoiceData["amount"] || Number.isNaN(partialPayment)) {
    customPaymentAmout.className = "customPaymentAmount-invalid";
    submit.disabled = true;
    return false;
  } else {
    submit.disabled = false;
    return true;
  }
}

customPaymentAmout.addEventListener("change", updatePaymentAmount);

// reveals the form when form finishes loading
window.addEventListener("load", revealForm);

function revealForm() {
  setTimeout(() => {
    let paymentForm = document.getElementById("payment-form");
    let loadingSpinner = document.getElementById("custom-loader");
    paymentForm.hidden = false;
    loadingSpinner.remove();
    console.log("LOADED +++++++++++++++++++++")
  }, 2000);
  
}

//when page loads injects invoice info to html
document.addEventListener('DOMContentLoaded', function() {

    let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
    let checkedInvoiceData= `
    <h4>Hi ${parsedInvoiceData.company},</h4>
    <p class="mb-3">You have an invoice due, please <br> see the details below:</p>
    <p><strong>Invoice: #${parsedInvoiceData.number} <br> Amount due: $${parsedInvoiceData.amount.toFixed(2).toLocaleString("en-US")} <br> Due date: ${parsedInvoiceData.due.slice(0,10)}</strong></p>
    <p class="mb-3">Please enter your payment information.</p>`;
      console.log(checkedInvoiceData);
      document.getElementById('invoice-data').innerHTML+=checkedInvoiceData;

      // Disables Pay Now button if invoice is already paid.
      let parsedInvoiceStatus = JSON.parse(localStorage.getItem("invoices"));
      let currentInvoiceStatus = parsedInvoiceStatus[parsedInvoiceData.number];
      if (currentInvoiceStatus == "paid") {
          let payNowButton = document.getElementById("payNow");
          payNowButton.innerHTML="Invoice Paid";
          payNowButton.setAttribute("disabled", true);
          payNowButton.parentNode.removeAttribute("href");
      }
    
    customPaymentAmout.value = parsedInvoiceData["amount"].toFixed(2);
 
    });


