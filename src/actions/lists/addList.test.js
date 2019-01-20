import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  ADD_LIST_PROCESSING,
  ADD_LIST_ERROR,
  REMOVE_ADD_LIST_ERROR,
  ADD_LIST_SUCCESS,
  SHOW_NEW_LIST_MODAL,
  CLOSE_NEW_LIST_MODAL,
  handleAddList,
  removeAddListError,
  showNewListModal,
  closeNewListModal,
} from './addList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleAddList action creator', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ authedUser: { token: 'abc' } });
    fetch.resetMocks();
  });

  it('should dispatch ADD_LIST_PROCESSING', async () => {
    await store.dispatch(
      handleAddList({ name: 'Test List', description: 'A list I made' })
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: ADD_LIST_PROCESSING });
  });

  it('should dispatch ADD_LIST_SUCCESS when fetch responds with 201 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { name: 'Test List' } }), {
      status: 201,
    });
    await store.dispatch(
      handleAddList({ name: 'Test List', description: 'A list I made' })
    );
    const actions = store.getActions();
    expect(actions[1]).toEqual({ type: ADD_LIST_SUCCESS });
  });

  it('should dispatch ADD_LIST_ERROR when fetch responds with 409 status', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 409 });
    await store.dispatch(
      handleAddList({ name: 'Test List', description: 'A list I made' })
    );
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: ADD_LIST_ERROR,
      error: 'You already have a list with that name.',
    });
  });

  it('should dispatch ADD_LIST_ERROR when any other status code occurs', async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
    await store.dispatch(
      handleAddList({ name: 'Test List', description: 'A list I made' })
    );
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: ADD_LIST_ERROR,
      error: 'Error adding list.',
    });
  });

  it('should dispatch ADD_LIST_ERROR when fetch fails', async () => {
    fetch.mockRejectOnce();
    await store.dispatch(
      handleAddList({ name: 'Test List', type: 'Activity' })
    );
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: ADD_LIST_ERROR,
      error: 'Error adding list.',
    });
  });
});

describe('removeAddListError action creator', () => {
  it('should dispatch REMOVE_ADD_LIST_ERROR', () => {
    const store = mockStore();
    store.dispatch(removeAddListError());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_ADD_LIST_ERROR,
    });
  });
});

describe('showNewListModal action creator', () => {
  it('should dispatch SHOW_NEW_LIST_MODAL', () => {
    const store = mockStore();
    store.dispatch(showNewListModal());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: SHOW_NEW_LIST_MODAL,
    });
  });
});

describe('closeNewListModal action creator', () => {
  it('should dispatch CLOSE_NEW_LIST_MODAL', () => {
    const store = mockStore();
    store.dispatch(closeNewListModal());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: CLOSE_NEW_LIST_MODAL,
    });
  });
});
