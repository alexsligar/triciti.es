import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
    ADD_LIST_ITEM_ERROR,
    ADD_LIST_ITEM_SUCCESS,
    handleAddListItem,
} from './addListItem';

describe('handleAddListItem action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch ADD_LIST_ITEM_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
        await store.dispatch(handleAddListItem({ listId: 'abcd', itemId: 'efgh' }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADD_LIST_ITEM_SUCCESS });
    });

    it('should dispatch ADD_LIST_ITEM_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleAddListItem({ listId: 'abcd', itemId: 'efgh' }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ 
            type: ADD_LIST_ITEM_ERROR, 
            error: 'Failed to add item to list. Please try again.',
        });
    });

    it('should dispatch ADD_ITEM_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleAddListItem({ listId: 'abcd', itemId: 'efgh' }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ 
            type: ADD_LIST_ITEM_ERROR, 
            error: 'Failed to add item to list. Please try again.',
        });
    });

});
