import {
  ITEMS_ERROR,
  ITEMS_LOADING,
  ITEMS_SUCCESS,
} from '../actions/items/getItems';

import {
  ITEM_LOADING,
  ITEM_ERROR,
  ITEM_SUCCESS,
} from '../actions/items/getItem';

import {
  ADD_ITEM_PROCESSING,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  REMOVE_ADD_ITEM_ERROR,
} from '../actions/items/addItem';

import {
  UPDATE_ITEM_PROCESSING,
  UPDATE_ITEM_ERROR,
  UPDATE_ITEM_SUCCESS,
  REMOVE_UPDATE_ITEM_ERROR,
} from '../actions/items/updateItem';

import {
  DELETE_ITEM_PROCESSING,
  DELETE_ITEM_ERROR,
  REMOVE_DELETE_ITEM_ERROR,
  DELETE_ITEM_SUCCESS,
} from '../actions/items/deleteItem';

import {
  ADD_ITEM_TO_LIST,
  REMOVE_ITEM_FROM_LIST,
} from '../actions/listItems/toggleListItem';

const initialState = {
  getItem: {
    loading: true,
    error: null,
  },
  getItems: {
    loading: false,
    error: null,
  },
  addItem: {
    processing: false,
    error: null,
  },
  updateItem: {
    processing: false,
    error: null,
  },
  deleteItem: {
    processing: false,
    error: null,
  },
  item: {},
  items: [],
};

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case ITEMS_ERROR:
      return {
        ...state,
        getItems: {
          ...state.getItems,
          error: action.error,
          loading: false,
        },
      };
    case ITEMS_LOADING:
      return {
        ...state,
        getItems: {
          ...state.getItems,
          loading: true,
        },
      };
    case ITEMS_SUCCESS:
      return {
        ...state,
        getItems: {
          ...state.getItems,
          loading: false,
          error: null,
        },
        items: action.items,
      };
    case ITEM_LOADING:
      return {
        ...state,
        getItem: {
          ...state.getItem,
          loading: true,
        },
      };
    case ITEM_ERROR:
      return {
        ...state,
        getItem: {
          ...state.getItem,
          loading: false,
          error: action.error,
        },
      };
    case ITEM_SUCCESS:
      return {
        ...state,
        getItem: {
          ...state.getItem,
          loading: false,
          error: null,
        },
        item: action.item,
      };
    case ADD_ITEM_TO_LIST:
      return {
        ...state,
        item: {
          ...state.item,
          list_number: state.item.list_number + 1,
        },
      };
    case REMOVE_ITEM_FROM_LIST:
      return {
        ...state,
        item: {
          ...state.item,
          list_number: state.item.list_number - 1,
        },
      };
    case ADD_ITEM_PROCESSING:
      return {
        ...state,
        addItem: {
          ...state.addItem,
          processing: true,
        },
      };
    case ADD_ITEM_ERROR:
      return {
        ...state,
        addItem: {
          ...state.addItem,
          processing: false,
          error: action.error,
        },
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        addItem: {
          ...state.addItem,
          processing: false,
          error: null,
        },
      };
    case REMOVE_ADD_ITEM_ERROR:
      return {
        ...state,
        addItem: {
          ...state.addItem,
          error: null,
        },
      };
    case UPDATE_ITEM_PROCESSING:
      return {
        ...state,
        updateItem: {
          ...state.updateItem,
          processing: true,
        },
      };
    case UPDATE_ITEM_ERROR:
      return {
        ...state,
        updateItem: {
          ...state.updateItem,
          processing: false,
          error: action.error,
        },
      };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        updateItem: {
          ...state.updateItem,
          processing: false,
          error: null,
        },
      };
    case REMOVE_UPDATE_ITEM_ERROR:
      return {
        ...state,
        updateItem: {
          ...state.updateItem,
          error: null,
        },
      };
    case DELETE_ITEM_PROCESSING:
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          processing: true,
        },
      };
    case DELETE_ITEM_ERROR:
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          processing: false,
          error: action.error,
        },
      };
    case REMOVE_DELETE_ITEM_ERROR:
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          error: null,
        },
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          processing: false,
          error: null,
        },
      };
    default:
      return state;
  }
}
