import { 
    ITEMS_ERROR,
    ITEMS_LOADING,
    ITEMS_SUCCESS,
} from '../actions/items';


const initialState = {
    getItems: {
        loading: false,
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
        default :
            return state;
    }
}