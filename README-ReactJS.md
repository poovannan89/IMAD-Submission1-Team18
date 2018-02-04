
This project is about adding a [Paypal Express checkout button](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/) as on of the payment methods on our webpage. 
<br> What is it ? <br>
Express Checkout gives your buyers a simplified checkout experience that keeps them local to your website or mobile app throughout the payment authorization process and lets them use their PayPal balance, bank account, or credit card to pay without sharing or entering any sensitive information on your site.

How it works ? <br>
The Express Checkout flow keeps the buyer on your web page or mobile app throughout the entire checkout flow. On desktops, buyers check out in a secure window that overlays your website. On tablets and smart phones, buyers access the PayPal payment screens in a full-page mobile browser. When a buyer clicks the PayPal button, the app sets up the payment and begins the checkout in a PayPal popup window. The buyer logs in to PayPal. Or, if the buyer previously enabled PayPal One Touch, they are logged in automatically. The buyer reviews and authorizes the payment. PayPal returns control to the app to finalize the payment. App can show confirmation page.

How to integrate it to our webpage? </br>
For Express Checkout integrations, PayPal provides the JavaScript checkout.js script. To begin your integration, add the checkout.js script to your client to render the PayPal button on your web page.[Here](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/add-paypal-button/) is the link to the paypal developers site where you can find the sample code. 
In your PayPal checkout script, you'll configure the look and feel of your checkout button, initiate a payment, and then define what happens when a buyer authorizes or cancels a payment. Finally, you'll determine what happens if an error occurs. <br/> <br/>

The frontend was coded using ReactJS. ReactJS is a JavaScript library to create interactive user interfaces. The core library is focussed on the view layer. It is declarative and component based.concerned with the view layer,it can be hooked up to any backend. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app/blob/master/README.md#creating-an-app).
You can find the detailed guide about create react app [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
[this](https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm) is another source to 

### Pre-requisites:

To set up the ReactJS environment the below are used:

- a editor to write the code; used [Visual Studio Code](https://code.visualstudio.com/) for this.

- [npm](https://www.npmjs.com/) to download and manage the needed packages. npm is a package manager for [Node.js](https://www.tutorialspoint.com/nodejs/nodejs_introduction.htm) with hundreds of packages.

- a browser to check out the components that are rendered. 

One can follow the above mentioned links to create react app, or [here](https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm) another link to set up manually. 

**Run the code locally:** <br/>

Once the above mentioned pre requisites are met, to start/run the app(in windows OS machine), follow the below commands 
- open the command prompt (gitbash is recommended)
- type in the command, "npm start"
This should open the web browser in the localhost://3000 port, that renders the paypal express checkout button. <br/>

Configuring the paypal button and make payments to a merchant : <br/>
The paypal developers website provides both sandbox and live(prodution) to make use of the paypal button. For this project, we followed used the sandbox accounts to check the transaction details and notifications of the successful payments. 


There are different integration methods provided by paypal, out of which we choose the Server-side REST API to Create and execute payments from the server. In this integration method, the payment will be created and executed on the server sideInitially, the client sends a token amount to charge the card and it will be sent to the server and the payment will be created and executed on the server side, and sends and acknowledgement to the client about the successful execution of the payment. The backend server is developed using PYthonFlask. 

Below is the glimpse of how the payments will be created and executed on server side. 

### payment() method
```javascript
 return new paypal.Promise(function(resolve,reject) {
            fetch(CREATE_PAYMENT_URL, {
                    method: 'POST',
                     headers:{
                       'Accept': 'application/json',
                        'Content-Type': 'application/json',
                     },
                    body:JSON.stringify({inputamt: inputamt})
                }).then((res) => res.json())
                .then((data) => {
                    console.log(data.paymentID)
                    resolve(data.paymentID); })
                .catch((err)=>{reject(err);})
            }) ;
```

### OnAuthorize() method: 
```javascript
fetch(EXECUTE_PAYMENT_URL, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({paymentID: data.paymentID,payerID:data.payerID}),
        }) .then((data) => { 
            console.log('payment is executed successfully');    
        })
        .catch((err)=>console.log(err))
   ```

The client sends the token amount taken as input from the user to the server using [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and then the server sends the paymentID back to the client. Once it is done, the client will be prompted to login to their paypal account on a pop up window and once it is successful, client can make payment by clicking on the pay now button and then client may get an acknowledgement on successful payment.  <br/> <br/>

[Here](https://medium.com/@swathikanduri/add-paypal-express-checkout-button-to-your-webpage-using-reactjs-3d9bb07cb38b) is the link to know more about configuring the button and making payments using paypal sandbox accounts.  <br/>



