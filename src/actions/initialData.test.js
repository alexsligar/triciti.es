import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    INITIAL_DATA_LOADING,
    INITIAL_DATA_SUCCESS,
    handleInitialData,
    INITIAL_DATA_ERROR
} from './initialData';
import { ADD_TAGS } from './tags';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleInitialData action creator', () => {

    let store;
    let tags;
    beforeEach(() => {

        tags = ['University', 'Food'];
        store = mockStore();
    });

    it('should dispatch INITIAL_DATA_LOADING', async () => {

        const data = { data: [{'name': 'University'}, {'name': 'Food'}] };
        fetch.mockResponseOnce(JSON.stringify(data), { status: 200 });
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: INITIAL_DATA_LOADING });
    });

    it('should fetch /tags and dispatch ADD_TAGS when response status is 200', async () => {

        const data = { data: [{'name': 'University'}, {'name': 'Food'}] };
        fetch.mockResponseOnce(JSON.stringify(data), { status: 200 });
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        const expected = { type: ADD_TAGS, tags }
        expect(actions[1]).toEqual(expected);

    });

    it('should dispatch INITIAL_DATA_ERROR when response status is not 200', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: INITIAL_DATA_ERROR });
    });

    it('should dispatch INITIAL_DATA_ERROR when fetch fails', async () => {

        fetch.mockRejectOnce();
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: INITIAL_DATA_ERROR });
    });

    it('should dispatch INITIAL_DATA_SUCCESS', async () => {

        const data = { data: [{'name': 'University'}, {'name': 'Food'}] };
        fetch.mockResponseOnce(JSON.stringify(data), { status: 200 });
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        expect(actions[2]).toEqual({ type: INITIAL_DATA_SUCCESS });
    });
});
