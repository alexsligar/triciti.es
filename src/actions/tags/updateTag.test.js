import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    UPDATE_TAG_PROCESSING,
    UPDATE_TAG_ERROR,
    UPDATE_TAG_SUCCESS,
    handleUpdateTag
} from './updateTag';

describe('handleUpdateTag action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch UPDATE_TAG_PROCESSING', async () => {

        await store.dispatch(handleUpdateTag('test', 'newTest'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: UPDATE_TAG_PROCESSING });
    });

    it('should dispatch UPDATE_TAG_SUCCESS when fetch responds with 200 status', async () => {

        fetch.mockResponseOnce(JSON.stringify({ data: { name: 'test' } }), { status: 200 });
        await store.dispatch(handleUpdateTag('test', 'newTest'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: UPDATE_TAG_SUCCESS, oldTag: 'test', newTag: 'newTest' });
    });

    it('should dispatch UPDATE_TAG_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleUpdateTag('test', 'newTest'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: UPDATE_TAG_ERROR, 
            error: 'Error updating tag.',
        });
    });

});