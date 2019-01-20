import { combineReducers } from 'redux';
import registerUser from './registerUser';
import authUser from './authUser';
import authedUser from './authedUser';
import tags from './tags';
import items from './items';
import lists from './lists';
import users from './users';
import listItems from './listItems';

export default combineReducers({
  registerUser,
  authUser,
  authedUser,
  tags,
  items,
  lists,
  users,
  listItems,
});
