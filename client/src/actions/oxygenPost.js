import {
    ERROR,
    GET_POST,
    ADD_POST,
    DELETE_POST
} from '../actions/types';

import axios from 'axios';


//get posts
export const getPosts=()=> async dispatch=>{
try {
    const res=await axios.get('/api/posts/oxygen');
  
    dispatch({
        type:GET_POST,
        payload:res.data
    });
} catch (error) {
    dispatch({
        type:ERROR,
        payload:{msg:error.response}
    });
    
}
}

//delete post
export const deletePost=id=> async dispatch=>{
    try {
        await axios.delete(`api/posts/oxygen/${id}`);
    
        dispatch({
          type: DELETE_POST,
          payload: id
        });
    
        
      } catch (err) {
        dispatch({
          type: ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
}

//add post
export const addPost=({userName,phone,location,quantity,price,lastTimeVerified})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({userName,phone,location,quantity,price,lastTimeVerified});
   
    try {
        const res=await axios.post(`api/posts/oxygenAssist`,body,config);
        
        dispatch({
          type: ADD_POST,
          payload: res.data
        });
    
        
      } catch (err) {
        dispatch({
          type: ERROR,
          payload: { msg: err.message }
        });
      }
}
