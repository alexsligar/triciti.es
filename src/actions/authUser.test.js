import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jsonwebtoken, { sign } from 'jsonwebtoken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    AUTH_USER_PROCESSING,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,
    REMOVE_AUTH_USER_ERROR,
    SET_AUTHED_USER,
    REMOVE_AUTHED_USER,
    handleAuthUser,
    removeAuthUserError,
    handleLogoutUser,
} from './authUser';

describe('handleAuthUser action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch AUTH_USER_PROCESSING', async () => {

        fetch.mockResponseOnce(JSON.stringify({ token: 'abc' }), { status: 200 });
        await store.dispatch(handleAuthUser({}));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: AUTH_USER_PROCESSING });
    });

    it('should dispatch SET_AUTHED_USER and AUTH_USER_SUCCESS when auth succeeds', async () => {

        const token = sign({ id: '1a' }, 'abcd');
        fetch.mockResponseOnce(JSON.stringify({ data: { token } }), { status: 200 });
        await store.dispatch(handleAuthUser({}));
        const actions  = store.getActions();
        expect(actions[1]).toEqual({ type: SET_AUTHED_USER, id: '1a' });
        expect(actions[2]).toEqual({ type: AUTH_USER_SUCCESS });
    });

    it('should dispatch AUTH_USER_ERROR with specific message when auth fails due to credentials', async () => {

        fetch.mockResponseOnce(JSON.stringify({ token: 'abc' }), { status: 401 });
        await store.dispatch(handleAuthUser({}));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: AUTH_USER_ERROR, error: 'Invalid username/password' });
    });

    it('should dispatch AUTH_USER_ERROR when auth fails for other reasons', async () => {

        fetch.mockResponseOnce(JSON.stringify({ token: 'test' }), { status: 500 });
        await store.dispatch(handleAuthUser({}));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: AUTH_USER_ERROR, error: 'Uh oh, something went wrong. Please try again.' });
    });
});

describe('handleRemoveAuthUserError action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
    });
    
    it('should dispatch REMOVE_AUTH_USER_ERROR', () => {

        store.dispatch(removeAuthUserError());
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: REMOVE_AUTH_USER_ERROR });
    });
});

describe('handleLogoutUser action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch REMOVE_AUTHED_USER', async () => {

        const spy = jest.spyOn(Storage.prototype, 'removeItem');
        fetch.mockResponseOnce({}, { status: 204 });
        await store.dispatch(handleLogoutUser());
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: REMOVE_AUTHED_USER });
        expect(spy).toHaveBeenCalledWith('authedUser');
    });

    it('should call SET_AUTHED_USER if logout fails on server',async () => {

        jsonwebtoken.decode = jest.fn().mockReturnValueOnce({ id: 1 });
        fetch.mockResponseOnce({}, { status: 401 });
        await store.dispatch(handleLogoutUser());
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: SET_AUTHED_USER, id: 1 })
    });
});