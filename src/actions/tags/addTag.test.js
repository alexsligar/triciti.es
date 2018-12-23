import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    ADD_TAG_PROCESSING,
    ADD_TAG_ERROR,
    ADD_TAG_SUCCESS,
    handleAddTag
} from './addTag';

describe('handleAddTag action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch ADD_TAG_PROCESSING', async () => {

        await store.dispatch(handleAddTag('test'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: ADD_TAG_PROCESSING });
    });

    it('should dispatch ADD_TAG_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: { name: 'test' } }), { status: 200 });
        await store.dispatch(handleAddTag('test'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: ADD_TAG_SUCCESS, tag: 'test' });
    });

    it('should dispatch ADD_TAG_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleAddTag('test'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ADD_TAG_ERROR, 
            error: 'Error adding tag.',
        });
    });

    it('should dispatch ADD_TAG_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleAddTag('test'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: ADD_TAG_ERROR, 
            error: 'Error adding tag.',
        });
    });

});