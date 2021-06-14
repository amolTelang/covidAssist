import {
    SEND_OTP,
    VERIFY_OTP,
   FAIL,
   LOAD_USER
  } from '../actions/types';
 

  const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated: null,
    loading:true,
    user:null
  };
  
  export default function(state = initialState, action) {
    const {type ,payload}= action;
  
    switch (type) {
      case SEND_OTP:
        return {
            ...state,
            isAuthenticated:false,
            loading:true
          };
    case VERIFY_OTP:
        localStorage.setItem('token',payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading:false
        }
    case LOAD_USER:
        return{
            ...state,
            isAuthenticated:true,
            loading:false,
            user:payload
        }
      case FAIL:
          localStorage.removeItem('token');
          return{
              ...state,
              token:null,
              isAuthenticated:false,
              loading:false
          }
      
     
      default:
        return state;
    }
  }