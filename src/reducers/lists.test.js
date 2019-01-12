import lists from './lists';
import {
  LIST_LOADING,
  LIST_ERROR,
  LIST_SUCCESS,
} from '../actions/lists/getList';
import {
  ADD_LIST_PROCESSING,
  ADD_LIST_ERROR,
  ADD_LIST_SUCCESS,
  REMOVE_ADD_LIST_ERROR,
  SHOW_NEW_LIST_MODAL,
  CLOSE_NEW_LIST_MODAL,
} from '../actions/lists/addList';
import {
  UPDATE_LIST_PROCESSING,
  UPDATE_LIST_ERROR,
  UPDATE_LIST_SUCCESS,
  REMOVE_UPDATE_LIST_ERROR,
} from '../actions/lists/updateList';
import {
  DELETE_LIST_PROCESSING,
  DELETE_LIST_ERROR,
  DELETE_LIST_SUCCESS,
  REMOVE_DELETE_LIST_ERROR,
} from '../actions/lists/deleteList';

const initialState = {
  addList: {
    processing: false,
    error: null,
    showModal: false,
  },
  getList: {
    loading: false,
    error: null,
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

describe('lists reducer', () => {
  it('should return the correct initial state', () => {
    expect(lists(undefined, {})).toEqual(initialState);
  });

  it('should handle LIST_LOADING', () => {
    const action = {
      type: LIST_LOADING,
    };
    const initial = {
      ...initialState,
      getList: {
        loading: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getList: {
        loading: true,
        error: 'Uh oh',
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle LIST_ERROR', () => {
    const action = {
      type: LIST_ERROR,
      error: 'test',
    };
    const initial = {
      ...initialState,
      getList: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getList: {
        loading: false,
        error: action.error,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle LIST_SUCCESS', () => {
    const listExample = { name: 'test list' };
    const action = {
      type: LIST_SUCCESS,
      list: listExample,
    };
    const initial = {
      ...initialState,
      getList: {
        ...initialState.getList,
        loading: true,
      },
    };
    const expected = {
      ...initialState,
      getList: {
        ...initialState.getList,
        loading: false,
      },
      list: listExample,
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle ADD_LIST_PROCESSING', () => {
    const action = {
      type: ADD_LIST_PROCESSING,
    };
    const initial = {
      ...initialState,
      addList: {
        ...initialState.addList,
        processing: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      addList: {
        ...initialState.addList,
        processing: true,
        error: 'Uh oh',
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle ADD_LIST_ERROR', () => {
    const action = {
      type: ADD_LIST_ERROR,
      error: 'Uh oh',
    };
    const initial = {
      ...initialState,
      addList: {
        ...initialState.addList,
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      addList: {
        ...initialState.addList,
        processing: false,
        error: action.error,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle ADD_LIST_SUCCESS', () => {
    const action = {
      type: ADD_LIST_SUCCESS,
    };
    const initial = {
      ...initialState,
      addList: {
        processing: true,
        error: 'Uh oh',
        showModal: true,
      },
    };
    const expected = {
      ...initialState,
      addList: {
        processing: false,
        error: null,
        showModal: false,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle SHOW_NEW_LIST_MODAL', () => {
    const action = {
      type: SHOW_NEW_LIST_MODAL,
    };
    const initial = {
      ...initialState,
      addList: {
        ...initialState.addList,
        showModal: false,
      },
    };
    const expected = {
      ...initialState,
      addList: {
        ...initialState.addList,
        showModal: true,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle CLOSE_NEW_LIST_MODAL', () => {
    const action = {
      type: CLOSE_NEW_LIST_MODAL,
    };
    const initial = {
      ...initialState,
      addList: {
        ...initialState.addList,
        showModal: true,
      },
    };
    const expected = {
      ...initialState,
      addList: {
        ...initialState.addList,
        showModal: false,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_ADD_LIST_ERROR', () => {
    const action = {
      type: REMOVE_ADD_LIST_ERROR,
    };
    const initial = {
      ...initialState,
      addList: {
        ...initialState.addList,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      addList: {
        ...initialState.addList,
        error: null,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_LIST_PROCESSING', () => {
    const action = {
      type: UPDATE_LIST_PROCESSING,
    };
    const initial = {
      ...initialState,
      updateList: {
        ...initialState.updateList,
        processing: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateList: {
        ...initialState.updateList,
        processing: true,
        error: 'Uh oh',
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_LIST_ERROR', () => {
    const action = {
      type: UPDATE_LIST_ERROR,
      error: 'Uh oh',
    };
    const initial = {
      ...initialState,
      updateList: {
        ...initialState.updateList,
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      updateList: {
        ...initialState.updateList,
        processing: false,
        error: action.error,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_LIST_SUCCESS', () => {
    const action = {
      type: UPDATE_LIST_SUCCESS,
    };
    const initial = {
      ...initialState,
      updateList: {
        processing: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateList: {
        processing: false,
        error: null,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_UPDATE_LIST_ERROR', () => {
    const action = {
      type: REMOVE_UPDATE_LIST_ERROR,
    };
    const initial = {
      ...initialState,
      updateList: {
        ...initialState.updateList,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateList: {
        ...initialState.updateList,
        error: null,
      },
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_LIST_PROCESSING', () => {
    const initial = {
      ...initialState,
      deleteList: {
        ...initialState.deleteList,
        processing: false,
      },
    };
    const expected = {
      ...initialState,
      deleteList: {
        ...initialState.deleteList,
        processing: true,
      },
    };
    const action = {
      type: DELETE_LIST_PROCESSING,
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_LIST_ERROR', () => {
    const initial = {
      ...initialState,
      deleteList: {
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      deleteList: {
        processing: false,
        error: 'Uh oh',
      },
    };
    const action = {
      type: DELETE_LIST_ERROR,
      error: 'Uh oh',
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_DELETE_LIST_ERROR', () => {
    const initial = {
      ...initialState,
      deleteList: {
        ...initialState.deleteList,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      deleteList: {
        ...initialState.deleteList,
        error: null,
      },
    };
    const action = {
      type: REMOVE_DELETE_LIST_ERROR,
    };
    expect(lists(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_LIST_SUCCESS', () => {
    const initial = {
      ...initialState,
      deleteList: {
        processing: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      deleteList: {
        processing: false,
        error: null,
      },
    };
    const action = {
      type: DELETE_LIST_SUCCESS,
    };
    expect(lists(initial, action)).toEqual(expected);
  });
});
