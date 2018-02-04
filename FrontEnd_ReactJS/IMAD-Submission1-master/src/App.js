import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PayPalCheckout from './PaypalButton.js';
import {BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Cart from './Cart';
import FetchPaypal from './FetchPaypal';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>  
          <Router> 
              <div style={{float:'center'}} > 
                <ul style={{listStyle:'none'}} >
                  <li style={{display:'inline-block',paddingRight:20 }}>   
                  <Link to="/" > 
                  <IconButton iconClassName="material-icons" tooltip="Go Home"> home </IconButton> 
                  </Link>  </li>
                  <li style={{paddingLeft:20 ,display:'inline-block' }} >   
                  <Link to="/FetchPaypal.js" >  go to paypal button </Link></li>
                  <li style={{paddingLeft:20 ,display:'inline-block' }}>   
                  <Link to="/Cart.js" > cart page  </Link>  </li>
                </ul>
                <Switch>
                  <Route path="/FetchPaypal.js" component={FetchPaypal} /> 
                  <Route path="/Cart.js" component={Cart} />   
                </Switch>
              </div>
            </Router>
        </div>
      </div>
    );
  }
}

export default App;
