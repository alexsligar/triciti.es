import {
  REGISTER_USER_ERROR,
  REGISTER_USER_PROCESSING,
  REGISTER_USER_SUCCESS,
} from '../actions/users/registerUser';

const initialState = {
  processing: false,
  error: null,
};

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_ERROR:
      return {
        ...state,
        error: action.error,
        processing: false,
      };
    case REGISTER_USER_PROCESSING:
      return {
        ...state,
        error: null,
        processing: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        error: null,
        processing: false,
      };
    default:
      return state;
  }
}
