import tags from './tags';
import { 
    TAGS_ERROR,
    TAGS_LOADING,
    TAGS_SUCCESS,
} from '../actions/tags';

describe('tags reducer', () => {
    it('should return the expected initial state', () => {

        const expected = {
            loading: false,
            error: null,
            tags: [],
        }
        expect(tags(undefined, {})).toEqual(expected);
    });

    it('should handle TAGS_LOADING', () => {

        const initial = {
            loading: false,
            error: 'Uh oh..',
            tags: [],
        }
        const expected = {
            loading: true,
            error: null,
            tags: [],
        }
        const action = {
            type: TAGS_LOADING,
        };
        expect(tags(initial, action)).toEqual(expected);
    });

    it('should handle TAGS_ERROR', () => {

        const initial = {
            loading: true,
            error: null,
            tags: [],
        }
        const expected = {
            loading: false,
            error: 'Uh oh...',
            tags: [],
        }
        const action = {
            type: TAGS_ERROR,
            error: 'Uh oh...'
        };
        expect(tags(initial, action)).toEqual(expected);
    });

    it('should handle TAGS_SUCCESS', () => {

        const initial = {
            loading: true,
            error: null,
            tags: [],
        }
        const expected = {
            loading: false,
            error: null,
            tags: [{ title: 'test' }],
        }
        const action = {
            type: TAGS_SUCCESS,
            tags: [{ title: 'test' }],
        };
        expect(tags(initial, action)).toEqual(expected);
    });
});