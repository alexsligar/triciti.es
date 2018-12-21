import {
    TAGS_ERROR,
    TAGS_LOADING,
    TAGS_SUCCESS,
} from '../actions/tags/getTags';

const initial = {
    getTags: {
        loading: false,
        error: null,
    },
    tags: [],
}

export default function initialData (state = initial, action) {

    switch (action.type) {
        case TAGS_LOADING :
            return {
                ...state,
                getTags: {
                    loading: true,
                    error: null,
                },
            }
        case TAGS_ERROR :
            return {
                ...state,
                getTags: {
                    loading: false,
                    error: action.error,
                },
            }
        case TAGS_SUCCESS :
            return {
                ...state,
                getTags: {
                    loading: false,
                    error: null,
                },
                tags: action.tags,
            }
        default :
            return state;
    }
}