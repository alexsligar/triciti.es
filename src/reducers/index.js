import { combineReducers } from 'redux';
import initialData from './initialData';
import tags from './tags';

export default combineReducers({
    initialData,
    tags,
})