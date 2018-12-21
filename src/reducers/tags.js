import {
    TAGS_ERROR,
    TAGS_LOADING,
    TAGS_SUCCESS,
} from '../actions/tags/getTags';
import {
    UPDATE_TAG_ERROR,
    UPDATE_TAG_PROCESSING,
    UPDATE_TAG_SUCCESS,
} from '../actions/tags/updateTag';

const initial = {
    getTags: {
        loading: false,
        error: null,
    },
    updateTag: {
        processing: false,
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
        case UPDATE_TAG_PROCESSING :
            return {
                ...state,
                updateTag: {
                    processing: true,
                    error: null,
                },
            }
        case UPDATE_TAG_ERROR :
            return {
                ...state,
                updateTag: {
                    processing: false,
                    error: action.error,
                },
            }
        case UPDATE_TAG_SUCCESS :
            return {
                ...state,
                updateTag: {
                    processing: false,
                    error: null,
                },
                tags: state.tags.map((tag) => {
                    if (tag.title !== action.oldTag) {
                        return tag;
                    } else {
                        return { title: action.newTag };
                    }
                }),
            }
        default :
            return state;
    }
}