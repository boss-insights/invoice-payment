import {getSessionCookie} from './step2.js';

paymentLink.addEventListener("click", showPaymentLink);
function showPaymentLink(invoiceID) {
    //shows payment url after button is clicked
    let paymentURL = document.createElement("a");
    let buttonBox = document.getElementById("button-box");
    buttonBox.appendChild(paymentURL);
    paymentURL.setAttribute("href", "./step4.html");
    paymentURL.setAttribute("class", "w-45 btn btn-secondary btn-lg col");
    paymentURL.innerHTML="Payment Link";
    buttonContainer.appendChild(paymentURL);
    
    //shows invoice status page url after button is clicked
    let statusURL = document.createElement("a");
    buttonBox.appendChild(statusURL);
    statusURL.setAttribute("href", "./step7_invoiceStatus.html");
    statusURL.setAttribute("class", "w-45 btn btn-secondary btn-lg col");
    let lineBreak = document.createElement("br")
    invoiceContainer.appendChild(lineBreak);
    statusURL.innerHTML="Invoice Status";
    buttonContainer.appendChild(statusURL);
   
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
                <input class="form-check-input" type="radio" value="" name="invoiceRadio"
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

    const radios = document.querySelectorAll('input[type="radio"]');


    radios.forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (this.checked) {
       
        let invoiceJSON = decodeURIComponent(this.closest('li').dataset.invoiceJson);
        localStorage.setItem('invoiceJSON', invoiceJSON);
        paymentLink.removeAttribute("disabled");
        
        } 
        
    });
    });

    let loadingSpinner = document.getElementsByClassName("lds-ellipsis");
    loadingSpinner[0].remove();

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

