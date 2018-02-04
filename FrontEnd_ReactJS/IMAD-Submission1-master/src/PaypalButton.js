import React from 'react';
import ReactDOM from 'react-dom';
// import DialogBox from './DialogBox';

import paypal from 'paypal-checkout';

const PayPalButton = paypal.Button.driver('react', {React, ReactDOM});


export default class PayPalCheckout extends React.Component {

    constructor(){
        super();
        this.state={
            showResult:false
        }
    }

    onAuthorize(data, actions) {
        console.log('authorizing method is called here');
        // Optional: display a confirmation page here
        // Display the payment details and a confirmation button
    

        return actions.payment.get().then(function(data) {

            // Display the payment details and a confirmation button

            var shipping = data.payer.payer_info.shipping_address;

            document.querySelector('#recipient').innerText = shipping.recipient_name;
            document.querySelector('#line1').innerText     = shipping.line1;
            document.querySelector('#city').innerText      = shipping.city;
            document.querySelector('#state').innerText     = shipping.state;
            document.querySelector('#zip').innerText       = shipping.postal_code;
            document.querySelector('#country').innerText   = shipping.country_code;

            //document.querySelector('#paypal-button-container').style.display = 'none';
            document.querySelector('#confirm').style.display = 'block';

            // Listen for click on confirm button

           document.querySelector('#confirmButton').addEventListener("click", (e) =>  {
               console.log('confirm button event class is called');
                    
                // Disable the button and show a loading message

                document.querySelector('#confirm').innerText = 'Loading...';
                document.querySelector('#confirm').disabled = true;

                // Execute the payment

                return actions.payment.execute().then(function() {

                // Show a thank-you note and clear the input box 

                    document.querySelector('#thanksname').innerText = shipping.recipient_name;
                    document.querySelector('#confirm').style.display = 'none';
                    document.querySelector('#thanks').style.display = 'block';  
                    document.getElementById("amt_input_id").value='';
                });
            },false);
        });
    
            
    }

   
    payment() {

        var inputamt=document.getElementById("amt_input_id").value;
        if( inputamt<=0){
           alert('total amount cant be empty, zero or any string. Please enter a valid amount ');
           // <DialogBox/>
            return true;
        }
        else{
            const env = this.props.env;
            const client = this.props.client;
            console.log('payment method is called here')
            return paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                    
                        amount: {total: inputamt, currency: 'INR'}
                    }
                ]
            });
            
           //  this.setState({showResult:true}); 
             
        }
    }

   onErrror(err){
       console.log('some error has occured, please try again properly')
   }
 
                  /* add this code above amount line in transactins */
    /*  item_list: {
                        items: [
                            {
                            name: "hat",
                            description: "Brown hat.",
                            price: '3',
                            currency: 'USD',
                            quantity: "1",
                            tax: "0.00",
                            "sku": "1",
                            },
                            {
                                name: "handbag",
                                description: "Black handbag.",
                                price: '7',
                                currency: 'USD',
                                quantity: "1",
                                tax: "0.00",
                                sku: "item 2",  
                            }
                        ],
                        shipping_address: {
                            recipient_name: "Brian Robinson",
                            line1: "4th Floor",
                            line2: "Unit #34",
                            city: "San Jose",
                            country_code: "US",
                            postal_code: "95131",
                            phone: "011862212345678",
                            state: "CA"
                        }   
                    },*/

    render() {
        const client = {
           sandbox:'AUe1MOE728ao0-krDiGyQ9vrWwPhcPtRCKob0sljLA9d_UjKdqRh7ZRQAq6_LUX1XwKJr-JjkFKBStQ9' // my sandbox app client id
        };

        return (
            <div>
                    <div> <span> <p> <i> please enter the total payment amount: </i> </p>   </span>
                      <span> <input name="amt_input" id="amt_input_id" type="number" />  </span>
                    </div> &nbsp; &nbsp; 
                            <PayPalButton env={'sandbox'}
                            client={client}
                            payment={this.payment}
                            commit={true} // Optional: show a 'Pay Now' button in the checkout flow
                            onAuthorize={this.onAuthorize}/>
                           
                          
                           { /*    { this.state.showResults ? <Results /> :null }  */} 
                        
                          
                    <div /* id="paypal-button-container" */ >   &nbsp; &nbsp; &nbsp; 
                        <div id="confirm" className="hidden" > 
                            <div>Shipping to:</div>
                            <div><span id="recipient"></span>, <span id="line1"></span>, <span id="city"></span></div>
                            <div><span id="state"></span>, <span id="zip"></span>, <span id="country"></span></div>      
                            &nbsp; &nbsp; &nbsp;  <button id="confirmButton">Complete Payment</button>
                        </div>
                        <div id="thanks" className="hidden">
                            Thanks, <span id="thanksname"></span>!
                        </div>
                   </div>      
            </div>
        );
    }
}

                    // trying to hide the shippind details and confirm payment button initially


class Results extends React.Component{
    render () {
        return (
            <div>
                <div>  &nbsp; &nbsp; &nbsp; 
                    <div id="confirm" className="hidden" > 
                        <div>Shipping to:</div>
                        <div><span id="recipient"></span>, <span id="line1"></span>, <span id="city"></span></div>
                        <div><span id="state"></span>, <span id="zip"></span>, <span id="country"></span></div>      
                        &nbsp; &nbsp; &nbsp;  <button id="confirmButton">Complete Payment</button>
                    </div>
                    <div id="thanks" className="hidden">
                       Thanks, <span id="thanksname"></span>!
                    </div>
                </div>
            </div>
        );
    }
}
