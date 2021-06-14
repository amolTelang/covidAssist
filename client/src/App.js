import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import LoginRegister from "./components/auth/LoginRegister";
import Oxygens from "./components/posts/Oxygens";
// import Medicine from "./components/posts/Medicine"
// import Beds from "./components/posts/Bed"

//redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';



if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App=()=>{
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return(
    <Provider store={store}>
    <Router>
        <Route exact path='/' component={Landing}/>
          <Switch>
          <Route exact path="/login" component={LoginRegister}/>
          
            <Route exact path="/oxygen" component={Oxygens}/>

          </Switch>
     
    </Router>
    </Provider>
  )};

export default App;
