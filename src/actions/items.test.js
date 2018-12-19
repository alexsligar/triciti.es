import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    ITEMS_LOADING,
    ITEMS_SUCCESS,
    ITEMS_ERROR,
    handleTagSearch
} from './items';

describe('handleTagSearch action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch ITEMS_LOADING', async () => {

        await store.dispatch(handleTagSearch('test'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ITEMS_LOADING });
    });

    it('should dispatch ITEMS_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify([{ name: 'Test Item' }]), { status: 200 });
        await store.dispatch(handleTagSearch('test'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ITEMS_SUCCESS });
    });

    it('should dispatch ITEMS_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleTagSearch('test'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ITEMS_ERROR, 
            error: 'Uh oh, something went wrong. Please try again.',
        });
    });

});