export const ITEMS_ERROR = 'ITEMS_ERROR';
export const ITEMS_LOADING = 'ITEMS_LOADING';
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS';

const itemsError = (error) => {
    return {
        type: ITEMS_ERROR,
        error,
    };
};

const itemsLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};

const itemsSuccess = (items) => {
    return {
        type: ITEMS_SUCCESS,
        items,
    };
};

export const handleTagSearch = (tag) => {
    return async (dispatch) => {
        dispatch(itemsLoading());
        try {
            const response = await fetch(`http://localhost:8080/items/tags/${tag}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const { data } = await response.json();
                dispatch(itemsSuccess(data));
            } else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(itemsError('Uh oh, something went wrong. Please try again.'));
        }
    }
}