import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    UPDATE_ITEM_PROCESSING,
    UPDATE_ITEM_ERROR,
    REMOVE_UPDATE_ITEM_ERROR,
    UPDATE_ITEM_SUCCESS,
    handleUpdateItem,
    removeUpdateItemError,
} from './updateItem';

describe('handleUpdateItem action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch UPDATE_ITEM_PROCESSING', async () => {

        await store.dispatch(handleUpdateItem(1, { name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: UPDATE_ITEM_PROCESSING });
    });

    it('should dispatch UPDATE_ITEM_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: { name: 'Test Item' } }), { status: 200 });
        await store.dispatch(handleUpdateItem(1, { name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: UPDATE_ITEM_SUCCESS });
    });

    it('should dispatch UPDATE_ITEM_ERROR when fetch responds with 409 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ message: 'Test Error' }), { status: 409 });
        await store.dispatch(handleUpdateItem(1, { name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: UPDATE_ITEM_ERROR, error: 'Test Error', });
    });

    it('should dispatch UPDATE_ITEM_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleUpdateItem(1, { name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: UPDATE_ITEM_ERROR, 
            error: 'Error updating item.',
        });
    });

    it('should dispatch UPDATE_TAG_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleUpdateItem(1, { name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: UPDATE_ITEM_ERROR, 
            error: 'Error updating item.',
        });
    });

});

describe('removeUpdateItemError action creator', () => {
    
    it('should dispatch REMOVE_UPDATE_ITEM_ERROR', () => {

        const store = mockStore();
        store.dispatch(removeUpdateItemError());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: REMOVE_UPDATE_ITEM_ERROR,
        })
    })
});
