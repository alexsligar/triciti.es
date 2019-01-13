import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  LIST_LOADING,
  LIST_SUCCESS,
  LIST_ERROR,
  handleGetList,
} from './getList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleGetList action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
    fetch.resetMocks();
  });

  it('should dispatch LIST_LOADING', async () => {
    await store.dispatch(handleGetList(1));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LIST_LOADING });
  });

  it('should dispatch LIST_SUCCESS when fetch responds with 200 status', async () => {
    const list = { name: 'Test List' };
    fetch.mockResponseOnce(JSON.stringify({ data: list }), { status: 200 });
    await store.dispatch(handleGetList(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: LIST_SUCCESS, list });
  });

  it('should dispatch LIST_ERROR when fetch responds with 404 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'List not found' }), {
      status: 404,
    });
    await store.dispatch(handleGetList(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: LIST_ERROR,
      error: 'List not found. Please try again.',
    });
  });

  it('should dispatch LIST_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(handleGetList(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: LIST_ERROR,
      error: 'Uh oh, something went wrong. Please try again.',
    });
  });

  it('should dispatch LIST_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce('Fetch failed');
    await store.dispatch(handleGetList(1));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: LIST_ERROR,
      error: 'Uh oh, something went wrong. Please try again.',
    });
  });
});
