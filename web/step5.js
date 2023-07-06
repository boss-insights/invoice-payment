document.addEventListener('DOMContentLoaded', function() {

    let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
    let checkedInvoiceData= `
    <h4>Hi ${parsedInvoiceData.company},</h4>
    <p class="mb-3">You have an invoice due, please <br> see the details below:</p>
    <p><strong>Invoice: #${parsedInvoiceData.number} <br> Amount due: $${parsedInvoiceData.amount.toLocaleString("en-US")} <br> Due date: ${parsedInvoiceData.due.slice(0,10)}</strong></p>
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
    
    });
      