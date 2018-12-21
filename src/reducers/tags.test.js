import tags from './tags';
import { 
    TAGS_ERROR,
    TAGS_LOADING,
    TAGS_SUCCESS,
} from '../actions/tags/getTags';

describe('tags reducer', () => {
    it('should return the expected initial state', () => {

        const expected = {
            getTags: {
                loading: false,
                error: null,
            },
            tags: [],
        }
        expect(tags(undefined, {})).toEqual(expected);
    });

    it('should handle TAGS_LOADING', () => {

        const initial = {
            getTags: {
                loading: false,
                error: 'Uh oh..',
            },
            tags: [],
        }
        const expected = {
            getTags: {
                loading: true,
                error: null,
            },
            tags: [],
        }
        const action = {
            type: TAGS_LOADING,
        };
        expect(tags(initial, action)).toEqual(expected);
    });

    it('should handle TAGS_ERROR', () => {

        const initial = {
            getTags: {
                loading: true,
                error: null,
            },
            tags: [],
        }
        const expected = {
            getTags: {    
                loading: false,
                error: 'Uh oh...',
            },
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
            getTags: {
                loading: true,
                error: null,
            },
            tags: [],
        }
        const expected = {
            getTags: {
                loading: false,
                error: null,
            },
            tags: [{ title: 'test' }],
        }
        const action = {
            type: TAGS_SUCCESS,
            tags: [{ title: 'test' }],
        };
        expect(tags(initial, action)).toEqual(expected);
    });

});