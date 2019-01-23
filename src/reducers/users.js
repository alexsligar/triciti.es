import {
  USER_LOADING,
  USER_ERROR,
  USER_SUCCESS,
} from '../actions/users/getUser';
import {
  USER_LISTS_LOADING,
  USER_LISTS_ERROR,
  USER_LISTS_SUCCESS,
} from '../actions/users/getUserLists';
import {
  USER_STARRED_ITEMS_LOADING,
  USER_STARRED_ITEMS_ERROR,
  USER_STARRED_ITEMS_SUCCESS,
} from '../actions/users/getUserStarredItems';
import {
  ADD_ITEM_TO_LIST,
  REMOVE_ITEM_FROM_LIST,
} from '../actions/listItems/toggleListItem';
import {
  ADD_STAR_TO_ITEM,
  REMOVE_STAR_FROM_ITEM,
} from '../actions/starredItems/toggleStarredItem';

const initialState = {
  getUser: {
    loading: false,
    error: null,
  },
  getUserLists: {
    loading: false,
    error: null,
  },
  getUserStarredItems: {
    loading: false,
    error: null,
  },
  user: {},
  userLists: {
    username: null,
    lists: [],
  },
  userStarredItems: {
    username: null,
    items: [],
  },
};

export default function lists(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        getUser: {
          ...state.getUser,
          loading: true,
        },
      };
    case USER_ERROR:
      return {
        ...state,
        getUser: {
          ...state.getUser,
          loading: false,
          error: action.error,
        },
      };
    case USER_SUCCESS:
      return {
        ...state,
        getUser: {
          ...state.getUser,
          loading: false,
          error: null,
        },
        user: action.user,
      };
    case USER_LISTS_LOADING:
      return {
        ...state,
        getUserLists: {
          ...state.getUserLists,
          loading: true,
        },
      };
    case USER_LISTS_ERROR:
      return {
        ...state,
        getUserLists: {
          ...state.getUserLists,
          loading: false,
          error: action.error,
        },
      };
    case USER_LISTS_SUCCESS:
      return {
        ...state,
        getUserLists: {
          ...state.getUserLists,
          loading: false,
          error: null,
        },
        userLists: {
          ...state.userLists,
          username: action.username,
          lists: action.lists,
        },
      };
    case ADD_ITEM_TO_LIST:
      return {
        ...state,
        userLists: {
          ...state.userLists,
          lists: state.userLists.lists.map(list => {
            if (list.id !== action.listId) return list;
            return {
              ...list,
              items: list.items.concat([action.itemId]),
            };
          }),
        },
      };
    case REMOVE_ITEM_FROM_LIST:
      return {
        ...state,
        userLists: {
          ...state.userLists,
          lists: state.userLists.lists.map(list => {
            if (list.id !== action.listId) return list;
            return {
              ...list,
              items: list.items.filter(item => {
                return item !== action.itemId;
              }),
            };
          }),
        },
      };
    case USER_STARRED_ITEMS_LOADING:
      return {
        ...state,
        getUserStarredItems: {
          ...state.getUserStarredItems,
          loading: true,
        },
      };
    case USER_STARRED_ITEMS_ERROR:
      return {
        ...state,
        getUserStarredItems: {
          ...state.getUserStarredItems,
          loading: false,
          error: action.error,
        },
      };
    case USER_STARRED_ITEMS_SUCCESS:
      return {
        ...state,
        getUserStarredItems: {
          ...state.getUserStarredItems,
          loading: false,
          error: null,
        },
        userStarredItems: {
          ...state.userStarredItems,
          username: action.username,
          items: action.items,
        },
      };
    case ADD_STAR_TO_ITEM:
      if (action.username === state.userStarredItems.username) {
        return {
          ...state,
          userStarredItems: {
            ...state.userStarredItems,
            items: state.userStarredItems.items.concat(action.item),
          },
        };
      } else {
        return state;
      }
    case REMOVE_STAR_FROM_ITEM:
      if (action.username === state.userStarredItems.username) {
        return {
          ...state,
          userStarredItems: {
            ...state.userStarredItems,
            items: state.userStarredItems.items.filter(
              item => item.id !== action.itemId
            ),
          },
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
