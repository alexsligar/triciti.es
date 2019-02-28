import users from './users';
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
  ADD_ITEM_TO_LIST,
  REMOVE_ITEM_FROM_LIST,
} from '../actions/listItems/toggleListItem';
import {
  USER_STARRED_ITEMS_LOADING,
  USER_STARRED_ITEMS_ERROR,
  USER_STARRED_ITEMS_SUCCESS,
} from '../actions/users/getUserStarredItems';
import {
  ADD_STAR_TO_ITEM,
  REMOVE_STAR_FROM_ITEM,
} from '../actions/starredItems/toggleStarredItem';
import {
  UPDATE_USER_PROCESSING,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from '../actions/users/updateUser';

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
  updateUser: {
    processing: false,
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

describe('users reducer', () => {
  it('should return the correct initial state', () => {
    expect(users(undefined, {})).toEqual(initialState);
  });

  it('should handle USER_LOADING', () => {
    const action = {
      type: USER_LOADING,
    };
    const initial = {
      ...initialState,
      getUser: {
        loading: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getUser: {
        loading: true,
        error: 'Uh oh',
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_ERROR', () => {
    const action = {
      type: USER_ERROR,
      error: 'test',
    };
    const initial = {
      ...initialState,
      getUser: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getUser: {
        loading: false,
        error: action.error,
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_SUCCESS', () => {
    const userExample = { username: 'testuser' };
    const action = {
      type: USER_SUCCESS,
      user: userExample,
    };
    const initial = {
      ...initialState,
      getUser: {
        ...initialState.getUser,
        loading: true,
      },
    };
    const expected = {
      ...initialState,
      getUser: {
        ...initialState.getUser,
        loading: false,
      },
      user: userExample,
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_LISTS_LOADING', () => {
    const action = {
      type: USER_LISTS_LOADING,
    };
    const initial = {
      ...initialState,
      getUserLists: {
        loading: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getUserLists: {
        loading: true,
        error: 'Uh oh',
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_LISTS_ERROR', () => {
    const action = {
      type: USER_LISTS_ERROR,
      error: 'test',
    };
    const initial = {
      ...initialState,
      getUserLists: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getUserLists: {
        loading: false,
        error: action.error,
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_LISTS_SUCCESS', () => {
    const username = 'testuser';
    const lists = [
      { id: 'abcd', name: 'Test List', description: 'This is a description' },
    ];
    const action = {
      type: USER_LISTS_SUCCESS,
      username,
      lists,
    };
    const initial = {
      ...initialState,
      getUserLists: {
        ...initialState.getUserLists,
        loading: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getUserLists: {
        ...initialState.getUserLists,
        loading: false,
        error: null,
      },
      userLists: {
        username,
        lists,
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle ADD_ITEM_TO_LIST', () => {
    const action = {
      type: ADD_ITEM_TO_LIST,
      listId: 'abcd',
      itemId: 4,
    };
    const initial = {
      ...initialState,
      userLists: {
        username: 'testuser',
        lists: [
          { id: 'abcd', name: 'Test List', items: [1, 2, 6, 8] },
          { id: 'efgh', name: 'Another List', items: [2] },
        ],
      },
    };
    const expected = {
      ...initialState,
      userLists: {
        username: 'testuser',
        lists: [
          { id: 'abcd', name: 'Test List', items: [1, 2, 6, 8, 4] },
          { id: 'efgh', name: 'Another List', items: [2] },
        ],
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_ITEM_FROM_LIST', () => {
    const action = {
      type: REMOVE_ITEM_FROM_LIST,
      listId: 'abcd',
      itemId: 6,
    };
    const initial = {
      ...initialState,
      userLists: {
        username: 'testuser',
        lists: [
          { id: 'abcd', name: 'Test List', items: [1, 2, 6, 8] },
          { id: 'efgh', name: 'Another List', items: [2] },
        ],
      },
    };
    const expected = {
      ...initialState,
      userLists: {
        username: 'testuser',
        lists: [
          { id: 'abcd', name: 'Test List', items: [1, 2, 8] },
          { id: 'efgh', name: 'Another List', items: [2] },
        ],
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_STARRED_ITEMS_LOADING', () => {
    const action = {
      type: USER_STARRED_ITEMS_LOADING,
    };
    const initial = {
      ...initialState,
      getUserStarredItems: {
        loading: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getUserStarredItems: {
        loading: true,
        error: 'Uh oh',
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_STARRED_ITEMS_ERROR', () => {
    const action = {
      type: USER_STARRED_ITEMS_ERROR,
      error: 'test',
    };
    const initial = {
      ...initialState,
      getUserStarredItems: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getUserStarredItems: {
        loading: false,
        error: action.error,
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle USER_STARRED_ITEMS_SUCCESS', () => {
    const username = 'testuser';
    const items = [{ id: 'abcd', name: 'Test Item', location: 'Somewhere' }];
    const action = {
      type: USER_STARRED_ITEMS_SUCCESS,
      username,
      items,
    };
    const initial = {
      ...initialState,
      getUserStarredItems: {
        ...initialState.getUserStarredItems,
        loading: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      getUserStarredItems: {
        ...initialState.getUserStarredItems,
        loading: false,
        error: null,
      },
      userStarredItems: {
        username,
        items,
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle ADD_STAR_TO_ITEM', () => {
    const action = {
      type: ADD_STAR_TO_ITEM,
      item: { id: 'hijk', name: 'Test Item' },
      username: 'testuser',
    };
    const initial = {
      ...initialState,
      userStarredItems: {
        username: 'testuser',
        items: [
          { id: 'abcd', name: 'Test List' },
          { id: 'efgh', name: 'Another List' },
        ],
      },
    };
    const expected = {
      ...initialState,
      userStarredItems: {
        username: 'testuser',
        items: [
          { id: 'abcd', name: 'Test List' },
          { id: 'efgh', name: 'Another List' },
          { id: 'hijk', name: 'Test Item' },
        ],
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should return state ADD_STAR_TO_ITEM username mismatches', () => {
    const action = {
      type: ADD_STAR_TO_ITEM,
      item: { id: 'hijk', name: 'Test Item' },
      username: 'otheruser',
    };
    const initial = {
      ...initialState,
      userStarredItems: {
        username: 'testuser',
        items: [
          { id: 'abcd', name: 'Test List' },
          { id: 'efgh', name: 'Another List' },
        ],
      },
    };
    expect(users(initial, action)).toEqual(initial);
  });

  it('should handle REMOVE_STAR_FROM_ITEM', () => {
    const action = {
      type: REMOVE_STAR_FROM_ITEM,
      username: 'testuser',
      itemId: 'abcd',
    };
    const initial = {
      ...initialState,
      userStarredItems: {
        username: 'testuser',
        items: [
          { id: 'abcd', name: 'Test List' },
          { id: 'efgh', name: 'Another List' },
        ],
      },
    };
    const expected = {
      ...initialState,
      userStarredItems: {
        username: 'testuser',
        items: [{ id: 'efgh', name: 'Another List' }],
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should return state when REMOVE_STAR_FROM_ITEM username mismatches', () => {
    const action = {
      type: REMOVE_STAR_FROM_ITEM,
      username: 'otheruser',
      itemId: 'abcd',
    };
    const initial = {
      ...initialState,
      userStarredItems: {
        username: 'testuser',
        items: [
          { id: 'abcd', name: 'Test List' },
          { id: 'efgh', name: 'Another List' },
        ],
      },
    };
    expect(users(initial, action)).toEqual(initial);
  });

  it('should handle UPDATE_USER_PROCESSING', () => {
    const action = {
      type: UPDATE_USER_PROCESSING,
    };
    const initial = {
      ...initialState,
      updateUser: {
        ...initialState.updateUser,
        processing: false,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateUser: {
        ...initialState.updateUser,
        processing: true,
        error: 'Uh oh',
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_USER_ERROR', () => {
    const action = {
      type: UPDATE_USER_ERROR,
      error: 'Uh oh',
    };
    const initial = {
      ...initialState,
      updateUser: {
        ...initialState.updateUser,
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      updateUser: {
        ...initialState.updateUser,
        processing: false,
        error: action.error,
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const action = {
      type: UPDATE_USER_SUCCESS,
    };
    const initial = {
      ...initialState,
      updateUser: {
        processing: true,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateUser: {
        processing: false,
        error: null,
      },
    };
    expect(users(initial, action)).toEqual(expected);
  });
});
