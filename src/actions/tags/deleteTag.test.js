import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  DELETE_TAG_PROCESSING,
  DELETE_TAG_ERROR,
  REMOVE_DELETE_TAG_ERROR,
  DELETE_TAG_SUCCESS,
  handleDeleteTag,
  removeDeleteTagError,
} from './deleteTag';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleDeleteTag action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ authedUser: { token: 'abc' } });
    fetch.resetMocks();
  });

  it('should dispatch DELETE_TAG_PROCESSING', async () => {
    await store.dispatch(handleDeleteTag('test'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: DELETE_TAG_PROCESSING });
  });

  it('should dispatch DELETE_TAG_SUCCESS when fetch responds with 204 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 204 });
    await store.dispatch(handleDeleteTag('test'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: DELETE_TAG_SUCCESS, tag: 'test' });
  });

  it('should dispatch DELETE_TAG_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleDeleteTag('test'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: DELETE_TAG_ERROR,
      error: 'Error deleting tag.',
    });
  });

  it('should dispatch DELETE_TAG_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(handleDeleteTag('test'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: DELETE_TAG_ERROR,
      error: 'Error deleting tag.',
    });
  });
});

describe('removeDeleteTagError action creator', () => {
  it('should dispatch REMOVE_DELETE_TAG_ERROR', () => {
    const store = mockStore();
    store.dispatch(removeDeleteTagError());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_DELETE_TAG_ERROR,
    });
  });
});
