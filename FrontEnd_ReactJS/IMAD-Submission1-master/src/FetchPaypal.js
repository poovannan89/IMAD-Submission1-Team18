import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';



const PayPalButton = paypal.Button.driver('react', {React, ReactDOM});


const CREATE_PAYMENT_URL='https://app.antitank89.hasura-app.io/api/payment';                   // url for creating payment i.e. payment() method
const EXECUTE_PAYMENT_URL='https://app.antitank89.hasura-app.io/api/execute';             // url for executing payment i.e. authorize() method


export default class FetchPaypal extends React.Component {



    payment(){
        var inputamt=document.getElementById("amt_input_id").value;
        if( inputamt<=0){
            alert('total amount cant be empty, zero or any string. Please enter a valid amount '); 
            return true;
        }
        else{
            var send_amt = {
                inputamt : inputamt 
            };

            return new paypal.Promise(function(resolve,reject) {
            fetch(CREATE_PAYMENT_URL, {
                    method: 'POST',
                  //  headers : new Headers(),
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
        }
        }


    onAuthorize(data){
        console.log('onAuthorize method called')
        // post the payment ID, payer ID to the server so that, it takes these params
        // and then executes the payment. 
        // and write a then(function) to show a confirmation page etc,. if u want
       
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
       
    }

    render() {
        return (
            <div >
                <div> <span> <p> <i> please enter the total payment amount: </i> </p>   </span>
                      <span> <input name="amt_input" id="amt_input_id" type="number" />  </span>
                </div> &nbsp; &nbsp; 
                <PayPalButton 
                    payment={this.payment}
                    env={'sandbox'}
                    onAuthorize={this.onAuthorize}
                />       
            </div>
        );
    }
}
