import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  TOGGLE_LIST_ITEM_ERROR,
  TOGGLE_LIST_ITEM_SUCCESS,
  ADD_ITEM_TO_LIST,
  REMOVE_ITEM_FROM_LIST,
  handleAddListItem,
  handleRemoveListItem,
} from './toggleListItem';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleAddListItem action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ authedUser: { token: 'abc' } });
    fetch.resetMocks();
  });

  it('should dispatch ADD_ITEM_TO_LIST', async () => {
    await store.dispatch(handleAddListItem('abcd', 4));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ADD_ITEM_TO_LIST,
      listId: 'abcd',
      itemId: 4,
    });
  });

  it('should dispatch TOGGLE_LIST_ITEM_SUCCESS when fetch responds with 201 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 201 });
    await store.dispatch(handleAddListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: TOGGLE_LIST_ITEM_SUCCESS,
    });
  });

  it('should dispatch REMOVE_ITEM_FROM_LIST when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleAddListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: REMOVE_ITEM_FROM_LIST,
      listId: 'abcd',
      itemId: 'efgh',
    });
  });

  it('should dispatch TOGGLE_LIST_ITEM_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleAddListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[2]).toEqual({
      type: TOGGLE_LIST_ITEM_ERROR,
      error: 'Failed to add item to list. Please try again.',
    });
  });

  it('should dispatch TOGGLE_LIST_ITEM_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleAddListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[2]).toEqual({
      type: TOGGLE_LIST_ITEM_ERROR,
      error: 'Failed to add item to list. Please try again.',
    });
  });
});

describe('handleRemoveListItem action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ authedUser: { token: 'abc' } });
    fetch.resetMocks();
  });

  it('should dispatch REMOVE_ITEM_FROM_LIST', async () => {
    await store.dispatch(handleRemoveListItem('abcd', 4));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_ITEM_FROM_LIST,
      listId: 'abcd',
      itemId: 4,
    });
  });

  it('should dispatch TOGGLE_LIST_ITEM_SUCCESS when fetch responds with 201 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
    await store.dispatch(handleRemoveListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: TOGGLE_LIST_ITEM_SUCCESS,
    });
  });

  it('should dispatch ADD_ITEM_TO_LIST when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleRemoveListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: ADD_ITEM_TO_LIST,
      listId: 'abcd',
      itemId: 'efgh',
    });
  });

  it('should dispatch TOGGLE_LIST_ITEM_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleRemoveListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[2]).toEqual({
      type: TOGGLE_LIST_ITEM_ERROR,
      error: 'Failed to remove item from list. Please try again.',
    });
  });

  it('should dispatch TOGGLE_LIST_ITEM_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleRemoveListItem('abcd', 'efgh'));
    const actions = store.getActions();
    expect(actions[2]).toEqual({
      type: TOGGLE_LIST_ITEM_ERROR,
      error: 'Failed to remove item from list. Please try again.',
    });
  });
});
