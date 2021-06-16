import {combineReducers} from 'redux';

import auth from './auth';
import oxygenPost from './oxygenPost';
import alert from './alert';
export default combineReducers({
auth,
oxygenPost,
alert
})