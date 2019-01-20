import history from '../../history';
import api from '../../api';

export const ADD_LIST_PROCESSING = 'ADD_LIST_PROCESSING';
export const ADD_LIST_ERROR = 'ADD_LIST_ERROR';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const REMOVE_ADD_LIST_ERROR = 'REMOVE_ADD_LIST_ERROR';
export const SHOW_NEW_LIST_MODAL = 'SHOW_NEW_LIST_MODAL';
export const CLOSE_NEW_LIST_MODAL = 'CLOSE_NEW_LIST_MODAL';

const addListProcessing = () => {
  return {
    type: ADD_LIST_PROCESSING,
  };
};

const addListSuccess = () => {
  return {
    type: ADD_LIST_SUCCESS,
  };
};

const addListError = error => {
  return {
    type: ADD_LIST_ERROR,
    error,
  };
};

export const showNewListModal = () => {
  return {
    type: SHOW_NEW_LIST_MODAL,
  };
};

export const closeNewListModal = () => {
  return {
    type: CLOSE_NEW_LIST_MODAL,
  };
};

export const removeAddListError = () => {
  return {
    type: REMOVE_ADD_LIST_ERROR,
  };
};

export const handleAddList = list => {
  return async (dispatch, getState) => {
    dispatch(addListProcessing());
    try {
      const { token } = getState().authedUser;
      const body = JSON.stringify(list);
      const response = await api('lists', 'POST', token, body);
      if (response.status === 201) {
        const { data } = await response.json();
        dispatch(addListSuccess());
        history.push(`/lists/${data.id}`);
      } else if (response.status === 409) {
        dispatch(addListError('You already have a list with that name.'));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(addListError('Error adding list.'));
    }
  };
};
