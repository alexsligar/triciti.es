import { 
    ITEMS_ERROR,
    ITEMS_LOADING,
    ITEMS_SUCCESS,
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

export default function registerUser (state = initialState, action) {
    switch (action.type) {
        case ITEMS_ERROR :
            return {
                ...state,
                getItems: {
                    ...state.getItems,
                    error: action.error,
                    loading: false,
                },
            };
        case ITEMS_LOADING :
            return {
                ...state,
                getItems: {
                    ...state.getItems,
                    loading: true,
                },
            }
        case ITEMS_SUCCESS :
            return {
                ...state,
                getItems: {
                    ...state.getItems,
                    loading: false,
                    error: null,
                },
                items: action.items,
            }
        case ADD_ITEM_PROCESSING :
            return {
                ...state,
                addItem: {
                    ...state.addItem,
                    processing: true,
                }
            }
        case ADD_ITEM_ERROR :
            return {
                ...state,
                addItem: {
                    ...state.addItem,
                    processing: false,
                    error: action.error,
                },
            }
        case ADD_ITEM_SUCCESS :
            return {
                ...state,
                addItem: {
                    ...state.addItem,
                    processing: false,
                    error: null,
                },
                items: state.items.concat([action.item]),
            }
        case REMOVE_ADD_ITEM_ERROR :
            return {
                ...state,
                addItem: {
                    ...state.addItem,
                    error: null,
                },
            }
        default :
            return state;
    }
}