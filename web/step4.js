document.addEventListener('DOMContentLoaded', function() {

let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
let checkedInvoiceData= `
  <h4 class="mb-3"> Hi ${parsedInvoiceData.company},</h4>
  <h4 class="mb-3">You have an invoice due, please see the details below:</h4>
  <h4><strong>Invoice: #${parsedInvoiceData.number}</strong></h4>
  <h4><strong>Amount due: $${parsedInvoiceData.amount.toFixed(2)}</strong></h4>
  <h4 class="mb-3"><strong>Due date: ${parsedInvoiceData.due.slice(0,10)}</strong></h4>
  <h4 class="mb-3">Please pay using the Pay Now button below.</h4>
  <hr class="my-4">`
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

});


