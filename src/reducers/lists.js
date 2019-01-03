import { 
    ADD_LIST_PROCESSING,
    ADD_LIST_ERROR,
    REMOVE_ADD_LIST_ERROR,
    ADD_LIST_SUCCESS,
} from '../actions/lists/addList';

const initialState = {
    addList: {
        processing: false,
        error: null,
    },
};

export default function lists(state = initialState, action) {
    switch(action.type) {
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