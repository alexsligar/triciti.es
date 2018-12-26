import items from './items';
import { 
    ITEMS_LOADING, 
    ITEMS_ERROR, 
    ITEMS_SUCCESS
} from '../actions/items';

const initialState = {
    getItems: {
        loading: false,
        error: null,
    },
    items: [],
};

describe('items reducer', () => {
    it('should return the correct initial state', () => {

        expect(items(undefined, {})).toEqual(initialState);
    });

    it('should handle ITEMS_LOADING', () => {

        const action = {
            type: ITEMS_LOADING,
        };
        const initial = {
            ...initialState,
            getItems: {
                loading: false,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            getItems: {
                loading: true,
                error: 'Uh oh',
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle ITEMS_ERROR', () => {

        const action = {
            type: ITEMS_ERROR,
            error: 'test'
        };
        const initial = {
            ...initialState,
            getItems: {
                loading: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            getItems: {
                loading: false,
                error: action.error,
            },
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
            ...initialState,
            getItems: {
                ...initialState.getItems,
                loading: true,
            },
        };
        const expected = {
            ...initialState,
            getItems: {
                ...initialState.getItems,
                loading: false,
            },
            items: itemsExample,
        };
        expect(items(initial, action)).toEqual(expected);
    });

});