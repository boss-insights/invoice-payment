let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));

// Update the invoice's status to paid.
let parsedInvoiceStatus = JSON.parse(localStorage.getItem("invoices"));
if (parsedInvoiceData["paymentAmount"] < parsedInvoiceData["amount"]) {
  parsedInvoiceStatus[parsedInvoiceData["number"]] = "Partially Paid";
} else {
  parsedInvoiceStatus[parsedInvoiceData["number"]] = "Paid";
}

localStorage.setItem("invoices",JSON.stringify(parsedInvoiceStatus));


let checkmarkContainer = document.getElementById("checkmarkContainer");
let successContainer = document.getElementById("successContainer");

checkmarkContainer.innerHTML = `<div><svg class="checkmark checkmark-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <circle class="checkmark-circle" cx="25" cy="25" r="25" fill="none" />
  <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
  </svg></div>`;

successContainer.innerHTML += `<div id="successMessage" class="d-flex justify-content-center row g-5 text-center">
  <h2 class="text-success">SUCCESS!</h2>
  <p id="integrationMessage" class="mt-1">${parsedInvoiceData.company}, you've successfully paid <strong>invoice #${parsedInvoiceData.number}</strong> for the amount of <strong>$${parsedInvoiceData.paymentAmount.toFixed(2).toLocaleString("en-US")}</strong>.</p>
  </div>`

  setTimeout(() => {
    successContainer.style.display = "block";
  }, 2000);


function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

formDataInvoice = objectToFormData(parsedInvoiceData);
const url = 'step6.php';

jsonString = JSON.stringify(parsedInvoiceData);
let http = new XMLHttpRequest();
 
http.open('post', url, true);
http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
http.send(jsonString);
