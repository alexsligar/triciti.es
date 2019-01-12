import listItems from './listItems';
import {
  TOGGLE_LIST_ITEM_ERROR,
  TOGGLE_LIST_ITEM_SUCCESS,
} from '../actions/listItems/toggleListItem';

const initialState = {
  toggleListItem: {
    error: null,
  },
};

describe('listItems reducer', () => {
  it('should return the correct initial state', () => {
    expect(listItems(undefined, {})).toEqual(initialState);
  });

  it('should handle TOGGLE_LIST_ITEM_ERROR', () => {
    const action = {
      type: TOGGLE_LIST_ITEM_ERROR,
      error: 'Uh oh',
    };
    const initial = {
      ...initialState,
      toggleListItem: {
        error: null,
      },
    };
    const expected = {
      ...initialState,
      toggleListItem: {
        error: 'Uh oh',
      },
    };
    expect(listItems(initial, action)).toEqual(expected);
  });

  it('should handle TOGGLE_LIST_ITEM_SUCCESS', () => {
    const action = {
      type: TOGGLE_LIST_ITEM_SUCCESS,
    };
    const initial = {
      ...initialState,
      toggleListItem: {
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      toggleListItem: {
        error: null,
      },
    };
    expect(listItems(initial, action)).toEqual(expected);
  });
});
