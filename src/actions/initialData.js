import { decode } from 'jsonwebtoken';
import { setAuthedUser } from './authUser';
import { addTags } from './tags';

export const INITIAL_DATA_LOADING = 'INITIAL_DATA_LOADING';
export const INITIAL_DATA_SUCCESS = 'INITIAL_DATA_SUCCESS';
export const INITIAL_DATA_ERROR = 'INITIAL_DATA_ERROR';

const initialDataLoading  = () => {
    return {
        type: INITIAL_DATA_LOADING,
    }
};

const initialDataSuccess = () => {
    return {
        type: INITIAL_DATA_SUCCESS,
    }
};

const initialDataError = (error) => {
    return {
        type: INITIAL_DATA_ERROR,
        error,
    }
}

export const handleInitialData = () => {
    return async (dispatch) => {
        dispatch(initialDataLoading());
        const token = localStorage.getItem('authedUser');
        if (token) {
            const {id } = decode(token);
            dispatch(setAuthedUser(id));
        }
        try {
            const response = await fetch('http://localhost:8080/tags', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const dataResponse = await response.json();
                const tags = dataResponse.data.map((tag) => ({ 'title': tag.name }));
                dispatch(addTags(tags));
                dispatch(initialDataSuccess());
            } else {
                dispatch(initialDataError('Uh oh...something went wrong. Please reload.'));
            }
        }
        catch {
            dispatch(initialDataError('Uh oh...something went wrong. Please reload.'));
        }
    }
}