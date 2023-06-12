document.addEventListener('DOMContentLoaded', function() {

    let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
    let checkedInvoiceData= `
      <h4 class="mb-3">${parsedInvoiceData.company}, invoice #${parsedInvoiceData.number} is due for the amount of $${parsedInvoiceData.amount.toFixed(2)}</h4>`
      console.log(checkedInvoiceData);
      document.getElementById('invoice-data').innerHTML+=checkedInvoiceData;
    
    });
    