let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));

// Update the invoice's status to paid.
let parsedInvoiceStatus = JSON.parse(localStorage.getItem("invoices"));
parsedInvoiceStatus[parsedInvoiceData["number"]] = "paid";
localStorage.setItem("invoices",JSON.stringify(parsedInvoiceStatus));

let successMessage = document.getElementById("successMessage");

successMessage.innerHTML = `${parsedInvoiceData.company}, You've successfully paid invoice #${parsedInvoiceData.number}.`;