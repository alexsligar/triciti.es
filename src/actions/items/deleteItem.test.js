import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    DELETE_ITEM_PROCESSING,
    DELETE_ITEM_ERROR,
    REMOVE_DELETE_ITEM_ERROR,
    DELETE_ITEM_SUCCESS,
    handleDeleteItem,
    removeDeleteItemError,
} from './deleteItem';

describe('handleDeleteItem action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch DELETE_ITEM_PROCESSING', async () => {

        await store.dispatch(handleDeleteItem(1));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: DELETE_ITEM_PROCESSING });
    });

    it('should dispatch DELETE_ITEM_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
        await store.dispatch(handleDeleteItem(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: DELETE_ITEM_SUCCESS });
    });

    it('should dispatch DELETE_ITEM_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleDeleteItem(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: DELETE_ITEM_ERROR, 
            error: 'Error deleting item.',
        });
    });

    it('should dispatch DELETE_ITEM_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleDeleteItem(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: DELETE_ITEM_ERROR, 
            error: 'Error deleting item.',
        });
    });

});

describe('removeDeleteItemError action creator', () => {
    
    it('should dispatch REMOVE_DELETE_ITEM_ERROR', () => {

        const store = mockStore();
        store.dispatch(removeDeleteItemError());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: REMOVE_DELETE_ITEM_ERROR,
        })
    })
});