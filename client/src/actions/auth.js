import axios from 'axios';
import{
   SEND_OTP,
   VERIFY_OTP,
   FAIL,
   LOAD_USER,
   LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';
import {setAlert} from './alert';
var hash;

//load user
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res=await axios.get('/api/users')
        dispatch({
            type:LOAD_USER,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:FAIL,

        });
       
    }
}

//get otp
export const getOtp=({ userName,phone})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const code="+91";
    phone=code.concat(phone);
    const body=JSON.stringify({userName,phone});
    try {
        const res=await axios.post('/api/users/sendOTP',body,config);
        hash=res.data.hash;

        dispatch({
            type: SEND_OTP,
        });
    
    } catch (err) {
        const errors=err.response.data.errors;
        if(errors)
        {
            errors.forEach(error=>dispatch(setAlert(error.msg,`fail`)))
        }
        dispatch({
            type:FAIL
        });
        
    }
}

//verify otp
export const verifyOtp=({userName,phone,otp})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const code="+91";
    phone=code.concat(phone);
    const body=JSON.stringify({userName,phone,hash,otp});
    try {
        const res=await axios.post('/api/users/verifyOTP',body,config);
        dispatch({
            type: VERIFY_OTP,
            payload:res.data
        });
       
        dispatch(loadUser());
    } catch (err) {
        const errors=err.response.data.errors;
        if(errors)
        {
            errors.forEach(error=>dispatch(setAlert(error.msg,`fail`)))
        }
        dispatch({
            type:FAIL
        });
        
    }
}

//logout
export const userLogout=()=>dispatch=>{
    dispatch({type:LOGOUT})
}