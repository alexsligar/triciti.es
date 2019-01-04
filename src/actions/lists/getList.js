export const LIST_LOADING = 'LIST_LOADING';
export const LIST_ERROR = 'LIST_ERROR';
export const LIST_SUCCESS = 'LIST_SUCCESS';

const listError = (error) => {
    return {
        type: LIST_ERROR,
        error,
    };
};

const listLoading = () => {
    return {
        type: LIST_LOADING,
    };
};

const listSuccess = (list) => {
    return {
        type: LIST_SUCCESS,
        list,
    };
};

export const handleGetList = (id) => {
    return async (dispatch) => {
        dispatch(listLoading());
        try {
            const response = await fetch(`http://localhost:8080/lists/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const { data } = await response.json();
                dispatch(listSuccess(data));
            } else if (response.status === 404) {
                dispatch(listError('List not found. Please try again.'))
            }  else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(listError('Uh oh, something went wrong. Please try again.'));
        }
    }
}