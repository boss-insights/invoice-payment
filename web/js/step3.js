// shows payment link button next to each invoice when clicked
function showPaymentLink(currentButtonContainer) {
  // Hide the Show Payment Link Button.
  currentButtonContainer.querySelector("button").setAttribute('hidden', true);
  // Reveal the Payment Link and Invoice Status buttons.
  currentButtonContainer.querySelectorAll("a").forEach((node) => node.removeAttribute("hidden"));
  currentButtonContainer.style="justify-content:space-around"
};

// retrieving invoice data
const url = 'step3.php?invoices';

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {
    let invoiceList = '<ul id="invoiceList" class="list-group mb-3">';

    document.getElementById('invoiceHeading').removeAttribute('hidden');
    document.getElementById("loadingMessage").setAttribute("hidden", true);
    
    for (let invoice of data) {

      // Assign background color according to number of days due
      let daysInteger = invoice.days;
      let invoiceDaysClass = daysInteger > 90 ? 'bg-red' : daysInteger > 60 ? 'bg-orange' : 'bg-green';

        let invoiceListItems = 
        `<li class="list-group-item d-flex justify-content-between lh-sm" data-invoice-json="${encodeURIComponent(JSON.stringify(invoice))}">
        
            <div class="selectInvoice form-check form-check-inline">
                <input class="form-check-input" type="radio" value="" name="invoiceRadio"
                        aria-label="Select invoice">
            </div>
            <div class="invoiceInfo flex-grow-1">
                <div class="d-flex flex-row align-items-center">
                    <h6 class="my-0">Invoice #${invoice.number}</h6>
                    <small class="invoiceDays ms-2 badge badge rounded-pill ${invoiceDaysClass}">${invoice.days} days</small>
                </div>
                <small class="invoiceCompany text-muted">${invoice.company}</small>
                <span class="invoiceAmount text-muted">$${invoice.amount.toFixed(2).toLocaleString("en-US")}</span>
            </div>
            <div class="invoiceButtonContainer">
            <button id="send-link-${invoice.number}" class="submitForm btn btn-primary btn-md" type="button" hidden>Send Payment Link</button>
            <a href="./step5.html" target="_blank" class="btn btn-secondary btn-md" hidden>Payment Link</a>
            <a href="./step7.html" class="btn btn-secondary btn-md" hidden>Invoice Status</a>
            </div>
      
                
        </li>`
        invoiceList += invoiceListItems 
        
    }

    invoiceList += '</ul>'
    document.getElementById('invoice-form').innerHTML+=invoiceList;

    const radios = document.querySelectorAll('input[type="radio"]');

// when invoice is clicked, sets current invoice
    radios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      let invoiceJSON = decodeURIComponent(this.closest('li').dataset.invoiceJson);
      let invoiceNumber = JSON.parse(invoiceJSON).number;
      let currentPaymentLink =  document.getElementById(`send-link-${invoiceNumber}`);

      document.querySelectorAll('button[id^="send-link"]').forEach(function (node) {
        node.setAttribute('hidden', true);
        })

        if (this.checked) {
        localStorage.setItem('invoiceJSON', invoiceJSON);

        // Hides all buttons
        document.querySelectorAll('.invoiceButtonContainer').forEach(function (node) {
          node.setAttribute('hidden', true);
          node.querySelectorAll("a").forEach((node) => node.setAttribute('hidden', true));
        })
        
        // Reveals only the selected invoice's buttons.
        currentPaymentLink.removeAttribute('hidden');
        currentPaymentLink.parentElement.removeAttribute('hidden');
        currentPaymentLink.addEventListener("click", () => showPaymentLink(currentPaymentLink.parentElement));


        } else {
          document.getElementById(`send-link-${invoiceNumber}`).setAttribute('hidden', true);
        }
        
    });
    });

    let loadingSpinner = document.getElementById("custom-loader");
    loadingSpinner.remove();

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

