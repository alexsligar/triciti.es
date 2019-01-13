import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  USER_LOADING,
  USER_SUCCESS,
  USER_ERROR,
  handleGetUser,
} from './getUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleGetUser action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
    fetch.resetMocks();
  });

  it('should dispatch USER_LOADING', async () => {
    await store.dispatch(handleGetUser(1));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: USER_LOADING });
  });

  it('should dispatch USER_SUCCESS when fetch responds with 200 status', async () => {
    const user = { username: 'testuser' };
    fetch.mockResponseOnce(JSON.stringify({ data: user }), { status: 200 });
    await store.dispatch(handleGetUser(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: USER_SUCCESS, user });
  });

  it('should dispatch USER_ERROR when fetch responds with 404 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'User not found' }), {
      status: 404,
    });
    await store.dispatch(handleGetUser(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: USER_ERROR,
      error: 'User not found. Please try again.',
    });
  });

  it('should dispatch USER_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleGetUser(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: USER_ERROR,
      error: 'Uh oh, something went wrong. Please try again.',
    });
  });

  it('should dispatch USER_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce('Fetch failed');
    await store.dispatch(handleGetUser(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: USER_ERROR,
      error: 'Uh oh, something went wrong. Please try again.',
    });
  });
});
