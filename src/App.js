import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import {auth} from "./firebase";
import {useStateValue} from "./components/Provider";
import Payment from "./components/Payment/Payment";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import Orders from "./components/Orders/Orders";

const promise = loadStripe('pk_test_xi2VacvK6q9M2157PIarZVhq009ZCFJgb0');

function App() {
    const [{},dispatch] =useStateValue();


    useEffect(()=>{
        //will run once when app component loads..

        auth.onAuthStateChanged(authUser => {
            console.log('The USER IS >>',authUser);
            if (authUser){
                dispatch({
                    type:'SET_USER',
                    user:authUser
                })
                // user just logged in / user was logged in
            }
            else{
                dispatch({
                    type:'SET_USER',
                    user:null
                })

                ///user is logged out
            }
        })
    },[])

  return (
      <Router>
          <div className="app">

              <Switch>
                  <Route path="/login">
                        <Login />
                  </Route>
                  <Route path="/orders">
                      <Header />
                      <Orders />
                  </Route>
                  <Route path="/checkout">
                      <Header />
                      <Checkout />
                  </Route>
                  <Route path="/payment">
                      <Header />
                      <Elements stripe={promise}>
                    <Payment />
                      </Elements>
                  </Route>
                  <Route path="/">
                      <Header />
                      <Home />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
