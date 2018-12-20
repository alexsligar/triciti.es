import authedUser from './authedUser';
import {
    SET_AUTHED_USER,
    REMOVE_AUTHED_USER,
} from '../actions/authUser';

describe('authedUser reducer', () => {
    it('should return null for the initial state', () => {

        expect(authedUser(undefined, {})).toBe(null);
    });

    it('should handle SET_AUTHED_USER', () => {

        const action = {
            type: SET_AUTHED_USER,
            user: {
                id: 1,
                name: 'test'
            },
        };
        expect(authedUser(undefined, action)).toEqual(action.user);
    });

    it('should handle LOGOUT_AUTHED_USER', () => {

        const action = {
            type: REMOVE_AUTHED_USER,
        };
        expect(authedUser(undefined, action)).toEqual(null);
    });

});