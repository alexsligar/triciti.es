import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from '../actions/authUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        user: action.user,
        token: action.token,
      };
    case REMOVE_AUTHED_USER:
      return null;
    default:
      return state;
  }
}
