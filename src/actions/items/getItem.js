export const ITEM_LOADING = 'ITEM_LOADING';
export const ITEM_ERROR = 'ITEM_ERROR';
export const ITEM_SUCCESS = 'ITEM_SUCCESS';

const itemError = (error) => {
    return {
        type: ITEM_ERROR,
        error,
    };
};

const itemLoading = () => {
    return {
        type: ITEM_LOADING,
    };
};

const itemSuccess = (item) => {
    return {
        type: ITEM_SUCCESS,
        item,
    };
};

export const handleGetItem = (id) => {
    return async (dispatch) => {
        dispatch(itemLoading());
        try {
            const response = await fetch(`http://localhost:8080/items/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const { data } = await response.json();
                dispatch(itemSuccess(data));
            } else if (response.status === 404) {
                dispatch(itemError('Item not found. Please try again.'))
            }  else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(itemError('Uh oh, something went wrong. Please try again.'));
        }
    }
}
