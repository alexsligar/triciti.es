import {
    USER_LOADING,
    USER_ERROR,
    USER_SUCCESS
} from '../actions/users/getUser';
import {
    USER_LISTS_LOADING,
    USER_LISTS_ERROR,
    USER_LISTS_SUCCESS
} from '../actions/users/getUserLists';

const initialState = {
    getUser: {
        loading: false,
        error: null,
    },
    getUserLists: {
        loading: false,
        error: null,
    },
    user: {},
    userLists: {
        username: null,
        lists: [],
    },
};

export default function lists(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING :
            return {
                ...state,
                getUser: {
                    ...state.getUser,
                    loading: true,
                }
            }
        case USER_ERROR :
            return {
                ...state,
                getUser: {
                    ...state.getUser,
                    loading: false,
                    error: action.error,
                },
            }
        case USER_SUCCESS :
            return {
                ...state,
                getUser: {
                    ...state.getUser,
                    loading: false,
                    error: null,
                },
                user: action.user,
            }
        case USER_LISTS_LOADING :
            return {
                ...state,
                getUserLists: {
                    ...state.getUserLists,
                    loading: true,
                }
            }
        case USER_LISTS_ERROR :
            return {
                ...state,
                getUserLists: {
                    ...state.getUserLists,
                    loading: false,
                    error: action.error,
                },
            }
        case USER_LISTS_SUCCESS :
            return {
                ...state,
                getUserLists: {
                    ...state.getUserLists,
                    loading: false,
                    error: null,
                },
                userLists: {
                    ...state.userLists,
                    username: action.username,
                    lists: action.lists,
                }
            }
        default :
            return state;
    }
}