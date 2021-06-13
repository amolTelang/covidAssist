import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import LoginRegister from "./components/auth/LoginRegister";
import OtpVerify from "./components/auth/OtpVerify";

const App=()=>{
  return (
    <Router>
        <Route exact path='/' component={Landing}/>
          <Switch>
          <Route exact path="/login" component={LoginRegister}/>
          <Route exact path="/otpVerify" component={OtpVerify}/>
          </Switch>
     
    </Router>
  )}

export default App;
