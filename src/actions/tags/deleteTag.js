export const DELETE_TAG_PROCESSING = 'DELETE_TAG_PROCESSING';
export const DELETE_TAG_ERROR = 'DELETE_TAG_ERROR';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';

const deleteTagProcessing = () => {
    return {
        type: DELETE_TAG_PROCESSING,
    };
}

const deleteTagError = (error) => {
    return {
        type: DELETE_TAG_ERROR,
        error,
    };
}

const deleteTagSuccess = (tag) => {
    return {
        type: DELETE_TAG_SUCCESS,
        tag
    };
}

export const handleDeleteTag = (tag) => {
    return async (dispatch) => {
        dispatch(deleteTagProcessing());
        try {
            const token = localStorage.getItem('authedUser');
            const response = await fetch(`http://localhost:8080/tags`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    name: tag,
                })
            });
            if (response.status === 204) {
                dispatch(deleteTagSuccess(tag));
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(deleteTagError('Error deleting tag.'));
        }
    }
}