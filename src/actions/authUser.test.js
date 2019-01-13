import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { sign } from 'jsonwebtoken';
import {
  AUTH_USER_PROCESSING,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  REMOVE_AUTH_USER_ERROR,
  SET_AUTHED_USER,
  REMOVE_AUTHED_USER,
  handleAuthUser,
  removeAuthUserError,
  handleLogoutUser,
  handleAuthedUser,
} from './authUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleAuthUser action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
    fetch.resetMocks();
  });

  it('should dispatch AUTH_USER_PROCESSING', async () => {
    await store.dispatch(handleAuthUser({}));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: AUTH_USER_PROCESSING });
  });

  it('should dispatch expected actions and save token when auth succeeds', async () => {
    const token = sign({ id: '1a' }, 'abcd');
    const user = { id: 1, username: 'test' };
    fetch.mockResponses(
      [JSON.stringify({ data: { token } }), { status: 200 }],
      [JSON.stringify({ data: user }), { status: 200 }]
    );
    const mock = jest.fn();
    Storage.prototype.setItem = mock;
    await store.dispatch(handleAuthUser({}));
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: SET_AUTHED_USER, user });
    expect(actions[2]).toEqual({ type: AUTH_USER_SUCCESS });
    expect(mock.mock.calls[0][0]).toBe('authedUser');
    expect(mock.mock.calls[0][1]).toEqual(token);
  });

  it('should dispatch AUTH_USER_ERROR with specific message when auth fails due to credentials', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'abc' }), { status: 401 });
    await store.dispatch(handleAuthUser({}));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: AUTH_USER_ERROR,
      error: 'Invalid username/password',
    });
  });

  it('should dispatch AUTH_USER_ERROR when auth fails for other reasons', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'test' }), { status: 500 });
    await store.dispatch(handleAuthUser({}));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: AUTH_USER_ERROR,
      error: 'Uh oh, something went wrong. Please try again.',
    });
  });
});

describe('handleAuthedUser action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch authUserError when get profile doesnt return 200', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
    await store.dispatch(handleAuthedUser());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: AUTH_USER_ERROR,
      error: 'Uh oh...something went wrong. Please try again.',
    });
  });

  it('should dispatch authUserError when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleAuthedUser());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: AUTH_USER_ERROR,
      error: 'Uh oh...something went wrong. Please try again.',
    });
  });
});

describe('handleRemoveAuthUserError action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch REMOVE_AUTH_USER_ERROR', () => {
    store.dispatch(removeAuthUserError());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: REMOVE_AUTH_USER_ERROR });
  });
});

describe('handleLogoutUser action creator', () => {
  const user = { id: 1, username: 'test' };
  let store;
  beforeEach(async () => {
    store = mockStore({ authedUser: user });
    fetch.resetMocks();
  });

  it('should dispatch REMOVE_AUTHED_USER', async () => {
    const spy = jest.spyOn(Storage.prototype, 'removeItem');
    fetch.mockResponseOnce({}, { status: 204 });
    await store.dispatch(handleLogoutUser());
    expect(spy).toHaveBeenCalledWith('authedUser');
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: REMOVE_AUTHED_USER });
  });

  it('should call SET_AUTHED_USER if logout fails on server', async () => {
    fetch.mockResponseOnce({}, { status: 401 });
    await store.dispatch(handleLogoutUser());
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: SET_AUTHED_USER, user });
  });
});
