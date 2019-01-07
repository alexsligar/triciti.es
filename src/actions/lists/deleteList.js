import history from '../../history';

export const DELETE_LIST_PROCESSING = 'DELETE_LIST_PROCESSING';
export const DELETE_LIST_ERROR = 'DELETE_LIST_ERROR';
export const REMOVE_DELETE_LIST_ERROR = 'REMOVE_DELETE_LIST_ERROR';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';

const deleteListProcessing = () => {
    return {
        type: DELETE_LIST_PROCESSING,
    };
}

const deleteListError = (error) => {
    return {
        type: DELETE_LIST_ERROR,
        error,
    };
}

const deleteListSuccess = () => {
    return {
        type: DELETE_LIST_SUCCESS,
    };
}

export const removeDeleteListError = () => {
    return {
        type: REMOVE_DELETE_LIST_ERROR,
    }
}

export const handleDeleteList = (id) => {
    return async (dispatch) => {
        dispatch(deleteListProcessing());
        try {
            const token = localStorage.getItem('authedUser');
            const response = await fetch(`http://localhost:8080/lists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });

            if (response.status === 204) {
                dispatch(deleteListSuccess());
                history.push('/');
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(deleteListError('Error deleting list.'));
        }
    }
}