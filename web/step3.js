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
}

// `https://example.com/${invoiceID}`