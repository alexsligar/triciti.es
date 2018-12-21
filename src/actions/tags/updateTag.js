export const UPDATE_TAG_PROCESSING = 'UPDATE_TAG_PROCESSING';
export const UPDATE_TAG_ERROR = 'UPDATE_TAG_ERROR';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';

const updateTagProcessing = () => {
    return {
        type: UPDATE_TAG_PROCESSING,
    };
}

const updateTagError = (error) => {
    return {
        type: UPDATE_TAG_ERROR,
        error,
    };
}

const updateTagSuccess = (oldTag, newTag) => {
    return {
        type: UPDATE_TAG_SUCCESS,
        oldTag,
        newTag,
    };
}

export const handleUpdateTag = (oldTag, newTag) => {
    return async (dispatch) => {
        dispatch(updateTagProcessing());
        try {
            const token = localStorage.getItem('authedUser');
            const response = await fetch(`http://localhost:8080/tags/${oldTag}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    name: newTag,
                })
            });
            if (response.status === 200) {
                dispatch(updateTagSuccess(oldTag, newTag));
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(updateTagError('Error updating tag.'));
        }
    }
}