import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    USER_LISTS_LOADING,
    USER_LISTS_SUCCESS,
    USER_LISTS_ERROR,
    handleGetUserLists
} from './getUserLists';

describe('handleGetUserLists action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch USER_LISTS_LOADING', async () => {

        await store.dispatch(handleGetUserLists(1));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: USER_LISTS_LOADING });
    });

    it('should dispatch USER_LISTS_SUCCESS when fetch responds with 200 status', async () => {

        const lists = [{ id: '1234', name: 'Test List', description: 'This is a description' }];
        const username = 'testuser';
        fetch.mockResponseOnce(JSON.stringify({ data: lists }), { status: 200 });
        await store.dispatch(handleGetUserLists(username));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: USER_LISTS_SUCCESS, username, lists });
    });

    it('should dispatch USER_LISTS_ERROR when fetch responds with 404 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ message: 'User not found' }), { status: 404 });
        await store.dispatch(handleGetUserLists(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: USER_LISTS_ERROR, error: 'User not found. Please try again.' });
    });

    it('should dispatch USER_LISTS_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleGetUserLists(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: USER_LISTS_ERROR, 
            error: 'Uh oh, something went wrong. Please try again.',
        });
    });

    it('should dispatch USER_LISTS_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce('Fetch failed');
        await store.dispatch(handleGetUserLists(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: USER_LISTS_ERROR, 
            error: 'Uh oh, something went wrong. Please try again.',
        });
    });

});