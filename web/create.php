<?php

require __DIR__ . '/../common.php';
require_once '../vendor/autoload.php';
// require_once './stripe-secret.php';

\Stripe\Stripe::setApiKey($commonData['STRIPE_SECRET_KEY']);

function calculateOrderAmount(array $items): int {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return $items[1]->invoiceAmount;
}



header('Content-Type: application/json');

try {
    // retrieve JSON from POST body
    $jsonStr = file_get_contents('php://input');
    $jsonObj = json_decode($jsonStr);

    // Create a PaymentIntent with amount and currency
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => calculateOrderAmount($jsonObj->items),
        'currency' => 'cad',
        'automatic_payment_methods' => [
            'enabled' => true,
        ],
        'metadata' => [
            'invoiceNumber' =>  $jsonObj->items['0']->invoiceNumber,
        ]
    ]);

    $output = [
        'clientSecret' => $paymentIntent->client_secret,
    ];

    echo json_encode($output);
} catch (Error $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}


?>