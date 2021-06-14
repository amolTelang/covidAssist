import {
    GET_POST,
    ADD_POST,
    ERROR,
    DELETE_POST
} from '../actions/types';

const initialState={
    posts:[],
    post:null,
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const {type,payload}=action

    switch(type)
    {   
        case ADD_POST:
            return{
                ...state,
                posts:payload,
                loading:false
            }
        case GET_POST:
            return{
                ...state,
                posts:[payload,...state.post],
                loading:false
            }
        case ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case DELETE_POST:
            return{
                ...state,
                posts:state.posts.filter(post=>post._id!==payload),
                loading:false
            }
        default:
            return state;
    };
};