import configureMockStore from 'redux-mock-store';
import { sign } from 'jsonwebtoken';
import thunk from 'redux-thunk';
import { 
    INITIAL_DATA_LOADING,
    INITIAL_DATA_SUCCESS,
    INITIAL_DATA_ERROR,
    handleInitialData,
} from './initialData';
import { SET_AUTHED_USER } from './authUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handleInitialData action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
    });

    it('should dispatch INITIAL_DATA_LOADING and INITIAL_DATA_SUCCESS with no token', async () => {

        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: INITIAL_DATA_LOADING });
        expect(actions[1]).toEqual({ type: INITIAL_DATA_SUCCESS });
    });

    it('should dispatch SET_AUTHED_USER and INITIAL_DATA_SUCCESS if profile call returns 200', async () => {

        
        const token = sign({ id: 1 }, 'abcd');
        const mock = jest.fn().mockImplementationOnce(() => {
            return token;
        });
        Storage.prototype.getItem = mock;
        const user = { id: 1, username: 'test' };
        fetch.mockResponseOnce(JSON.stringify({ data: user }), { status: 200 });
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: SET_AUTHED_USER, user });
        expect(actions[2]).toEqual({ type: INITIAL_DATA_SUCCESS });
    });

    it('should dispatch INITIAL_DATA_ERROR when response status is not 200', async () => {

        const token = sign({ id: 1 }, 'abcd');
        const mock = jest.fn().mockImplementationOnce(() => {
            return token;
        });
        Storage.prototype.getItem = mock;
        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        const error = 'Uh oh...something went wrong. Please reload.';
        expect(actions[1]).toEqual({ type: INITIAL_DATA_ERROR, error, });
    });

    it('should dispatch INITIAL_DATA_ERROR when fetch fails', async () => {

        const token = sign({ id: 1 }, 'abcd');
        const mock = jest.fn().mockImplementationOnce(() => {
            return token;
        });
        Storage.prototype.getItem = mock;
        fetch.mockRejectOnce();
        await store.dispatch(handleInitialData());
        const actions = store.getActions();
        const error = 'Uh oh...something went wrong. Please reload.';
        expect(actions[1]).toEqual({ type: INITIAL_DATA_ERROR, error, });
    });
});
