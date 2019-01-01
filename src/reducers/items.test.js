import items from './items';
import { 
    ITEMS_LOADING, 
    ITEMS_ERROR, 
    ITEMS_SUCCESS
} from '../actions/items/getItems';
import { 
    ITEM_LOADING, 
    ITEM_ERROR, 
    ITEM_SUCCESS
} from '../actions/items/getItem';
import { 
    ADD_ITEM_PROCESSING,
    ADD_ITEM_ERROR,
    ADD_ITEM_SUCCESS,
    REMOVE_ADD_ITEM_ERROR,
} from '../actions/items/addItem';
import { 
    UPDATE_ITEM_PROCESSING,
    UPDATE_ITEM_ERROR,
    UPDATE_ITEM_SUCCESS,
    REMOVE_UPDATE_ITEM_ERROR,
} from '../actions/items/updateItem';

const initialState = {
    getItem: {
        loading: true,
        error: null,
    },
    getItems: {
        loading: false,
        error: null,
    },
    addItem: {
        processing: false,
        error: null,
    },
    updateItem: {
        processing: false,
        error: null,
    },
    item: {},
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

    it('should handle ITEM_LOADING', () => {

        const action = {
            type: ITEM_LOADING,
        };
        const initial = {
            ...initialState,
            getItem: {
                loading: false,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            getItem: {
                loading: true,
                error: 'Uh oh',
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle ITEM_ERROR', () => {

        const action = {
            type: ITEM_ERROR,
            error: 'test'
        };
        const initial = {
            ...initialState,
            getItem: {
                loading: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            getItem: {
                loading: false,
                error: action.error,
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle ITEM_SUCCESS', () => {

        const itemExample = { name: 'test item' };
        const action = {
            type: ITEM_SUCCESS,
            item: itemExample,
        };
        const initial = {
            ...initialState,
            getItem: {
                ...initialState.getItems,
                loading: true,
            },
        };
        const expected = {
            ...initialState,
            getItem: {
                ...initialState.getItems,
                loading: false,
            },
            item: itemExample,
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
        };
        const initial = {
            ...initialState,
            addItem: {
                processing: true,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            addItem: {
                processing: false,
                error: null,
            },
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

    it('should handle UPDATE_ITEM_PROCESSING', () => {

        const action = {
            type: UPDATE_ITEM_PROCESSING,
        };
        const initial = {
            ...initialState,
            updateItem: {
                ...initialState.updateItem,
                processing: false,
                error: 'Uh oh',
            }
        };
        const expected = {
            ...initialState,
            updateItem: {
                ...initialState.updateItem,
                processing: true,
                error: 'Uh oh',
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle UPDATE_ITEM_ERROR', () => {

        const action = {
            type: UPDATE_ITEM_ERROR,
            error: 'Uh oh',
        };
        const initial = {
            ...initialState,
            updateItem: {
                ...initialState.updateItem,
                processing: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            updateItem: {
                ...initialState.updateItem,
                processing: false,
                error: action.error,
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle UPDATE_ITEM_SUCCESS', () => {

        const action = {
            type: UPDATE_ITEM_SUCCESS,
        };
        const initial = {
            ...initialState,
            updateItem: {
                processing: true,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            updateItem: {
                processing: false,
                error: null,
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

    it('should handle REMOVE_UPDATE_ITEM_ERROR', () => {

        const action = {
            type: REMOVE_UPDATE_ITEM_ERROR,
        };
        const initial = {
            ...initialState,
            updateItem: {
                ...initialState.updateItem,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            updateItem: {
                ...initialState.updateItem,
                error: null,
            },
        };
        expect(items(initial, action)).toEqual(expected);
    });

});