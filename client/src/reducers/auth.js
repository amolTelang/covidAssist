import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from '../actions/types';
  
  const initialState = {
    token: document.cookies.get('accessToken'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
            document.cookies.remove('accessToken');
            document.cookies.remove('refreshToken');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            };
     
      default:
        return state;
    }
  }