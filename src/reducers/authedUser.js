import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from '../actions/authUser';
import { UPDATE_USER_SUCCESS } from '../actions/users/updateUser';

export default function authedUser(state = {}, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        user: action.user,
        token: action.token,
      };
    case REMOVE_AUTHED_USER:
      return {};
    case UPDATE_USER_SUCCESS:
      return {
        user: action.user,
        token: action.token ? action.token : state.token,
      };
    default:
      return state;
  }
}
