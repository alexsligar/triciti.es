import authUser from './authUser';
import { 
    AUTH_USER_PROCESSING, 
    AUTH_USER_ERROR, 
    AUTH_USER_SUCCESS,
    REMOVE_AUTH_USER_ERROR
} from '../actions/authUser';

describe('authUser reducer', () => {
    it('should return initial state', () => {

        const expected = {
            processing: false,
            error: null,
        }
        expect(authUser(undefined, {})).toEqual(expected);
    });

    it('should handle AUTH_USER_PROCESSING', () => {

        const action = {
            type: AUTH_USER_PROCESSING,
        };
        const expected = {
            processing: true,
            error: null,
        }
        expect(authUser(undefined, action)).toEqual(expected);
    });

    it('should handle AUTH_USER_ERROR', () => {

        const action = {
            type: AUTH_USER_ERROR,
            error: 'test'
        };
        const expected = {
            processing: false,
            error: 'test',
        };
        expect(authUser(undefined, action)).toEqual(expected);
    });

    it('should handle AUTH_USER_SUCCESS', () => {

        const action = {
            type: AUTH_USER_SUCCESS
        };
        const expected = {
            processing: false,
            error: null,
        };
        expect(authUser(undefined, action)).toEqual(expected);
    });

    it('should handle REMOVE_AUTH_USER_ERROR', () => {

        const action = {
            type: REMOVE_AUTH_USER_ERROR,
        };
        const expected = {
            processing: false,
            error: null,
        };
        const initial = {
            processing: false,
            error: 'Invalid'
        };
        expect(authUser(initial, action)).toEqual(expected);
    });

});