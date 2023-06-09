//js for invoice status page for merchant
let invoice_status_container = document.getElementById("invoice-status")

let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));

let customer_name = parsedInvoiceData["company"];

let invoice_number = localStorage.getItem("invoiceNumber");
let invoice_status = localStorage.getItem("invoiceStatus");


invoice_status_container.innerHTML = `<p>${customer_name}'s invoice ${invoice_number} is ${invoice_status}</p>`;


