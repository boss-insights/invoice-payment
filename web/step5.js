document.addEventListener('DOMContentLoaded', function() {

    let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
    let checkedInvoiceData= `
      <h4 class="mb-3">Invoice #${parsedInvoiceData.number} is due for the amount of $${parsedInvoiceData.amount}</h4>`
      console.log(checkedInvoiceData);
      document.getElementById('invoice-data').innerHTML+=checkedInvoiceData;
    
    });
    
    if (localStorage.getItem("invoiceStatus") == "paid") {
        document.getElementById("payNow").innerHTML="Invoice Paid";
        document.getElementById("payNow").setAttribute("disabled", true);
        
    }