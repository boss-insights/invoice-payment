document.addEventListener('DOMContentLoaded', function() {

let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
let checkedInvoiceData= `
  <h4 class="mb-3"> Hi ${parsedInvoiceData.company}, your Invoice #${parsedInvoiceData.number} is due for the amount of $${parsedInvoiceData.amount}, please pay using the Pay Now button below.</h4>
  <hr class="my-4">
  <a href="./step5.html"><button id="payNow" class="w-100 btn btn-warning btn-lg" type="submit">Pay Now</button></a>`
  console.log(checkedInvoiceData);
  document.getElementById('invoice-data').innerHTML+=checkedInvoiceData;

});