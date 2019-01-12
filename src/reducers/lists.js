import {
  LIST_LOADING,
  LIST_ERROR,
  LIST_SUCCESS,
} from '../actions/lists/getList';
import {
  ADD_LIST_PROCESSING,
  ADD_LIST_ERROR,
  REMOVE_ADD_LIST_ERROR,
  ADD_LIST_SUCCESS,
  SHOW_NEW_LIST_MODAL,
  CLOSE_NEW_LIST_MODAL,
} from '../actions/lists/addList';
import {
  UPDATE_LIST_PROCESSING,
  UPDATE_LIST_ERROR,
  REMOVE_UPDATE_LIST_ERROR,
  UPDATE_LIST_SUCCESS,
} from '../actions/lists/updateList';
import {
  DELETE_LIST_PROCESSING,
  DELETE_LIST_ERROR,
  REMOVE_DELETE_LIST_ERROR,
  DELETE_LIST_SUCCESS,
} from '../actions/lists/deleteList';

const initialState = {
  getList: {
    loading: false,
    error: null,
  },
  addList: {
    processing: false,
    error: null,
    showModal: false,
  },
  updateList: {
    processing: false,
    error: null,
  },
  deleteList: {
    processing: false,
    error: null,
  },
  list: {},
};

export default function lists(state = initialState, action) {
  switch (action.type) {
    case LIST_LOADING:
      return {
        ...state,
        getList: {
          ...state.getList,
          loading: true,
        },
      };
    case LIST_ERROR:
      return {
        ...state,
        getList: {
          ...state.getList,
          loading: false,
          error: action.error,
        },
      };
    case LIST_SUCCESS:
      return {
        ...state,
        getList: {
          ...state.getList,
          loading: false,
          error: null,
        },
        list: action.list,
      };
    case ADD_LIST_PROCESSING:
      return {
        ...state,
        addList: {
          ...state.addList,
          processing: true,
        },
      };
    case ADD_LIST_ERROR:
      return {
        ...state,
        addList: {
          ...state.addList,
          processing: false,
          error: action.error,
        },
      };
    case ADD_LIST_SUCCESS:
      return {
        ...state,
        addList: {
          ...state.addList,
          processing: false,
          error: null,
          showModal: false,
        },
      };
    case REMOVE_ADD_LIST_ERROR:
      return {
        ...state,
        addList: {
          ...state.addList,
          error: null,
        },
      };
    case SHOW_NEW_LIST_MODAL:
      return {
        ...state,
        addList: {
          ...state.addList,
          showModal: true,
        },
      };
    case CLOSE_NEW_LIST_MODAL:
      return {
        ...state,
        addList: {
          ...state.addList,
          showModal: false,
        },
      };
    case UPDATE_LIST_PROCESSING:
      return {
        ...state,
        updateList: {
          ...state.updateList,
          processing: true,
        },
      };
    case UPDATE_LIST_ERROR:
      return {
        ...state,
        updateList: {
          ...state.updateList,
          processing: false,
          error: action.error,
        },
      };
    case UPDATE_LIST_SUCCESS:
      return {
        ...state,
        updateList: {
          ...state.updateList,
          processing: false,
          error: null,
        },
      };
    case REMOVE_UPDATE_LIST_ERROR:
      return {
        ...state,
        updateList: {
          ...state.updateList,
          error: null,
        },
      };
    case DELETE_LIST_PROCESSING:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          processing: true,
        },
      };
    case DELETE_LIST_ERROR:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          processing: false,
          error: action.error,
        },
      };
    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          processing: false,
          error: null,
        },
      };
    case REMOVE_DELETE_LIST_ERROR:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          error: null,
        },
      };
    default:
      return state;
  }
}
