import {
    ERROR,
    GET_POST,
    ADD_POST,
    DELETE_POST
} from '../actions/types';
import {setAlert} from './alert';

import axios from 'axios';


//get posts
export const getPosts=()=> async dispatch=>{
try {
    const res=await axios.get('/api/posts/medicine');
  
    dispatch({
        type:GET_POST,
        payload:res.data
    });
} catch (err) {
  const errors=err.response.data.errors;
  if(errors)
  {
      errors.forEach(error=>dispatch(setAlert(error.msg,`fail`)))
  }
    dispatch({
        type:ERROR,
        payload:{msg:err.response}
    });
    
}
}

//delete post
export const deletePost=id=> async dispatch=>{
    try {
        await axios.delete(`api/posts/medicine/${id}`);
    
        dispatch({
          type: DELETE_POST,
          payload: id
        });
    
        
      } catch (err) {
        const errors=err.response.data.errors;
        if(errors)
        {
            errors.forEach(error=>dispatch(setAlert(error.msg,`fail`)))
        }
        dispatch({
          type: ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
}

//add post
export const addPost=({userName,phone,address,quantity,price,lastTimeVerified,docrequired,typeOfMedicine})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({userName,phone,address,quantity,price,lastTimeVerified,docrequired,typeOfMedicine});
   
    try {
        const res=await axios.post(`api/posts/medicineAssist`,body,config);
        
        dispatch({
          type: ADD_POST,
          payload: res.data
        });
    
        dispatch(setAlert(`post sent`,`success`));
      } catch (err) {
        const errors=err.response.data.errors;
        if(errors)
        {
            errors.forEach(error=>dispatch(setAlert(error.msg,`fail`)))
        }
        dispatch({
          type: ERROR,
          payload: { msg: err.message }
        });
      }
}
