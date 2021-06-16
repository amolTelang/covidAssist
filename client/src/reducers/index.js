import {combineReducers} from 'redux';

import auth from './auth';
import oxygenPost from './oxygenPost';
import alert from './alert';

import medicinePost from './medicinePost';
export default combineReducers({
auth,
oxygenPost,

medicinePost,
alert
})