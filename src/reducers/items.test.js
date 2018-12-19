import items from './items';
import { 
    ITEMS_LOADING, 
    ITEMS_ERROR, 
    ITEMS_SUCCESS
} from '../actions/items';

describe('items reducer', () => {
    it('should return the correct initial state', () => {

        const expected = {
            loading: false,
            error: null,
            items: [],
        }

        expect(items(undefined, {})).toEqual(expected);
    });

    it('should handle ITEMS_LOADING', () => {

        const action = {
            type: ITEMS_LOADING,
        };
        const initial = {
            loading: false,
            error: null,
            items: [],
        }
        const expected = {
            loading: true,
            error: null,
            items: [],
        }
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle ITEMS_ERROR', () => {

        const action = {
            type: ITEMS_ERROR,
            error: 'test'
        };
        const initial = {
            loading: true,
            error: null,
            items: [],
        };
        const expected = {
            loading: false,
            error: 'test',
            items: [],
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle ITEMS_SUCCESS', () => {

        const itemsExample = [{ name: 'test item' }];
        const action = {
            type: ITEMS_SUCCESS,
            items: itemsExample,
        };
        const initial = {
            loading: true,
            error: 'test',
            items: [],
        }
        const expected = {
            loading: false,
            error: null,
            items: itemsExample,
        };
        expect(items(initial, action)).toEqual(expected);
    });

});