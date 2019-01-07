import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    DELETE_LIST_PROCESSING,
    DELETE_LIST_ERROR,
    REMOVE_DELETE_LIST_ERROR,
    DELETE_LIST_SUCCESS,
    handleDeleteList,
    removeDeleteListError,
} from './deleteList';

describe('handleDeleteList action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch DELETE_LIST_PROCESSING', async () => {

        await store.dispatch(handleDeleteList(1));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: DELETE_LIST_PROCESSING });
    });

    it('should dispatch DELETE_LIST_SUCCESS when fetch responds with 204 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 204 });
        await store.dispatch(handleDeleteList(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: DELETE_LIST_SUCCESS });
    });

    it('should dispatch DELETE_LIST_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleDeleteList(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: DELETE_LIST_ERROR, 
            error: 'Error deleting list.',
        });
    });

    it('should dispatch DELETE_LIST_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleDeleteList(1));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: DELETE_LIST_ERROR, 
            error: 'Error deleting list.',
        });
    });

});

describe('removeDeleteListError action creator', () => {
    
    it('should dispatch REMOVE_DELETE_LIST_ERROR', () => {

        const store = mockStore();
        store.dispatch(removeDeleteListError());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: REMOVE_DELETE_LIST_ERROR,
        })
    })
});