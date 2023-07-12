function getSessionCookie(cookieName) {
    let cookies = document.cookie.split(";"); // Split cookies by ';'
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim(); // Trim leading/trailing whitespace
     
      // Check if the cookie starts with the provided name

      if (cookie.indexOf(cookieName + "=") === 0) {
        
        // Return the cookie value (substring after the name and '=')
        console.log(cookie.substring(cookieName.length + 1));
        return cookie.substring(cookieName.length + 1);
      }
    }
    
    // Return null if the cookie is not found
    return null;
  };

// import { getSessionCookie } from "./step2.js";

// This is your test publishable API key.
const decodedStripe = decodeURI(getSessionCookie('STRIPE_PUBLISH_KEY'))
const stripe = Stripe(decodedStripe);

// The items the customer wants to buy
let parsedInvoiceData = JSON.parse(localStorage.getItem('invoiceJSON'));
const items = [{invoiceNumber: parsedInvoiceData["number"]},
               {invoiceAmount: Math.ceil(parsedInvoiceData["amount"]*100)} ];

// Set the invoice as pending.
let parsedInvoiceStatus = JSON.parse(localStorage.getItem("invoices"));
parsedInvoiceStatus[parsedInvoiceData["number"]] = "Pending";
localStorage.setItem("invoices",JSON.stringify(parsedInvoiceStatus));

// Set the payment amount.
parsedInvoiceData["paymentAmount"] = parsedInvoiceData["amount"];
localStorage.setItem("invoiceJSON",JSON.stringify(parsedInvoiceData));

console.log(localStorage.getItem("invoices"));
console.log("checkout.js amount as int: ",Math.ceil(parsedInvoiceData["amount"]*100));

let elements;
let currentPaymentIntent = initialize();

console.log(currentPaymentIntent);

checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

let emailAddress = '';
// Fetches a payment intent and captures the client secret
async function initialize() {
  const { clientSecret } = await fetch("/create.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }).then((r) => r.json());

  

  elements = stripe.elements({ clientSecret });

  const linkAuthenticationElement = elements.create("linkAuthentication");
  linkAuthenticationElement.mount("#link-authentication-element");

  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");

  

}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://127.0.0.1:8080/step5.html",
      receipt_email: emailAddress,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}