import React,{Fragment,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import LoginRegister from "./components/auth/LoginRegister";
import Oxygens from "./components/posts/Oxygens";
import Alert from "./components/Alert";
import Medicine from "./components/posts/Medicine"


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
      <Fragment>
      <Navbar/>
        <Route exact path='/' component={Landing}/>
        <Alert/>
          <Switch>
          <Route exact path="/login" component={LoginRegister}/>
          
            <Route exact path="/oxygen" component={Oxygens}/>
            <Route exact path="/medicine" component={Medicine}/>
    



          </Switch>
          </Fragment>
    </Router>
    </Provider>
  )};

export default App;
