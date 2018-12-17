import { combineReducers } from 'redux';
import initialData from './initialData';
import registerUser from './registerUser';
import tags from './tags';

export default combineReducers({
    initialData,
    registerUser,
    tags,
})