import {
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from '../actions/types';
  import Cookies from 'js-cookie';

  const initialState = {
    token: Cookies.get('accessToken'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN_SUCCESS:
    case LOAD_USER:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
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