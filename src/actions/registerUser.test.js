import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
    REGISTER_USER_PROCESSING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    handleRegisterUser
} from './registerUser';

describe('handleRegisterUser action creator', () => {

    let store;
    beforeEach(() => {

        store = mockStore();
        fetch.resetMocks();
    });

    it('should dispatch REGISTER_USER_PROCESSING', async () => {

        await store.dispatch(handleRegisterUser({}));
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: REGISTER_USER_PROCESSING });
    });

    it('should dispatch REGISTER_USER_SUCCESS when registration succeeds', async () => {

        fetch.mockResponseOnce(JSON.stringify({ name: 'test' }), { status: 200 });
        await store.dispatch(handleRegisterUser({}));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ type: REGISTER_USER_SUCCESS });
    });

    it('should dispatch REGISTER_USER_ERROR when account taken', async () => {

        const message = 'Username taken. Please try again.';
        fetch.mockResponseOnce(JSON.stringify({ message }), { status: 409 });
        await store.dispatch(handleRegisterUser({}));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: REGISTER_USER_ERROR, 
            error: message,
        });
    });

    it('should dispatch REGISTER_USER_ERROR when any other status code occurs', async () => {

        fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
        await store.dispatch(handleRegisterUser({}));
        const actions = store.getActions();
        expect(actions[1]).toEqual({ 
            type: REGISTER_USER_ERROR, 
            error: 'Uh oh, something went wrong. Please try again.',
        });
    });

});