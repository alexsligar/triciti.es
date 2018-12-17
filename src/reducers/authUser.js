import { 
    AUTH_USER_PROCESSING, 
    AUTH_USER_ERROR, 
    AUTH_USER_SUCCESS,
    REMOVE_AUTH_USER_ERROR
} from '../actions/authUser';

const initialState = {
    processing: false,
    error: null,
};

export default function authUser (state = initialState, action) {
    switch (action.type) {
        case AUTH_USER_PROCESSING :
            return {
                ...state,
                error: null,
                processing: true,    
            };
        case AUTH_USER_ERROR :
            return {
                ...state,
                error: action.error,
                processing: false,
            }
        case AUTH_USER_SUCCESS :
            return {
                ...state,
                error: null,
                processing: false,
            }
        case REMOVE_AUTH_USER_ERROR :
            return {
                ...state,
                error: null,
            }
        default :
            return state;
    }
}