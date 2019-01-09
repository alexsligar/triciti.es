import {
    ADD_LIST_ITEM_ERROR,
    ADD_LIST_ITEM_SUCCESS,
} from '../actions/listItems/addListItem';

const initialState = {
    addListItem: {
        error: null,
    }
};

export default function registerUser (state = initialState, action) {
    switch(action.type) {
        case ADD_LIST_ITEM_ERROR :
            return {
                ...state,
                addListItem: {
                    ...state.addListItem,
                    error: action.error,
                },
            }
        case ADD_LIST_ITEM_SUCCESS :
            return {
                ...state,
                addListItem: {
                    ...state.addListItem,
                    error: null,
                }
            }
        default: 
            return state;
    }  
}
