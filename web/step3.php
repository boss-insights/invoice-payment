<?php
/**
 * @global array $commonData

 */

use GuzzleHttp\Client;

require __DIR__ . '/../common.php';

if (!isset($_SESSION['account_key'])) {
  header('Location: index.php');
  exit;
}

if (isset($_POST['nextStep'])) {
  header('Location: /step4.php');
  exit;
}

// pull in data via API and show list of invoices
$selfSigned = (bool)getenv('SELF_SIGNED_CERT');
$client = new Client(['verify' => !$selfSigned, 'base_uri' => 'https://' . $_SESSION['account_domain']]);

$page = 1;
$invoices = [];
if (isset($_GET['invoices'])) {

    do {
    try {
        $response = $client->request('GET', '/api/invoices?page=' . $page, [
        'auth' => ['admin', $_SESSION['password']],
        'headers' => [
            'User-Agent' => 'BossInsightsApiClient/1.0',
            'Accept' => 'application/json'
        ]
        ]);
    } catch (Exception $e) {
        throw new Exception($e->getMessage(), $e->getCode(), $e);
    }

    if ($response->getStatusCode() === 200) {
        $result = json_decode($response->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);
        if ($result === null) {
        throw new Exception('invalid data api response');
        }
        $resultCount = count($result);
        foreach ($result as $invoice) {
        if ($invoice['balance'] > 0) {
            $invoices[] = ['number' => $invoice['invoiceNumber'], 'company' => $invoice['customerName'], 'amount' => $invoice['balance'] / 100, 'due' => $invoice['paymentDueDate'], 'days' => (int)round(((time() - strtotime($invoice['paymentDueDate'])) / 86400)), 'billing_email' => $invoice['billingEmail'], 'invoiceId' => $invoice['srcId'], 'customerRef' => $invoice['customerId']];
        }
        }
    } else {
        throw new Exception('unable to communicate with data api');
    }
    $page++;
    } while ($resultCount > 0);
        header('Content-type: application/json');
        echo json_encode($invoices);
} else {
    header('Location: step3.html');
}
