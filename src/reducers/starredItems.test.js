import starredItems from './starredItems';
import {
  TOGGLE_STARRED_ITEM_ERROR,
  TOGGLE_STARRED_ITEM_SUCCESS,
} from '../actions/starredItems/toggleStarredItem';

const initialState = {
  toggleStarredItem: {
    error: null,
  },
};

describe('starredItems reducer', () => {
  it('should return the correct initial state', () => {
    expect(starredItems(undefined, {})).toEqual(initialState);
  });

  it('should handle TOGGLE_STARRED_ITEM_ERROR', () => {
    const action = {
      type: TOGGLE_STARRED_ITEM_ERROR,
      error: 'Uh oh',
    };
    const initial = {
      ...initialState,
      toggleStarredItem: {
        error: null,
      },
    };
    const expected = {
      ...initialState,
      toggleStarredItem: {
        error: 'Uh oh',
      },
    };
    expect(starredItems(initial, action)).toEqual(expected);
  });

  it('should handle TOGGLE_STARRED_ITEM_SUCCESS', () => {
    const action = {
      type: TOGGLE_STARRED_ITEM_SUCCESS,
    };
    const initial = {
      ...initialState,
      toggleStarredItem: {
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      toggleStarredItem: {
        error: null,
      },
    };
    expect(starredItems(initial, action)).toEqual(expected);
  });
});
