import { handleGetList } from './getList';

export const UPDATE_LIST_PROCESSING = 'UPDATE_LIST_PROCESSING';
export const UPDATE_LIST_ERROR = 'UPDATE_LIST_ERROR';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';
export const REMOVE_UPDATE_LIST_ERROR = 'UPDATE_ADD_LIST_ERROR';

const updateListProcessing = () => {
  return {
    type: UPDATE_LIST_PROCESSING,
  };
};

const updateListSuccess = () => {
  return {
    type: UPDATE_LIST_SUCCESS,
  };
};

const updateListError = error => {
  return {
    type: UPDATE_LIST_ERROR,
    error,
  };
};

export const removeUpdateListError = () => {
  return {
    type: REMOVE_UPDATE_LIST_ERROR,
  };
};

export const handleUpdateList = (id, list) => {
  return async dispatch => {
    dispatch(updateListProcessing());
    try {
      const token = localStorage.getItem('authedUser');
      const response = await fetch(`http://localhost:8080/lists/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(list),
      });
      if (response.status === 200) {
        dispatch(updateListSuccess());
        const { data } = await response.json();
        dispatch(handleGetList(data.id));
      } else if (response.status === 409) {
        const { message } = await response.json();
        dispatch(updateListError(message));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(updateListError('Error updating list.'));
    }
  };
};
