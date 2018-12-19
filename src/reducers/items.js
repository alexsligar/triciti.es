import { 
    ITEMS_ERROR,
    ITEMS_LOADING,
    ITEMS_SUCCESS,
} from '../actions/items';

const initialState = {
    loading: false,
    error: null,
    items: [],
};

export default function registerUser (state = initialState, action) {
    switch (action.type) {
        case ITEMS_ERROR :
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case ITEMS_LOADING :
            return {
                ...state,
                error: null,
                loading: true,
            }
        case ITEMS_SUCCESS :
            return {
                ...state,
                error: null,
                loading: false,
                items: action.items,
            }
        default :
            return state;
    }
}