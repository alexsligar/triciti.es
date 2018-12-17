import { combineReducers } from 'redux';
import initialData from './initialData';
import registerUser from './registerUser';
import authUser from './authUser';
import authedUser from './authedUser';
import tags from './tags';

export default combineReducers({
    initialData,
    registerUser,
    authUser,
    authedUser,
    tags,
})