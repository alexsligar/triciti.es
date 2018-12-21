import tags from './tags';
import { 
    TAGS_ERROR,
    TAGS_LOADING,
    TAGS_SUCCESS,
} from '../actions/tags/getTags';
import {
    UPDATE_TAG_PROCESSING,
    UPDATE_TAG_ERROR,
    UPDATE_TAG_SUCCESS,
} from '../actions/tags/updateTag';

describe('tags reducer', () => {
    it('should return the expected initial state', () => {

        const expected = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: false,
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
            updateTag: {
                processing: false,
                error: null,
            },
            tags: [],
        }
        const expected = {
            getTags: {
                loading: true,
                error: null,
            },
            updateTag: {
                processing: false,
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
            updateTag: {
                processing: false,
                error: null,
            },
            tags: [],
        }
        const expected = {
            getTags: {    
                loading: false,
                error: 'Uh oh...',
            },
            updateTag: {
                processing: false,
                error: null,
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
            updateTag: {
                processing: false,
                error: null,
            },
            tags: [],
        }
        const expected = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: false,
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

    it('should handle UPDATE_TAG_PROCESSING', () => {
        const initial = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: false,
                error: 'Uh oh',
            },
            tags: [],
        }
        const expected = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: true,
                error: null,
            },
            tags: [],
        }
        const action = {
            type: UPDATE_TAG_PROCESSING,
        };
        expect(tags(initial, action)).toEqual(expected);
    });

    it('should handle UPDATE_TAG_ERROR', () => {
        const initial = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: true,
                error: null,
            },
            tags: [],
        }
        const expected = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: false,
                error: 'Uh oh',
            },
            tags: [],
        }
        const action = {
            type: UPDATE_TAG_ERROR,
            error: 'Uh oh',
        };
        expect(tags(initial, action)).toEqual(expected);
    });

    it('should handle UPDATE_TAG_SUCCESS', () => {
        const initial = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: true,
                error: 'Uh oh',
            },
            tags: [{ title: 'test' }],
        }
        const expected = {
            getTags: {
                loading: false,
                error: null,
            },
            updateTag: {
                processing: false,
                error: null,
            },
            tags: [{ title: 'newTest' }],
        }
        const action = {
            type: UPDATE_TAG_SUCCESS,
            oldTag: 'test',
            newTag: 'newTest',
        };
        expect(tags(initial, action)).toEqual(expected);
    });

});