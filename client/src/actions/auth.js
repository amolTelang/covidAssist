import axios from 'axios';
import{
   SEND_OTP,
   VERIFY_OTP,
   FAIL
} from './types';

var hash;

//load user
// export const loadUser=()=>async dispatch=>{
//     try {
//         dispatch({
//             type:LOAD_USER
//         })
//     } catch (error) {
//         dispatch({
//             type:LOGIN_FAIL,

//         });
//         console.error(error.response.data);
//     }
// }

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
            type: SEND_OTP,
        });
    } catch (error) {
        dispatch({
            type:FAIL
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
            type: VERIFY_OTP,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:FAIL
        });
        console.error(error.response.data);
    }
}