import items from './items';
import {
  ITEMS_LOADING,
  ITEMS_ERROR,
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
import {
  ADD_STAR_TO_ITEM,
  REMOVE_STAR_FROM_ITEM,
} from '../actions/starredItems/toggleStarredItem';

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

describe('items reducer', () => {
  it('should return the correct initial state', () => {
    expect(items(undefined, {})).toEqual(initialState);
  });

  it('should handle ITEMS_LOADING', () => {
    const action = {
      type: ITEMS_LOADING,
    };
    const initial = {
      ...initialState,
      getItems: {
        loading: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getItems: {
        loading: true,
        error: 'Uh oh',
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ITEMS_ERROR', () => {
    const action = {
      type: ITEMS_ERROR,
      error: 'test',
    };
    const initial = {
      ...initialState,
      getItems: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getItems: {
        loading: false,
        error: action.error,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ITEMS_SUCCESS', () => {
    const itemsExample = [{ name: 'test item' }];
    const action = {
      type: ITEMS_SUCCESS,
      items: itemsExample,
    };
    const initial = {
      ...initialState,
      getItems: {
        ...initialState.getItems,
        loading: true,
      },
    };
    const expected = {
      ...initialState,
      getItems: {
        ...initialState.getItems,
        loading: false,
      },
      items: itemsExample,
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ITEM_LOADING', () => {
    const action = {
      type: ITEM_LOADING,
    };
    const initial = {
      ...initialState,
      getItem: {
        loading: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getItem: {
        loading: true,
        error: 'Uh oh',
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ITEM_ERROR', () => {
    const action = {
      type: ITEM_ERROR,
      error: 'test',
    };
    const initial = {
      ...initialState,
      getItem: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getItem: {
        loading: false,
        error: action.error,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ITEM_SUCCESS', () => {
    const itemExample = { name: 'test item' };
    const action = {
      type: ITEM_SUCCESS,
      item: itemExample,
    };
    const initial = {
      ...initialState,
      getItem: {
        ...initialState.getItem,
        loading: true,
      },
    };
    const expected = {
      ...initialState,
      getItem: {
        ...initialState.getItem,
        loading: false,
      },
      item: itemExample,
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ADD_ITEM_TO_LIST', () => {
    const action = {
      type: ADD_ITEM_TO_LIST,
    };
    const initial = {
      ...initialState,
      item: {
        list_number: 2,
      },
    };
    const expected = {
      ...initialState,
      item: {
        list_number: 3,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_ITEM_FROM_LIST', () => {
    const action = {
      type: REMOVE_ITEM_FROM_LIST,
    };
    const initial = {
      ...initialState,
      item: {
        list_number: 2,
      },
    };
    const expected = {
      ...initialState,
      item: {
        list_number: 1,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ADD_STAR_TO_ITEM', () => {
    const action = {
      type: ADD_STAR_TO_ITEM,
      item: { id: 'abcd' },
    };
    const initial = {
      ...initialState,
      item: {
        id: 'abcd',
        starred_number: 2,
      },
    };
    const expected = {
      ...initialState,
      item: {
        id: 'abcd',
        starred_number: 3,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should return state when ADD_STAR_TO_ITEM id mismatches', () => {
    const action = {
      type: ADD_STAR_TO_ITEM,
      item: { id: 'efgh' },
    };
    const initial = {
      ...initialState,
      item: {
        id: 'abcd',
        starred_number: 2,
      },
    };
    expect(items(initial, action)).toEqual(initial);
  });

  it('should handle REMOVE_STAR_FROM_ITEM', () => {
    const action = {
      type: REMOVE_STAR_FROM_ITEM,
      itemId: 'abcd',
    };
    const initial = {
      ...initialState,
      item: {
        id: 'abcd',
        starred_number: 2,
      },
    };
    const expected = {
      ...initialState,
      item: {
        id: 'abcd',
        starred_number: 1,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should return state when REMOVE_STAR_FROM_ITEM id mismatches', () => {
    const action = {
      type: REMOVE_STAR_FROM_ITEM,
      itemId: 'efgh',
    };
    const initial = {
      ...initialState,
      item: {
        id: 'abcd',
        starred_number: 2,
      },
    };
    expect(items(initial, action)).toEqual(initial);
  });

  it('should handle ADD_ITEM_PROCESSING', () => {
    const action = {
      type: ADD_ITEM_PROCESSING,
    };
    const initial = {
      ...initialState,
      addItem: {
        ...initialState.addItem,
        processing: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      addItem: {
        ...initialState.addItem,
        processing: true,
        error: 'Uh oh',
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ADD_ITEM_ERROR', () => {
    const action = {
      type: ADD_ITEM_ERROR,
      error: 'Uh oh',
    };
    const initial = {
      ...initialState,
      addItem: {
        ...initialState.addItem,
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      addItem: {
        ...initialState.addItem,
        processing: false,
        error: action.error,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle ADD_ITEM_SUCCESS', () => {
    const action = {
      type: ADD_ITEM_SUCCESS,
    };
    const initial = {
      ...initialState,
      addItem: {
        processing: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      addItem: {
        processing: false,
        error: null,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_ADD_ITEM_ERROR', () => {
    const action = {
      type: REMOVE_ADD_ITEM_ERROR,
    };
    const initial = {
      ...initialState,
      addItem: {
        ...initialState.addItem,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      addItem: {
        ...initialState.addItem,
        error: null,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_ITEM_PROCESSING', () => {
    const action = {
      type: UPDATE_ITEM_PROCESSING,
    };
    const initial = {
      ...initialState,
      updateItem: {
        ...initialState.updateItem,
        processing: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateItem: {
        ...initialState.updateItem,
        processing: true,
        error: 'Uh oh',
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_ITEM_ERROR', () => {
    const action = {
      type: UPDATE_ITEM_ERROR,
      error: 'Uh oh',
    };
    const initial = {
      ...initialState,
      updateItem: {
        ...initialState.updateItem,
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      updateItem: {
        ...initialState.updateItem,
        processing: false,
        error: action.error,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_ITEM_SUCCESS', () => {
    const action = {
      type: UPDATE_ITEM_SUCCESS,
    };
    const initial = {
      ...initialState,
      updateItem: {
        processing: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateItem: {
        processing: false,
        error: null,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_UPDATE_ITEM_ERROR', () => {
    const action = {
      type: REMOVE_UPDATE_ITEM_ERROR,
    };
    const initial = {
      ...initialState,
      updateItem: {
        ...initialState.updateItem,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateItem: {
        ...initialState.updateItem,
        error: null,
      },
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_ITEM_PROCESSING', () => {
    const initial = {
      ...initialState,
      deleteItem: {
        ...initialState.deleteItem,
        processing: false,
      },
    };
    const expected = {
      ...initialState,
      deleteItem: {
        ...initialState.deleteItem,
        processing: true,
      },
    };
    const action = {
      type: DELETE_ITEM_PROCESSING,
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_ITEM_ERROR', () => {
    const initial = {
      ...initialState,
      deleteItem: {
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      deleteItem: {
        processing: false,
        error: 'Uh oh',
      },
    };
    const action = {
      type: DELETE_ITEM_ERROR,
      error: 'Uh oh',
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_DELETE_ITEM_ERROR', () => {
    const initial = {
      ...initialState,
      deleteItem: {
        ...initialState.deleteItem,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      deleteItem: {
        ...initialState.deleteItem,
        error: null,
      },
    };
    const action = {
      type: REMOVE_DELETE_ITEM_ERROR,
    };
    expect(items(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_ITEM_SUCCESS', () => {
    const initial = {
      ...initialState,
      deleteItem: {
        processing: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      deleteItem: {
        processing: false,
        error: null,
      },
    };
    const action = {
      type: DELETE_ITEM_SUCCESS,
    };
    expect(items(initial, action)).toEqual(expected);
  });
});
