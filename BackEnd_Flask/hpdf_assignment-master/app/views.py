from flask import render_template, request, make_response, abort, jsonify, redirect, url_for
from app.forms import CheckoutForm
from app import app
from urllib.request import urlopen
from bs4 import BeautifulSoup
import json,logging 
import paypalrestsdk
paypalrestsdk.configure({
  "mode": "sandbox", # sandbox or live
  "client_id": "AQBhEyJ3eHxZjct02KmnC9tuItCtW9W1CLjNvUk-XJJPvQ-CcUEUcYMf_Hf7ladliImxa1o5RXdP7PZf",
  "client_secret": "EHRbkvOjUB1xzWXxwV_Y74Klbz0omO63xin9dWF174e8HEPH9VXQgedxzOSn7K5yn4hrg6knXQr7YmBI" })

checkout_amount=0

class CheckAmount(object):
	tamount = 'none'
	def __init__(self, tamount=None):
		self.tamount=tamount

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html',
                           title='Home')                           

@app.route('/authors', methods=['GET'])
def authors():
	users_url = 'https://jsonplaceholder.typicode.com/users'
	resp = urlopen(users_url)				
	users_details = json.loads(resp.read().decode('utf-8'))
	uname_list = []	
	for euser in users_details:		
		uname_list.append(euser['name'])
	return str(uname_list)

@app.route('/posts', methods=['GET'])
def posts():
	posts_url = 'https://jsonplaceholder.typicode.com/posts'
	resp = urlopen(posts_url)	
	posts_details = json.loads(resp.read().decode('utf-8'))		
	return render_template('posts.html',title='Home',posts=posts_details)


@app.route('/postcount', methods=['GET'])
def postcount():
	users_url = 'https://jsonplaceholder.typicode.com/users'
	users_resp = urlopen(users_url)			
	users_details = json.loads(users_resp.read().decode('utf-8'))
	uid_uname_dict = {}
	for euser in users_details:
		uid_uname_dict[euser['id']] = euser['name'] 
	posts_url = 'https://jsonplaceholder.typicode.com/posts'
	posts_resp = urlopen(posts_url)	
	posts_details = json.loads(posts_resp.read().decode('utf-8'))		
	uid_post_count_dict = {}

	for uid in uid_uname_dict:
		pcnt = 0
		for epost in posts_details:			
			if epost['userId'] == uid:				
				pcnt += 1			
		uid_post_count_dict[uid] = pcnt
	uname_post_count_dict = {}
	for uid in uid_post_count_dict:
		uname_post_count_dict[uid_uname_dict[uid]] =  uid_post_count_dict[uid]

	return render_template('pcount.html',userpcount=uname_post_count_dict)
	
@app.route('/login',methods = ['POST', 'GET'])
def login():
	if request.method == 'POST':
		if 'uname' in request.cookies or 'upass' in request.cookies:
			return "Cookie login is already set"
		else:		
			uname = request.form['uname']
			upass = request.form['upass']
			isEmptyFields = False 
			if uname == '' or upass == '':			
				isEmptyFields = True
				resp = make_response(render_template('readcookie.html',isEmptyFields=isEmptyFields))
				return resp						
			else:
				resp = make_response(render_template('readcookie.html',isEmptyFields=isEmptyFields))
				resp.set_cookie('uname',uname)
				resp.set_cookie('upass',upass)		
				return resp
	if request.method == 'GET':
		return render_template('index.html')	 

@app.route('/getcookies', methods= ['GET'])
def getcookies():
	if request.method == 'GET':	
		cookielist=[]
		cookielist.append(request.cookies.get('uname'))
		cookielist.append(request.cookies.get('upass'))
		return str(cookielist)

@app.errorhandler(401)
def page_forbidden(e):
	return render_template('401.html'),401
	
@app.route('/robots.txt', methods= ['GET'])
def deny_request():
	abort(401)

@app.route('/image', methods = ['GET'])
def display_image():
	return render_template('image.html')

@app.route('/input',methods = ['POST', 'GET'])
def input():
	if request.method == 'POST':		
		feedback = request.form['feedback']
		if feedback == '':
			return "No feedback received. Please enter again"
		else:
			print("Feedback received is",feedback)
			resp = make_response(render_template('thankyou.html',feedback=feedback))
			return resp
	if request.method == 'GET':
		return render_template('input.html')

@app.route('/checkout',methods = ['POST','GET'])
def checkout():
	form = CheckoutForm()	
	if form.validate_on_submit():
		checkout_amount= request.form['amount']
		ca = CheckAmount(checkout_amount)
		print("check amt is ", ca.tamount)
		return redirect(url_for('paymentss'))
	return render_template('checkout.html', title='Pay Now', form=form)


@app.route('/paymentcs',methods= ['POST', 'GET'])
def paymentcs():
	if request.method == 'GET':
		return render_template('paypal.html')

@app.route('/api/payment', methods=['POST'])
def api_payment():
	if request.method == 'POST':
		print('request data is',request.data)		
		amt_details= request.get_json(force=True)		
		print('amt_details is',amt_details,'type is',type(amt_details))		
		amt = amt_details['inputamt']		
		int_amt = int(amt)		
		payment = paypalrestsdk.Payment({
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"},
		"redirect_urls": {
			"return_url": "https://app.antitank89.hasura-app.io/api/execute",
			"cancel_url": "https://app.antitank89.hasura-app.io"
		},
		"transactions": [{
			"item_list": {
				"items": [{
					"name": "item1",
					"sku": "12345",
					"price": int_amt,
					"currency": "INR",
					"quantity": 1}]},										
			"amount": {
				"total": int_amt,
				"currency": "INR"
			},
			"description": "This is the payment transaction description"		
		}]
		})
	if payment.create():
		print('Payment success')
	else:
		print(payment.error)
	print('PaymentID created is',payment.id)	
	return jsonify({'paymentID' : payment.id})

@app.route('/api/execute', methods=['POST'])
def api_execute():
	success = False
	payment_details = request.get_json(force=True)
	print('Inside api_execute type of payment_details is',type(payment_details))
	payment = paypalrestsdk.Payment.find(payment_details['paymentID'])
	if payment.execute({'payer_id' : payment_details['payerID']}):
		print('Execute success')
		success = True
	else:
		print(payment.error)	
	return jsonify({'success' : success})

# To DO : Make a list of transactions dynamically and update it
@app.route('/payment', methods=['POST'])
def payment():			
	item1q = request.form['item1q']
	item2q = request.form['item2q']
	item3q = request.form['item3q']
	item1p = request.form['item1p']
	item2p = request.form['item2p']
	item3p = request.form['item3p']	
	int_1q = int(item1q)

	print('value is',int(item1q),"sec value is",int(item1p))
	total_p = int(item1q)*int(item1p) + int(item2q)*int(item2p) + int(item3q)*int(item3p)
	print('total price is',total_p)
	payment = paypalrestsdk.Payment({
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"},
		"redirect_urls": {
			"return_url": "http://localhost:8080/payment/execute",
			"cancel_url": "http://localhost:8080/"
		},
		"transactions": [{
			"item_list": {
				"items": [{
					"name": "item1",
					"sku": "12345",
					"price": int(item1p),
					"currency": "INR",
					"quantity": int(item1q)},
					{
					"name": "item2",
					"sku": "12346",
					"price": int(item2p),
					"currency": "INR",
					"quantity": int(item2q)},
					{
					"name": "item3",
					"sku": "12347",
					"price": int(item3p),
					"currency": "INR",
					"quantity": int(item3q)},	
					]},				
			"amount": {
				"total": int(total_p),
				"currency": "INR"
			},
			"description": "This is the payment transaction description"		
		}]
		})
	if payment.create():
		print('Payment success')
	else:
		print(payment.error)

	return jsonify({'paymentID' : payment.id})

@app.route('/paymentss')
def paymentss():	
		return render_template('paypalss.html')	

@app.route('/execute', methods=['POST'])
def execute():
    success = False
    payment = paypalrestsdk.Payment.find(request.form['paymentID'])

    if payment.execute({'payer_id' : request.form['payerID']}):
        print('Execute success!')
        success = True
    else:
        print(payment.error)

    return jsonify({'success' : success})

	