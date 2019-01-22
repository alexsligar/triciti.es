import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  TOGGLE_STARRED_ITEM_ERROR,
  TOGGLE_STARRED_ITEM_SUCCESS,
  ADD_STAR_TO_ITEM,
  REMOVE_STAR_FROM_ITEM,
  handleAddStarredItem,
  handleRemoveStarredItem,
} from './toggleStarredItem';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleAddStarredItem action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ authedUser: { user: { id: 'efgh' }, token: 'abc' } });
    fetch.resetMocks();
  });

  it('should dispatch ADD_STAR_TO_ITEM', async () => {
    await store.dispatch(handleAddStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ADD_STAR_TO_ITEM,
      itemId: 'abcd',
      userId: 'efgh',
    });
  });

  it('should dispatch TOGGLE_STARRED_ITEM_SUCCESS when fetch responds with 201 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 201 });
    await store.dispatch(handleAddStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: TOGGLE_STARRED_ITEM_SUCCESS,
    });
  });

  it('should dispatch appropriate actions when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleAddStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: REMOVE_STAR_FROM_ITEM,
      itemId: 'abcd',
      userId: 'efgh',
    });
    expect(actions[2]).toEqual({
      type: TOGGLE_STARRED_ITEM_ERROR,
      error: 'Failed to star item. Please try again.',
    });
  });

  it('should dispatch appropriate actions when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleAddStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: REMOVE_STAR_FROM_ITEM,
      itemId: 'abcd',
      userId: 'efgh',
    });
    expect(actions[2]).toEqual({
      type: TOGGLE_STARRED_ITEM_ERROR,
      error: 'Failed to star item. Please try again.',
    });
  });
});

describe('handleRemoveStarredItem action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ authedUser: { user: { id: 'efgh' }, token: 'abc' } });
    fetch.resetMocks();
  });

  it('should dispatch REMOVE_STAR_FROM_ITEM', async () => {
    await store.dispatch(handleRemoveStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_STAR_FROM_ITEM,
      itemId: 'abcd',
      userId: 'efgh',
    });
  });

  it('should dispatch TOGGLE_STARRED_ITEM_SUCCESS when fetch responds with 204 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 204 });
    await store.dispatch(handleRemoveStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: TOGGLE_STARRED_ITEM_SUCCESS,
    });
  });

  it('should dispatch appropriate actions when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleRemoveStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: ADD_STAR_TO_ITEM,
      itemId: 'abcd',
      userId: 'efgh',
    });
    expect(actions[2]).toEqual({
      type: TOGGLE_STARRED_ITEM_ERROR,
      error: 'Failed to remove star from item. Please try again.',
    });
  });

  it('should dispatch appropriate actions when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleRemoveStarredItem('abcd'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: ADD_STAR_TO_ITEM,
      itemId: 'abcd',
      userId: 'efgh',
    });
    expect(actions[2]).toEqual({
      type: TOGGLE_STARRED_ITEM_ERROR,
      error: 'Failed to remove star from item. Please try again.',
    });
  });
});
