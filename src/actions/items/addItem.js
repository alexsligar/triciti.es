import history from '../../history';
import api from '../../api';

export const ADD_ITEM_PROCESSING = 'ADD_ITEM_PROCESSING';
export const ADD_ITEM_ERROR = 'ADD_ITEM_ERROR';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const REMOVE_ADD_ITEM_ERROR = 'REMOVE_ADD_ITEM_ERROR';

const addItemProcessing = () => {
  return {
    type: ADD_ITEM_PROCESSING,
  };
};

const addItemSuccess = () => {
  return {
    type: ADD_ITEM_SUCCESS,
  };
};

const addItemError = error => {
  return {
    type: ADD_ITEM_ERROR,
    error,
  };
};

export const removeAddItemError = () => {
  return {
    type: REMOVE_ADD_ITEM_ERROR,
  };
};

export const handleAddItem = item => {
  return async (dispatch, getState) => {
    dispatch(addItemProcessing());
    try {
      const { token } = getState().authedUser;
      const response = await api('items', 'POST', token, JSON.stringify(item));
      if (response.status === 201) {
        const { data } = await response.json();
        dispatch(addItemSuccess());
        history.push(`/items/${data.id}`);
      } else if (response.status === 409) {
        const { message } = await response.json();
        dispatch(addItemError(message));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(addItemError('Error adding item.'));
    }
  };
};
