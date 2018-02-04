WEEK2 : TASK :
Paypal Express check out from https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/
What is it ?
Express Checkout gives your buyers a simplified checkout experience that keeps them local to your website or mobile app throughout the payment authorization process and lets them use their PayPal balance, bank account, or credit card to pay without sharing or entering any sensitive information on your site.

How it works ? 
The Express Checkout flow keeps the buyer on your web page or mobile app throughout the entire checkout flow. On desktops, buyers check out in a secure window that overlays your website. On tablets and smart phones, buyers access the PayPal payment screens in a full-page mobile browser.

When a buyer clicks the PayPal button, the app sets up the payment and begins the checkout in a PayPal popup window.
The buyer logs in to PayPal. Or, if the buyer previously enabled PayPal One Touch, they are logged in automatically.
The buyer reviews and authorizes the payment.
PayPal returns control to the app to finalize the payment. App can show confirmation page.

What does it use ?

1. Hasura
2. Paypal Express Checkout API and SDK

Current Status :

http://localhost:8080/paymentcs

This is client side REST API Integration where we get input on total amount to checkout and call paypal APIs to process payments and 
provide expected response. The transaction is completing, but need to return response to customer properly.

http://localhost:8080/paymentss 

This is server side REST API integration. It is working where we input total amount alone dynamically via text box.
Need to work on total items, transaction list to be more dynamic.

How to build on top of this ? 

Need to work on integrating with reactJS front end as well as providing as API.


EXISTING CODE BASE WITH SAME BRANCH : 

# hpdf_assignment Week1

Started this week1 task by creating virtual environment for flask and installed flask related packages using pip install. 
Then, created the project directory and implemented the tasks provided for week1. 
Followed the below tutorial for setting up flask in virtual environment : 
https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world-legacy

#Functionalities Task1 : simply displays Hello world - 
My name. 

Task2 : 
a) http://localhost:8080/authors URL end point fetches the list of authors from 
https://jsonplaceholder.typicode.com/users Returned the list of authors as list converted to string while returning response. 
b) http://localhost:8080/posts URL end point fetches list of posts from 
https://jsonplaceholder.typicode.com/posts Displayed the output in table format. 
c) http://localhost:8080/postcount URL end point provides number of posts each other has made. 
Used list and dict data structures and displayed output as table.

Task3 : http://localhost:8080/setcookie URL end point is used to set cookie with inputs as username and age. 
Form inputs are validated using inbuilt validators and errors are notified. On success of validation, cookie is set. 
If cookie is already set, it is also notified in response for the request.

Task4 : http://localhost:8080/getcookies URL end point is used to retrieve the list of cookies which is already set.

Task5 : http://localhost:8080/robots.txt URL end point denies user's request and custom message of 404 is displayed. 
Error handler and abort are used.

Task6 : http://localhost:8080/image URL end point displays a image which is stored in static directory of project.

Task7 : http://localhost:8080/input URL end point gets user input (feedback) and displays in stdout and shows the user feedback. 
User input is validated if it is empty or not.



