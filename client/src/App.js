import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import LoginRegister from "./components/auth/LoginRegister";

//redux
import {Provider} from 'react-redux';
import store from './store';




const App=()=>(
    <Provider store={store}>
    <Router>
        <Route exact path='/' component={Landing}/>
          <Switch>
          <Route exact path="/login" component={LoginRegister}/>
          </Switch>
     
    </Router>
    </Provider>
  );

export default App;
