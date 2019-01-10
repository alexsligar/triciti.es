import {
    TOGGLE_LIST_ITEM_ERROR,
    TOGGLE_LIST_ITEM_SUCCESS,
} from '../actions/listItems/toggleListItem';

const initialState = {
    toggleListItem: {
        error: null,
    }
};

export default function registerUser (state = initialState, action) {
    switch(action.type) {
        case TOGGLE_LIST_ITEM_ERROR :
            return {
                ...state,
                toggleListItem: {
                    ...state.toggleListItem,
                    error: action.error,
                },
            }
        case TOGGLE_LIST_ITEM_SUCCESS :
            return {
                ...state,
                toggleListItem: {
                    ...state.toggleListItem,
                    error: null,
                }
            }
        default: 
            return state;
    }  
}
