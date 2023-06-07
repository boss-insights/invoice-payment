import {getSessionCookie} from './step2.js';

paymentLink.addEventListener("click", showPaymentLink);
function showPaymentLink(invoiceID) {
    //shows payment url after button is clicked
    let paymentURL = document.createElement("a");
    paymentURL.setAttribute("href", "./step4.html");
    paymentURL.innerHTML="Payment Link";
    invoiceContainer.appendChild(paymentURL);
    console.log("paymentUrl working")
    //shows invoice status page url after button is clicked
    let statusURL = document.createElement("a");
    statusURL.setAttribute("href", "./step7_invoiceStatus.html");
    let lineBreak = document.createElement("br")
    invoiceContainer.appendChild(lineBreak);
    statusURL.innerHTML="Invoice Status";
    invoiceContainer.appendChild(statusURL);
    console.log("statusURL working")
    //disables payment button
    paymentLink.setAttribute("disabled", true);
    paymentLink.innerHTML = "Payment Link Sent";
};


const url = 'step3.php?invoices';
var parsedInvoiceData;

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {
    let invoiceList = '<ul id="invoiceList" class="list-group mb-3">';
    for (let invoice of data) {

        let invoiceListItems = 
        `<li class="list-group-item d-flex justify-content-between lh-sm" data-invoice-json="${encodeURIComponent(JSON.stringify(invoice))}">
        
            <div class="selectInvoice form-check form-check-inline">
                <input class="form-check-input" type="checkbox" value="" name="${invoice.number}"
                        aria-label="Select invoice">
            </div>
            <div class="invoiceInfo flex-grow-1">
                <div class="d-flex flex-row align-items-center">
                    <h6 class="my-0">${invoice.number}</h6>
                    <small class="invoiceDays ms-2 badge badge rounded-pill">${invoice.days}</small>
                </div>
                <small class="invoiceCompany text-muted">${invoice.company}</small>
            </div>
                <span class="invoiceAmount text-muted">${invoice.amount}</span>
        </li>`

        invoiceList += invoiceListItems 
        
    }

    invoiceList += '</ul>'
    document.getElementById('invoice-form').innerHTML+=invoiceList;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');


    checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
        // console.log('Checkbox ' + this.name + ' is checked');
        let invoiceJSON = decodeURIComponent(this.closest('li').dataset.invoiceJson);
        localStorage.setItem('invoiceJSON', invoiceJSON);
        
        // parsedInvoiceData = JSON.parse(invoiceJSON);
        console.log(invoiceJSON);
        
        } else {
        console.log('Checkbox ' + this.id + ' is not checked');
        }
    });
    });

    

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

