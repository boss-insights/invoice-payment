//js for invoice status page for merchant
let invoice_status_container = document.getElementById("invoice-status")

let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));

let customer_name = parsedInvoiceData["company"];


// Check invoice status.
let parsedInvoiceStatus = JSON.parse(localStorage.getItem("invoices"));
let currentInvoiceStatus = parsedInvoiceStatus[parsedInvoiceData.number];
if (currentInvoiceStatus == undefined) {
    currentInvoiceStatus = "Pending";
}


invoice_status_container.innerHTML = `
    <div class="invoice-info">
    <h4 class="text-center mb-4">Invoice Details</h4>
    <p><strong>Company Name:</strong> ${parsedInvoiceData.company}</p>
    <p><strong>Invoice:</strong> #${parsedInvoiceData.number}</p>
    <p><strong>Amount Due:</strong> $${parsedInvoiceData.amount.toLocaleString("en-US")}</p>
    <p><strong>Due Date:</strong> ${parsedInvoiceData.due.slice(0,10)}</p>
    <p><strong>Invoice Status:</strong> ${currentInvoiceStatus}</p>
    </div>`;


    // toFixed(2)

