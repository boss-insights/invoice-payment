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


$selfSigned = (bool)getenv('SELF_SIGNED_CERT');
$client = new Client(['verify' => !$selfSigned, 'base_uri' => 'https://' . $_SESSION['account_domain']]);
// var_dump( file_get_contents('php://input'));
$body = json_decode(file_get_contents("php://input"), true);
// var_dump($_POST);die();
// header('Content-Type: text/html');
echo '<pre>'; 
print_r($body);
// echo $_POST['amount'];die();
// ['amount'], $_POST['customerRef'], $_POST['invoiceId'])

if (isset($body['customerRef'], $body['invoiceId'], $body['amount'])) {

        
    try {
        $request_param = [
            "CustomerRef" => ["value" => $body['customerRef']],
                        "TotalAmt" => $body['amount'],
                        "Line" => [[
                                "Amount" => $body['amount'],
                                "LinkedTxn" => [["TxnId" => $body['invoiceId'],"TxnType" => "Invoice"]]
                        ]],
                        
                    ];
        $request_data = json_encode($request_param);

        $response = $client->request('POST', '/api/proxy_request?key=quickbooks&url=https%3A%2F%2Fsandbox-quickbooks.api.intuit.com%2Fv3%2Fcompany%2F4620816365260953720%2Fpayment', [
        'auth' => ['admin', $_SESSION['password']],
        'headers' => [
            'User-Agent' => 'BossInsightsApiClient/1.0',
            'Accept' => 'application/json'
        ],
        'body' => $request_data
        // 'form_params' => [
        //     "CustomerRef" => ["value" => $body['customerRef']],
        //                 "TotalAmt" => $body['amount'],
        //                 "Line" => [
        //                         "Amount" => $body['amount'],
        //                         "LinkedTxn" => ["TxnId" => $body['invoiceId'],"TxnType" => "Invoice"]
        //                 ],
                        
        //             ]
        ]);
        print_r($request_data);
        print_r($response->getBody()->getContents());
    } catch (Exception $e) {
        throw new Exception($e->getMessage(), $e->getCode(), $e);
    }


}
