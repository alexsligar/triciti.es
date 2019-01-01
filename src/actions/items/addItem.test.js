import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    ADD_ITEM_PROCESSING,
    ADD_ITEM_ERROR,
    REMOVE_ADD_ITEM_ERROR,
    ADD_ITEM_SUCCESS,
    handleAddItem,
    removeAddItemError,
} from './addItem';

describe('handleAddItem action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch ADD_ITEM_PROCESSING', async () => {

        await store.dispatch(handleAddItem({ name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADD_ITEM_PROCESSING });
    });

    it('should dispatch ADD_ITEM_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: { name: 'Test Item' } }), { status: 200 });
        await store.dispatch(handleAddItem({ name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ADD_ITEM_SUCCESS });
    });

    it('should dispatch ADD_ITEM_ERROR when fetch responds with 409 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ message: 'Test Error' }), { status: 409 });
        await store.dispatch(handleAddItem({ name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ADD_ITEM_ERROR, error: 'Test Error', });
    });

    it('should dispatch ADD_ITEM_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleAddItem({ name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ADD_ITEM_ERROR, 
            error: 'Error adding item.',
        });
    });

    it('should dispatch ADD_TAG_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleAddItem({ name: 'Test Item', type: 'Activity' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ADD_ITEM_ERROR, 
            error: 'Error adding item.',
        });
    });

});

describe('removeAddItemError action creator', () => {
    
    it('should dispatch REMOVE_ADD_ITEM_ERROR', () => {

        const store = mockStore();
        store.dispatch(removeAddItemError());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: REMOVE_ADD_ITEM_ERROR,
        })
    })
});