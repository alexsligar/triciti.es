export const ADD_LIST_ITEM_ERROR = 'ADD_LIST_ITEM_ERROR';
export const ADD_LIST_ITEM_SUCCESS ='ADD_LIST_ITEM_SUCCESS';
export const ADD_ITEM_TO_LIST = 'ADD_ITEM_TO_LIST';
export const REMOVE_ITEM_FROM_LIST = 'REMOVE_ITEM_FROM_LIST';

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

const addItemToList = (listId, itemId) => {
    return {
        type: ADD_ITEM_TO_LIST,
        listId,
        itemId,
    }
}

const removeItemFromList = (listId, itemId) => {
    return {
        type: REMOVE_ITEM_FROM_LIST,
        listId,
        itemId,
    }
}

export const handleAddListItem = (listId, itemId) => {

    return async (dispatch) => {

        dispatch(addItemToList(listId, itemId))
        try {
            const token = localStorage.getItem('authedUser');
            const response = await fetch(`http://localhost:8080/lists/listitems`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
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
            dispatch(removeItemFromList(listId, itemId));
            dispatch(addListItemError('Failed to add item to list. Please try again.'));
        }
    }
}
