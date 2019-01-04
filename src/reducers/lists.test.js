import lists from './lists';
import {
    LIST_LOADING,
    LIST_ERROR,
    LIST_SUCCESS
} from '../actions/lists/getList';
import { 
    ADD_LIST_PROCESSING,
    ADD_LIST_ERROR,
    ADD_LIST_SUCCESS,
    REMOVE_ADD_LIST_ERROR,
} from '../actions/lists/addList';

const initialState = {
    addList: {
        processing: false,
        error: null,
    },
    getList: {
        loading: false,
        error: null,
    },
    item: {},
};

describe('lists reducer', () => {
    it('should return the correct initial state', () => {

        expect(lists(undefined, {})).toEqual(initialState);
    });

    it('should handle LIST_LOADING', () => {

        const action = {
            type: LIST_LOADING,
        };
        const initial = {
            ...initialState,
            getList: {
                loading: false,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            getList: {
                loading: true,
                error: 'Uh oh',
            },
        };
        expect(lists(initial, action)).toEqual(expected);
    });

    it('should handle LIST_ERROR', () => {

        const action = {
            type: LIST_ERROR,
            error: 'test'
        };
        const initial = {
            ...initialState,
            getList: {
                loading: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            getList: {
                loading: false,
                error: action.error,
            },
        };
        expect(lists(initial, action)).toEqual(expected);
    });

    it('should handle LIST_SUCCESS', () => {

        const itemExample = { name: 'test item' };
        const action = {
            type: LIST_SUCCESS,
            item: itemExample,
        };
        const initial = {
            ...initialState,
            getList: {
                ...initialState.getList,
                loading: true,
            },
        };
        const expected = {
            ...initialState,
            getList: {
                ...initialState.getList,
                loading: false,
            },
            item: itemExample,
        };
        expect(lists(initial, action)).toEqual(expected);
    });

    it('should handle ADD_LIST_PROCESSING', () => {

        const action = {
            type: ADD_LIST_PROCESSING,
        };
        const initial = {
            ...initialState,
            addList: {
                ...initialState.addList,
                processing: false,
                error: 'Uh oh',
            }
        };
        const expected = {
            ...initialState,
            addList: {
                ...initialState.addList,
                processing: true,
                error: 'Uh oh',
            },
        };
        expect(lists(initial, action)).toEqual(expected);
    });

    it('should handle ADD_LIST_ERROR', () => {

        const action = {
            type: ADD_LIST_ERROR,
            error: 'Uh oh',
        };
        const initial = {
            ...initialState,
            addList: {
                ...initialState.addList,
                processing: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            addList: {
                ...initialState.addList,
                processing: false,
                error: action.error,
            },
        };
        expect(lists(initial, action)).toEqual(expected);
    });

    it('should handle ADD_LIST_SUCCESS', () => {

        const action = {
            type: ADD_LIST_SUCCESS,
        };
        const initial = {
            ...initialState,
            addList: {
                processing: true,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            addList: {
                processing: false,
                error: null,
            },
        };
        expect(lists(initial, action)).toEqual(expected);
    });

    it('should handle REMOVE_ADD_LIST_ERROR', () => {

        const action = {
            type: REMOVE_ADD_LIST_ERROR,
        };
        const initial = {
            ...initialState,
            addList: {
                ...initialState.addList,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            addList: {
                ...initialState.addList,
                error: null,
            },
        };
        expect(lists(initial, action)).toEqual(expected);
    });
});