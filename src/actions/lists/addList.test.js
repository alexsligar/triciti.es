import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    ADD_LIST_PROCESSING,
    ADD_LIST_ERROR,
    REMOVE_ADD_LIST_ERROR,
    ADD_LIST_SUCCESS,
    handleAddList,
    removeAddListError,
} from './addList';

describe('handleAddList action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch ADD_LIST_PROCESSING', async () => {

        await store.dispatch(handleAddList({ name: 'Test List', description: 'A list I made' }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADD_LIST_PROCESSING });
    });

    it('should dispatch ADD_LIST_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: { name: 'Test List' } }), { status: 200 });
        await store.dispatch(handleAddList({ name: 'Test List', description: 'A list I made' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ADD_LIST_SUCCESS });
    });

    it('should dispatch ADD_LIST_ERROR when fetch responds with 409 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 409 });
        await store.dispatch(handleAddList({ name: 'Test List', description: 'A list I made' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ADD_LIST_ERROR, error: 'You already have a list with that name.', });
    });

    it('should dispatch ADD_LIST_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleAddList({ name: 'Test List', description: 'A list I made' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ADD_LIST_ERROR, 
            error: 'Error adding list.',
        });
    });

    it('should dispatch ADD_LIST_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleAddList({ name: 'Test List', type: 'Activity' }));
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
        })
    })
});