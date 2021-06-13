import {SET_ALERT,
    REMOVE_ALERT
} from '../actions/types'

//initial state
const initialState=[];




export default function(state=initialState,action)
{   
    //destructuring data from the action
    const{type,payload}=action
    switch(type)
    {
        //sets an alert
        case SET_ALERT:
            return[...state,payload]

        //removes an alert    
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id!==payload)
            
        //return a state by default
        default:
            return state;
    }
}