import listItems from './listItems';
import {
    ADD_LIST_ITEM_ERROR,
    ADD_LIST_ITEM_SUCCESS,
} from '../actions/listItems/addListItem';

const initialState = {
    addListItem: {
        error: null,
    },
};

describe('listItems reducer', () => {

    it('should return the correct initial state', () => {

        expect(listItems(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_LIST_ITEM_ERROR', () => {

        const action = {
            type: ADD_LIST_ITEM_ERROR,
            error: 'Uh oh',
        };
        const initial = {
            ...initialState,
            addListItem: {
                error: null,
            }
        };
        const expected = {
            ...initialState,
            addListItem: {
                error: 'Uh oh',
            },
        };
        expect(listItems(initial, action)).toEqual(expected);
    });

    it('should handle ADD_LIST_ITEM_SUCCESS', () => {

        const action = {
            type: ADD_LIST_ITEM_SUCCESS,
        };
        const initial = {
            ...initialState,
            addListItem: {
                error: 'Uh oh',
            }
        };
        const expected = {
            ...initialState,
            addListItem: {
                error: null,
            },
        };
        expect(listItems(initial, action)).toEqual(expected);
    });

});