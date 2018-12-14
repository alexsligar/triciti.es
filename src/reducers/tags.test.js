import tags from './tags';
import { 
    ADD_TAGS
} from '../actions/tags';

describe('tags reducer', () => {
    it('should return the expected initial state', () => {

        expect(tags(undefined, {})).toEqual([]);
    });

    it('should handle ADD_TAGS', () => {

        const expected = ['Test', 'Tag']
        const action = {
            type: ADD_TAGS,
            tags: expected,
        };
        expect(tags(undefined, action)).toEqual(expected);
    });
});