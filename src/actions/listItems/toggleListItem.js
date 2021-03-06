import api from '../../api';

export const TOGGLE_LIST_ITEM_ERROR = 'TOGGLE_LIST_ITEM_ERROR';
export const TOGGLE_LIST_ITEM_SUCCESS = 'TOGGLE_LIST_ITEM_SUCCESS';
export const ADD_ITEM_TO_LIST = 'ADD_ITEM_TO_LIST';
export const REMOVE_ITEM_FROM_LIST = 'REMOVE_ITEM_FROM_LIST';

const toggleListItemError = error => {
  return {
    type: TOGGLE_LIST_ITEM_ERROR,
    error,
  };
};

const toggleListItemSuccess = () => {
  return {
    type: TOGGLE_LIST_ITEM_SUCCESS,
  };
};

export const addItemToList = (listId, itemId) => {
  return {
    type: ADD_ITEM_TO_LIST,
    listId,
    itemId,
  };
};

export const removeItemFromList = (listId, itemId) => {
  return {
    type: REMOVE_ITEM_FROM_LIST,
    listId,
    itemId,
  };
};

export const handleAddListItem = (listId, itemId) => {
  return async (dispatch, getState) => {
    dispatch(addItemToList(listId, itemId));
    try {
      const { token } = getState().authedUser;
      const body = JSON.stringify({
        list_id: listId,
        item_id: itemId,
      });
      const response = await api('lists/listitems', 'POST', token, body);
      if (response.status === 201) {
        dispatch(toggleListItemSuccess());
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(removeItemFromList(listId, itemId));
      dispatch(
        toggleListItemError('Failed to add item to list. Please try again.')
      );
    }
  };
};

export const handleRemoveListItem = (listId, itemId) => {
  return async (dispatch, getState) => {
    dispatch(removeItemFromList(listId, itemId));
    try {
      const { token } = getState().authedUser;
      const body = JSON.stringify({
        list_id: listId,
        item_id: itemId,
      });
      const response = await api('lists/listitems', 'DELETE', token, body);
      if (response.status === 200) {
        dispatch(toggleListItemSuccess());
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(addItemToList(listId, itemId));
      dispatch(
        toggleListItemError(
          'Failed to remove item from list. Please try again.'
        )
      );
    }
  };
};
