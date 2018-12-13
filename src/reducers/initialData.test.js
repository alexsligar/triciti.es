import initialData from './initialData';
import { 
    INITIAL_DATA_LOADING,
    INITIAL_DATA_SUCCESS,
    INITIAL_DATA_ERROR,
} from '../actions/initialData';

describe('shared reducer', () => {
    it('should return the expected initial state', () => {

        const expected = {
            loading: true,
            error: null,
        };

        expect(initialData(undefined, {})).toEqual(expected);
    });

    it('should handle INITIAL_DATA_LOADING', () => {

        const action = {
            type: INITIAL_DATA_LOADING,
        };
        const initial = {
            loading: false,
            error: null,
        }
        const expected = {
            loading: true,
            error: null,
        }
        expect(initialData(initial, action)).toEqual(expected);
    });

    it('should handle INITIAL_DATA_SUCCESS', () => {

        const action = {
            type: INITIAL_DATA_SUCCESS,
        };
        const initial = {
            loading: true,
            error: null,
        }
        const expected = {
            loading: false,
            error: null,
        }
        expect(initialData(initial, action)).toEqual(expected);
    });

    it('should handle INITIAL_DATA_ERROR', () => {

        const error = 'Uh oh...something went wrong.';
        const action = {
            type: INITIAL_DATA_ERROR,
            error,
        }
        const initial = {
            loading: true,
            error: null,
        }
        const expected = {
            loading: false,
            error,
        }
        expect(initialData(initial, action)).toEqual(expected);
    });

});