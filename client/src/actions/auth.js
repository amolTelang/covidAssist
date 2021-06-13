import axios from 'axios';

import{
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//get otp
export const register=({ userName,phone})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({userName,phone});
    try {
        const res=await axios.post('/api/users/sendOTP',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,

        });
        console.error(error.response.data);
    }
}