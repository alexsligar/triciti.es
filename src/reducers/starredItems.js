import {
  TOGGLE_STARRED_ITEM_ERROR,
  TOGGLE_STARRED_ITEM_SUCCESS,
} from '../actions/starredItems/toggleStarredItem';

const initialState = {
  toggleStarredItem: {
    error: null,
  },
};

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STARRED_ITEM_ERROR:
      return {
        ...state,
        toggleStarredItem: {
          ...state.toggleStarredItem,
          error: action.error,
        },
      };
    case TOGGLE_STARRED_ITEM_SUCCESS:
      return {
        ...state,
        toggleStarredItem: {
          ...state.toggleStarredItem,
          error: null,
        },
      };
    default:
      return state;
  }
}
