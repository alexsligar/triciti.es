import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    TAGS_LOADING,
    TAGS_SUCCESS,
    TAGS_ERROR,
    handleGetTags
} from './tags';

describe('handleGetTags action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch ITEMS_LOADING', async () => {

        await store.dispatch(handleGetTags());
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: TAGS_LOADING });
    });

    it('should dispatch ITEMS_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: [{ name: 'test' }, { name: 'tag' }] }), { status: 200 });
        await store.dispatch(handleGetTags());
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: TAGS_SUCCESS, tags: [{ title: 'test' }, { title: 'tag' }] });
    });

    it('should dispatch ITEMS_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleGetTags());
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: TAGS_ERROR, 
            error: 'Error loading tags.',
        });
    });

});