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
import {
    ADD_TAG_ERROR,
    ADD_TAG_PROCESSING,
    ADD_TAG_SUCCESS,
} from '../actions/tags/addTag';
import {
    DELETE_TAG_ERROR,
    DELETE_TAG_PROCESSING,
    DELETE_TAG_SUCCESS,
} from '../actions/tags/deleteTag';

const initial = {
    getTags: {
        loading: false,
        error: null,
    },
    addTag: {
        processing: false,
        error: null,
    },
    updateTag: {
        processing: false,
        error: null,
    },
    deleteTag: {
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
        case ADD_TAG_PROCESSING :
            return {
                ...state,
                addTag: {
                    processing: true,
                    error: null,
                }
            }
        case ADD_TAG_ERROR :
            return {
                ...state,
                addTag: {
                    processing: false,
                    error: action.error,
                }
            }
        case ADD_TAG_SUCCESS :
            return {
                ...state,
                addTag: {
                    processing: false,
                    error: null,
                },
                tags: state.tags.concat([{ title: action.tag }]),
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
        case DELETE_TAG_PROCESSING :
            return {
                ...state,
                deleteTag: {
                    processing: true,
                    error: null,
                },
            }
        case DELETE_TAG_ERROR :
            return {
                ...state,
                deleteTag: {
                    processing: false,
                    error: action.error,
                },
            }
        case DELETE_TAG_SUCCESS :
            return {
                ...state,
                deleteTag: {
                    processing: false,
                    error: null,
                },
                tags: state.tags.filter((tag) => tag.title !== action.tag),
            }
        default :
            return state;
    }
}