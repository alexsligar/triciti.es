import history from '../../history';

export const DELETE_ITEM_PROCESSING = 'DELETE_ITEM_PROCESSING';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export const REMOVE_DELETE_ITEM_ERROR = 'REMOVE_DELETE_ITEM_ERROR';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';

const deleteItemProcessing = () => {
    return {
        type: DELETE_ITEM_PROCESSING,
    };
}

const deleteItemError = (error) => {
    return {
        type: DELETE_ITEM_ERROR,
        error,
    };
}

const deleteItemSuccess = () => {
    return {
        type: DELETE_ITEM_SUCCESS,
    };
}

export const removeDeleteItemError = () => {
    return {
        type: REMOVE_DELETE_ITEM_ERROR,
    }
}

export const handleDeleteItem = (id) => {
    return async (dispatch) => {
        dispatch(deleteItemProcessing());
        try {
            const token = localStorage.getItem('authedUser');
            const response = await fetch(`http://localhost:8080/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });

            if (response.status === 204) {
                dispatch(deleteItemSuccess());
                history.push('/');
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(deleteItemError('Error deleting item.'));
        }
    }
}