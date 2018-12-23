export const ADD_TAG_PROCESSING = 'ADD_TAG_PROCESSING';
export const ADD_TAG_ERROR = 'ADD_TAG_ERROR';
export const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS';

const addTagProcessing = () => {
    return {
        type: ADD_TAG_PROCESSING,
    };
}

const addTagError = (error) => {
    return {
        type: ADD_TAG_ERROR,
        error,
    };
}

const addTagSuccess = (tag) => {
    return {
        type: ADD_TAG_SUCCESS,
        tag
    };
}

export const handleAddTag = (tag) => {
    return async (dispatch) => {
        dispatch(addTagProcessing());
        try {
            const token = localStorage.getItem('authedUser');
            const response = await fetch(`http://localhost:8080/tags`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    name: tag,
                })
            });
            if (response.status === 200) {
                dispatch(addTagSuccess(tag));
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(addTagError('Error adding tag.'));
        }
    }
}