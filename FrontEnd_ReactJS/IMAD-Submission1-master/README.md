React is a JavaScript library to create interactive user interfaces. The core library is focussed on the view layer. It is declarative and component based.This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the indetailed guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)

The project is about adding a [Paypal Express checkout button](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/) as on of the payment methods on our webpage. 
<br> What is it ? <br>
Express Checkout gives your buyers a simplified checkout experience that keeps them local to your website or mobile app throughout the payment authorization process and lets them use their PayPal balance, bank account, or credit card to pay without sharing or entering any sensitive information on your site.

How it works ? <br>
The Express Checkout flow keeps the buyer on your web page or mobile app throughout the entire checkout flow. On desktops, buyers check out in a secure window that overlays your website. On tablets and smart phones, buyers access the PayPal payment screens in a full-page mobile browser. When a buyer clicks the PayPal button, the app sets up the payment and begins the checkout in a PayPal popup window. The buyer logs in to PayPal. Or, if the buyer previously enabled PayPal One Touch, they are logged in automatically. The buyer reviews and authorizes the payment. PayPal returns control to the app to finalize the payment. App can show confirmation page.

How to integrate it to our webpage? </br>
For Express Checkout integrations, PayPal provides the JavaScript checkout.js script. To begin your integration, add the checkout.js script to your client to render the PayPal button on your web page.[Here](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/add-paypal-button/) is the link to the paypal developers site where you can find the sample code. 
In your PayPal checkout script, you'll configure the look and feel of your checkout button, initiate a payment, and then define what happens when a buyer authorizes or cancels a payment. Finally, you'll determine what happens if an error occurs.
