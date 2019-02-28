import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  UPDATE_USER_PROCESSING,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  handleUpdateUser,
} from './updateUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleUpdateUser action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ authedUser: { token: 'abc' } });
    fetch.resetMocks();
  });

  it('should dispatch UPDATE_USER_PROCESSING', async () => {
    await store.dispatch(handleUpdateUser({ name: 'Test User' }, 'testuser'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: UPDATE_USER_PROCESSING });
  });

  it('should dispatch UPDATE_USER_SUCCESS when fetch responds with 200 status', async () => {
    const user = { name: 'Test User' };
    const token = 'abcd';
    fetch.mockResponseOnce(JSON.stringify({ data: { user, token } }), {
      status: 200,
    });
    await store.dispatch(handleUpdateUser({ name: 'Test User' }, 'testuser'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: UPDATE_USER_SUCCESS, user, token });
  });

  it('should dispatch UPDATE_USER_ERROR when a 409 status is returned', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Username exists' }), {
      status: 409,
    });
    await store.dispatch(handleUpdateUser({ name: 'Test User' }, 'testuser'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: UPDATE_USER_ERROR,
      error: 'Username exists',
    });
  });

  it('should dispatch UPDATE_USER_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleUpdateUser({ name: 'Test User' }, 'testuser'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: UPDATE_USER_ERROR,
      error: 'Unable to update user',
    });
  });

  it('should dispatch UPDATE_TAG_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleUpdateUser({ name: 'Test User' }, 'testuser'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: UPDATE_USER_ERROR,
      error: 'Unable to update user',
    });
  });
});
