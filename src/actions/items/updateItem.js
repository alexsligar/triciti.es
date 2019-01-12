import history from '../../history';

export const UPDATE_ITEM_PROCESSING = 'UPDATE_ITEM_PROCESSING';
export const UPDATE_ITEM_ERROR = 'UPDATE_ITEM_ERROR';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const REMOVE_UPDATE_ITEM_ERROR = 'UPDATE_ADD_ITEM_ERROR';

const updateItemProcessing = () => {
  return {
    type: UPDATE_ITEM_PROCESSING,
  };
};

const updateItemSuccess = () => {
  return {
    type: UPDATE_ITEM_SUCCESS,
  };
};

const updateItemError = error => {
  return {
    type: UPDATE_ITEM_ERROR,
    error,
  };
};

export const removeUpdateItemError = () => {
  return {
    type: REMOVE_UPDATE_ITEM_ERROR,
  };
};

export const handleUpdateItem = (id, item) => {
  return async dispatch => {
    dispatch(updateItemProcessing());
    try {
      const token = localStorage.getItem('authedUser');
      const response = await fetch(`http://localhost:8080/items/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(item),
      });
      if (response.status === 200) {
        const { data } = await response.json();
        dispatch(updateItemSuccess());
        history.push(`/items/${data.id}`);
      } else if (response.status === 409) {
        const { message } = await response.json();
        dispatch(updateItemError(message));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(updateItemError('Error updating item.'));
    }
  };
};
