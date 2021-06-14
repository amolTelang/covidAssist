import {
    ERROR,
    GET_POST,
    GET_POSTS,
    SEND_POSTS
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
        payload:{msg:error.response.statusText,status:error.response.status}
    });
    
}
}
