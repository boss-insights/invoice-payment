//js for invoice status page for merchant
let invoice_status_container = document.getElementById("invoice-status")

let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));

let customer_name = parsedInvoiceData["company"];


// Check invoice status.
let parsedInvoiceStatus = JSON.parse(localStorage.getItem("invoices"));
let currentInvoiceStatus = parsedInvoiceStatus[parsedInvoiceData.number];
if (currentInvoiceStatus == undefined) {
    currentInvoiceStatus = "pending";
}


invoice_status_container.innerHTML = `
    <h4><strong>Company Name: ${parsedInvoiceData.company}</strong></h4>
    <h4><strong>Invoice: #${parsedInvoiceData.number}</strong></h4>
    <h4><strong>Amount due: $${parsedInvoiceData.amount.toFixed(2)}</strong></h4>
    <h4><strong>Due date: ${parsedInvoiceData.due.slice(0,10)}</strong></h4>
    <h4><strong>Invoice status: ${currentInvoiceStatus}</strong></h4>`;




