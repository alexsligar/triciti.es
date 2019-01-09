export const ADD_LIST_ITEM_ERROR = 'ADD_LIST_ITEM_ERROR';
export const ADD_LIST_ITEM_SUCCESS ='ADD_LIST_ITEM_SUCCESS';

const addListItemError = (error) => {
    return {
        type: ADD_LIST_ITEM_ERROR,
        error,
    };
}

const addListItemSuccess = () => {
    return {
        type: ADD_LIST_ITEM_SUCCESS,
    }
}

export const handleAddListItem = (listId, itemId) => {

    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:8080/lists/listitems`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    list_id: listId,
                    item_id: itemId,
                }),
            });
            if (response.status === 200) {
                dispatch(addListItemSuccess());
            }  else {
                throw new Error();
            }
        }
        catch (err) {
            dispatch(addListItemError('Failed to add item to list. Please try again.'));
        }
    }
}
