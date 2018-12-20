import {
    TAGS_ERROR,
    TAGS_LOADING,
    TAGS_SUCCESS,
} from '../actions/tags';

const initial = {
    loading: false,
    error: null,
    tags: [],
}

export default function initialData (state = initial, action) {

    switch (action.type) {
        case TAGS_LOADING :
            return {
                ...state,
                loading: true,
                error: null,
            }
        case TAGS_ERROR :
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case TAGS_SUCCESS :
            return {
                ...state,
                loading: false,
                error: null,
                tags: action.tags,
            }
        default :
            return state;
    }
}