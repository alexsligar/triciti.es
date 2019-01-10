import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    UPDATE_LIST_PROCESSING,
    UPDATE_LIST_ERROR,
    REMOVE_UPDATE_LIST_ERROR,
    UPDATE_LIST_SUCCESS,
    handleUpdateList,
    removeUpdateListError,
} from './updateList';
import {
    LIST_LOADING,
} from './getList';

describe('handleUpdateList action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch UPDATE_LIST_PROCESSING', async () => {

        await store.dispatch(handleUpdateList(1, { name: 'Test List', description: 'This is a description' }));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: UPDATE_LIST_PROCESSING });
    });

    it('should dispatch UPDATE_LIST_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: { name: 'Test List' } }), { status: 200 });
        await store.dispatch(handleUpdateList(1, { name: 'Test List', description: 'This is a description' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: UPDATE_LIST_SUCCESS });
    });

    it('should dispatch LIST_LOADING when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: { id: 'abcd', name: 'Test List' } }), { status: 200 });
        await store.dispatch(handleUpdateList('abcd', { name: 'Test List', description: 'This is a description' }));
        const actions = store.getActions();
        expect(actions[2]).toEqual({ type: LIST_LOADING });
    });

    it('should dispatch UPDATE_LIST_ERROR when fetch responds with 409 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ message: 'Test Error' }), { status: 409 });
        await store.dispatch(handleUpdateList(1, { name: 'Test List', description: 'This is a description' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: UPDATE_LIST_ERROR, error: 'Test Error', });
    });

    it('should dispatch UPDATE_LIST_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleUpdateList(1, { name: 'Test List', description: 'This is a description' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: UPDATE_LIST_ERROR, 
            error: 'Error updating list.',
        });
    });

    it('should dispatch UPDATE_TAG_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleUpdateList(1, { name: 'Test List', description: 'This is a description' }));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: UPDATE_LIST_ERROR, 
            error: 'Error updating list.',
        });
    });

});

describe('removeUpdateListError action creator', () => {
    
    it('should dispatch REMOVE_UPDATE_LIST_ERROR', () => {

        const store = mockStore();
        store.dispatch(removeUpdateListError());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: REMOVE_UPDATE_LIST_ERROR,
        })
    })
});
