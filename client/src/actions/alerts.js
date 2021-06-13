import { v4 as uuidv4 } from 'uuid';


//import action types
import {SET_ALERT,
    REMOVE_ALERT
} from './types';

//function to add and remove alert
export const setAlert=(msg,type,timeout=3000)=>dispatch=>{

    const id=uuidv4();
    dispatch({
        type:SET_ALERT,
        payload:{msg,type,id}
    });

    //will remove alert from the screen after 3 seconds
    setTimeout(()=>dispatch({
        type:REMOVE_ALERT,
        payload:id
    }),timeout);
};