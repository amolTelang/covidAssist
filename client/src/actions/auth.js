import axios from 'axios';
import{
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';

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
export const verifyOtp=({userName,phone,hash,otp})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({userName,phone});
    try {
        const res=await axios.post('/api/users/verifyOTP',body,config);
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