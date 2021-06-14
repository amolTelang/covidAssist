import {combineReducers} from 'redux';

import auth from './auth';
import oxygenPost from './oxygenPost'
export default combineReducers({
auth,
oxygenPost
})