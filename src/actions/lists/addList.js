import history from '../../history';

export const ADD_LIST_PROCESSING = 'ADD_LIST_PROCESSING';
export const ADD_LIST_ERROR = 'ADD_LIST_ERROR';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const REMOVE_ADD_LIST_ERROR = 'REMOVE_ADD_LIST_ERROR';

const addListProcessing = () => {
    return {
        type: ADD_LIST_PROCESSING,
    }
}

const addListSuccess = () => {
    return {
        type: ADD_LIST_SUCCESS,
    }
}

const addListError = (error) => {
    return {
        type: ADD_LIST_ERROR,
        error,
    }
}

export const removeAddListError = () => {
    return {
        type: REMOVE_ADD_LIST_ERROR,
    }
}

export const handleAddList = (list) => {
    return async (dispatch) => {
        dispatch(addListProcessing());
        try {
            const token = localStorage.getItem('authedUser');
            const response = await fetch(`http://localhost:8080/lists`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(list)
            });
            if (response.status === 200) {
                const { data } = await response.json();
                dispatch(addListSuccess());
                history.push(`/lists/${data.id}`);
            } else if (response.status === 409) {
                dispatch(addListError('You already have a list with that name.'));
            } else {
                throw new Error();
            }
        } catch {
            dispatch(addListError('Error adding list.'))
        }
    }
}