import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  USER_STARRED_ITEMS_LOADING,
  USER_STARRED_ITEMS_ERROR,
  USER_STARRED_ITEMS_SUCCESS,
  handleGetUserStarredItems,
} from './getUserStarredItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleGetUserStarredItems action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
    fetch.resetMocks();
  });

  it('should dispatch USER_STARRED_ITEMS_LOADING', async () => {
    await store.dispatch(handleGetUserStarredItems('testuser'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: USER_STARRED_ITEMS_LOADING });
  });

  it('should dispatch USER_STARRED_ITEMS_SUCCESS when fetch responds with 200 status', async () => {
    const items = [{ id: '1234', name: 'Test Item', location: 'Here' }];
    const username = 'testuser';
    fetch.mockResponseOnce(JSON.stringify({ data: items }), { status: 200 });
    await store.dispatch(handleGetUserStarredItems(username));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: USER_STARRED_ITEMS_SUCCESS,
      username,
      items,
    });
  });

  it('should dispatch USER_STARRED_ITEMS_ERROR when fetch responds with 404 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'User not found' }), {
      status: 404,
    });
    await store.dispatch(handleGetUserStarredItems('testuser'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: USER_STARRED_ITEMS_ERROR,
      error: 'User not found. Please try again.',
    });
  });

  it('should dispatch USER_STARRED_ITEMS_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleGetUserStarredItems('testuser'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: USER_STARRED_ITEMS_ERROR,
      error:
        'Uh oh, something went wrong loading your starred items. Please try again.',
    });
  });

  it('should dispatch USER_STARRED_ITEMS_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce('Fetch failed');
    await store.dispatch(handleGetUserStarredItems('testuser'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: USER_STARRED_ITEMS_ERROR,
      error:
        'Uh oh, something went wrong loading your starred items. Please try again.',
    });
  });
});
