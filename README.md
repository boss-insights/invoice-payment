# Invoice Payment

## What This Application Does
This is an example invoice payment application. A merchant is able to connect to an accounting integration using Boss Insight's Link Connection Widget, select an invoice, and then send a payment link specific to the business. Next, the business client is able to follow the link to make a payment towards the invoice. Finally, the merchant is able to view the payment status of the invoice, either through the application or through the accounting software's user interface.

> ⚠️ **Disclaimer**: This is an example application and not intended for production use as-is, it lacks code in areas such as logging and security and is provided as a bare-bones example of how to connect and fetch data from the Boss Insights API

### Steps This Application Performs (Condensed)
1. Index Page: The merchant signs up. Provisions private data storage for a merchant using your API credentials
2. Merchant connects to accounting integration with Link Connection Widget. Authorizes access to accounting software. This application only connects to Quickbooks.
3. Synchronizes invoice data and presents invoices to select on screen. Merchant selects invoice and sends payment link.
4. Business Client receives payment link and pays the invoice.
5. Business Client redirected to confirmation/success page. Payment amount updated on Quickbooks.
6. Merchant can check invoice payment status on step 6 or from Quickbooks UI.

![Flow chart of steps application performs](https://github.com/boss-insights/invoice-payment/blob/main/web/images/invoice-payment-flow.png)

### How the example app works (Detailed)

When you first access the application you should be presented with `Index` which is Step 1 and looks like the screenshot below:
![Example application screenshot showing step 1](https://github.com/boss-insights/invoice-payment/blob/main/web/images/invoice-payment.png "Step 1")

At this point only one API call has been performed which is to add the current domain name that the app is being accessed via to an allow-list permitting embedding of the javascript widget. This is provided as an example convenience and typically in a production app you would add this manually yourself via the `Developers > Embed > Allowed URLs` menu option within the administration application. 

Clicking the `Continue` button will use the API to provision a data storage account for a merchant which will provide a unique merchant account identifier that must be passed to the javascript widget on the subsequent step 2 so that it knows for which merchant any connected data will be associated with.

Step 2 will present the javascript widget to allow the merchant to select their preferred application to provide data (the Data Provider). See our documentation on the [embedded javascript widget](https://docs.bossinsights.com/developer/link-connection-widget) for more details on the widget itself. Once the merchant selected an application they are redirected to an authentication & authorization screen where they grant access to share data, with this completed they are redirected to the next step in our example workflow. As part of the authorization process we store a token which will allow subsequent access to the Data Provider. 

Step 3 will perform an API call using our `invoices` endpoint of the Boss Insights API which will return a list of the merchants invoices. The merchant is then able to select an invoice and send a payment link. This is illustrative, and the `Send Payment Link` button redirects to Step 4.

Step 4 will present invoice information to business customer, business customer can select desired amount they would like to pay towards invoice which will be processed through a Stripe widget. Upon successful payment, business customer will be redirected to Step 5.

Step 5 will perform an API post using our `proxy_request` endpoint of the Boss Insights API which will update the accounting software's invoice data with the amount paid. This page will also display a success message to the business customer.

Step 6 will present a status page to the merchant with the statuses of either Paid/Partially Paid/Pending.


## Self Hosting

For testing and development purposes you can run the application from your local development machine. You will need the following installed:

* PHP 8.2 or higher - [https://www.php.net/downloads.php](https://www.php.net/downloads.php)
* Composer 2.2 or higher - [https://getcomposer.org/download/](https://getcomposer.org/download/)

It is assumed these will be added to your system [PATH](https://en.wikipedia.org/wiki/PATH_(variable)), if not you'll need to adjust the commands below to reference their full file system paths

Open a terminal and change your current working directory to the root of the freshly checked out copy of the code.
You will need to run the following commands:

#### Install library dependencies
```shell
composer update
```

#### Start a local webserver
```shell
composer start
```

This command will start a local web server running on port 8080

### Environment Configuration Variables

| Variable           | Required | Description                                                                                                      | Example                             |
|--------------------|----------|------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| ORG_NAME           | yes      | The name of your company that should be shown to users                                                           | Example Capital Corp                |
| ORG_URL            | yes      | Your Boss Insights account url                                                                                   | https://example.myintranetapps.com  |
| API_KEY            | yes      | API Key used to identify API requests for your account                                                           | APIPROJECT3                         |
| API_SECRET         | yes      | API Secret used to authenticate requests for your account                                                        |                                     |
| ADMIN_URL          | yes      | The URL to your admin app. This is region dependant and will vary depending on your data residency               | https://admin.myintranetapps.com    |
| ACCOUNT_KEY        | yes      | Your Boss Insights account unique identifier                                                                     | 5ff363e48e2a82.98390839             |
| BRAND_ACCENT_COLOR | no       | A HTML hexadecimal color code that will be used in the example app as a bold color for buttons and other accents | CA76F6                              |
| STRIPE_PUBLISH_KEY | yes      | Client side key. Obtainable from Stripe.                                                                         | pk_test_A7jK4iCYHL045qgjjfzAfPxu    |
| STRIPE_SECRET_KEY  | yes      | Server side key. Obtainable from Stripe. Must remain secret and stored securely.                                 | sk_test_Hrs6SAopgFPF0bZXSN3f6ELN    |

> ⚠️ **Note**: Composer will read a start script in the `composer.json` file in the project root folder, inside this are environment configuration variables which you will need to change to suit your account information (see the table above for a list of the variables)

#### Viewing the application
Using your web browser open [http://127.0.0.1:8080](http://127.0.0.1:8080) and you should be presented with Step 1 of the example application.


## Debugging
Two pages are made available to help troubleshoot problems:
 * [http://127.0.0.1:8080/debug.php](http://127.0.0.1:8080/debug.php) - will show all current configuration environment variables
 * [http://127.0.0.1:8080/info.php](http://127.0.0.1:8080/info.php) - will show details of the PHP webserver environment

You may be asked to provide a copy of the output of these pages if logging a support ticket regarding this sample app.

---

The code and above steps should give you an introduction in to how to use the Boss Insights API, For support with this example app or the API in general please use our help center at [bossinsights.com/support](https://bossinsights.com/support)