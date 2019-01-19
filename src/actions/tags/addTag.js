import api from '../../api';

export const ADD_TAG_PROCESSING = 'ADD_TAG_PROCESSING';
export const ADD_TAG_ERROR = 'ADD_TAG_ERROR';
export const REMOVE_ADD_TAG_ERROR = 'REMOVE_ADD_TAG_ERROR';
export const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS';

const addTagProcessing = () => {
  return {
    type: ADD_TAG_PROCESSING,
  };
};

const addTagError = error => {
  return {
    type: ADD_TAG_ERROR,
    error,
  };
};

const addTagSuccess = tag => {
  return {
    type: ADD_TAG_SUCCESS,
    tag,
  };
};

export const removeAddTagError = () => {
  return {
    type: REMOVE_ADD_TAG_ERROR,
  };
};

export const handleAddTag = tag => {
  return async dispatch => {
    dispatch(addTagProcessing());
    try {
      const token = localStorage.getItem('authedUser');
      const body = JSON.stringify({ name: tag });
      const response = await api('tags', 'POST', token, body);
      if (response.status === 201) {
        dispatch(addTagSuccess(tag));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(addTagError('Error adding tag.'));
    }
  };
};
