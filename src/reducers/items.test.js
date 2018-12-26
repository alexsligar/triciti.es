import items from './items';
import { 
    ITEMS_LOADING, 
    ITEMS_ERROR, 
    ITEMS_SUCCESS
} from '../actions/items';
import { 
    ADD_ITEM_PROCESSING,
    ADD_ITEM_ERROR,
    ADD_ITEM_SUCCESS,
    REMOVE_ADD_ITEM_ERROR,
} from '../actions/items/addItem';

const initialState = {
    getItems: {
        loading: false,
        error: null,
    },
    addItem: {
        processing: false,
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

    it('should handle ADD_ITEM_PROCESSING', () => {

        const action = {
            type: ADD_ITEM_PROCESSING,
        };
        const initial = {
            ...initialState,
            addItem: {
                ...initialState.addItem,
                processing: false,
                error: 'Uh oh',
            }
        };
        const expected = {
            ...initialState,
            addItem: {
                ...initialState.addItem,
                processing: true,
                error: 'Uh oh',
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle ADD_ITEM_ERROR', () => {

        const action = {
            type: ADD_ITEM_ERROR,
            error: 'Uh oh',
        };
        const initial = {
            ...initialState,
            addItem: {
                ...initialState.addItem,
                processing: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            addItem: {
                ...initialState.addItem,
                processing: false,
                error: action.error,
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle ADD_ITEM_SUCCESS', () => {

        const action = {
            type: ADD_ITEM_SUCCESS,
            item: { name: 'Test Item' },
        };
        const initial = {
            ...initialState,
            addItem: {
                processing: true,
                error: 'Uh oh',
            },
            items: [{ name: 'First Test' }],
        };
        const expected = {
            ...initialState,
            addItem: {
                processing: false,
                error: null,
            },
            items: initial.items.concat([action.item]),
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle REMOVE_ADD_ITEM_ERROR', () => {

        const action = {
            type: REMOVE_ADD_ITEM_ERROR,
        };
        const initial = {
            ...initialState,
            addItem: {
                ...initialState.addItem,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            addItem: {
                ...initialState.addItem,
                error: null,
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

});