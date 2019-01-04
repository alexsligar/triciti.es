import {
    LIST_LOADING,
    LIST_ERROR,
    LIST_SUCCESS
} from '../actions/lists/getList';
import { 
    ADD_LIST_PROCESSING,
    ADD_LIST_ERROR,
    REMOVE_ADD_LIST_ERROR,
    ADD_LIST_SUCCESS,
} from '../actions/lists/addList';

const initialState = {
    getList: {
        loading: false,
        error: null,
    },
    addList: {
        processing: false,
        error: null,
    },
    item: {},
};

export default function lists(state = initialState, action) {
    switch(action.type) {
        case LIST_LOADING :
            return {
                ...state,
                getList: {
                    ...state.getList,
                    loading: true,
                }
            }
        case LIST_ERROR :
            return {
                ...state,
                getList: {
                    ...state.getList,
                    loading: false,
                    error: action.error,
                },
            }
        case LIST_SUCCESS :
            return {
                ...state,
                getList: {
                    ...state.getList,
                    loading: false,
                    error: null,
                },
                item: action.item,
            }
        case ADD_LIST_PROCESSING :
            return {
                ...state,
                addList: {
                    ...state.addList,
                    processing: true,
                },
            }
        case ADD_LIST_ERROR :
            return {
                ...state,
                addList: {
                    ...state.addList,
                    processing: false,
                    error: action.error,
                },
            }
        case ADD_LIST_SUCCESS :
            return {
                ...state,
                addList: {
                    ...state.addList,
                    processing: false,
                    error: null,
                },
            }
        case REMOVE_ADD_LIST_ERROR :
            return {
                ...state,
                addList: {
                    ...state.addList,
                    error: null,
                },
            }
        default :
            return state;
    }
}