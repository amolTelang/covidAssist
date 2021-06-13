import axios from 'axios';
import{
    LOAD_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';

var hash;

//load user

//get otp
export const getOtp=({ userName,phone})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({userName,phone});
    try {
        const res=await axios.post('/api/users/sendOTP',body,config);
        hash=res.data.hash;
        dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,

        });
        console.error(error.response.data);
    }
}

//verify otp
export const verifyOtp=({userName,phone,otp})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({userName,phone,hash,otp});
    try {
        const res=await axios.post('/api/users/verifyOTP',body,config);
        dispatch({
            type: LOAD_USER,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,

        });
        console.error(error.response.data);
    }
}