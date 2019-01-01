import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    ITEM_LOADING,
    ITEM_SUCCESS,
    ITEM_ERROR,
    handleGetItem
} from './getItem';

describe('handleGetItem action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch ITEM_LOADING', async () => {

        await store.dispatch(handleGetItem(1));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ITEM_LOADING });
    });

    it('should dispatch ITEM_SUCCESS when fetch responds with 200 status', async () => {

        const item = { name: 'Test Item' };
        fetch.mockResponseOnce(JSON.stringify({ data: item }), { status: 200 });
        await store.dispatch(handleGetItem(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ITEM_SUCCESS, item });
    });

    it('should dispatch ITEM_ERROR when fetch responds with 404 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ message: 'Item not found' }), { status: 404 });
        await store.dispatch(handleGetItem(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ITEM_ERROR, error: 'Item not found. Please try again.' });
    });

    it('should dispatch ITEM_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleGetItem(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ITEM_ERROR, 
            error: 'Uh oh, something went wrong. Please try again.',
        });
    });

    it('should dispatch ITEM_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce('Fetch failed');
        await store.dispatch(handleGetItem(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ITEM_ERROR, 
            error: 'Uh oh, something went wrong. Please try again.',
        });
    });

});