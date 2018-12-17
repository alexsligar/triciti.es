import { decode } from 'jsonwebtoken';
import history from '../history';

export const AUTH_USER_PROCESSING = 'AUTH_USER_PROCESSING';
export const AUTH_USER_ERROR = 'AUTH_USER_ERROR';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const REMOVE_AUTH_USER_ERROR = 'REMOVE_AUTH_USER_ERROR';
export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';

const authUserError = (error) => {
    return {
        type: AUTH_USER_ERROR,
        error,
    };
};

const authUserProcessing = () => {
    return {
        type: AUTH_USER_PROCESSING,
    }
}

const authUserSuccess = () => {
    return {
        type: AUTH_USER_SUCCESS,
    }
}

export const removeAuthUserError = () => {
    return {
        type: REMOVE_AUTH_USER_ERROR,
    }
};

export const setAuthedUser = (id) => {
    return {
        type: SET_AUTHED_USER,
        id,
    };
};

export const removeAuthedUser = () => {
    return {
        type: REMOVE_AUTHED_USER,
    }
}

export const handleAuthUser = (credentials) => {
    return async (dispatch) => {
        dispatch(authUserProcessing());
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (response.status === 200) {
                const dataRes = await response.json();
                const { token } = dataRes.data;
                dispatch(handleAuthedUser(token));
                dispatch(authUserSuccess());
                history.push(`/`);
            } else if (response.status === 401) {
                dispatch(authUserError('Invalid username/password'));
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(authUserError('Uh oh, something went wrong. Please try again.'));
        }
    }
}

export const handleAuthedUser = (token) => {
    localStorage.setItem('authedUser', token);
    const { id } = decode(token);
    return setAuthedUser(id);
}

export const handleLogoutUser = () => {
    return async (dispatch) => {
        dispatch(removeAuthedUser());
        const token = localStorage.getItem('authedUser');
        const { id } = decode(token);
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            if (response.status === 204) {
                localStorage.removeItem('authedUser');
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(setAuthedUser(id));
        }
    }
}
