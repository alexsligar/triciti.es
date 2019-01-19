import api from '../../api';

export const DELETE_TAG_PROCESSING = 'DELETE_TAG_PROCESSING';
export const DELETE_TAG_ERROR = 'DELETE_TAG_ERROR';
export const REMOVE_DELETE_TAG_ERROR = 'REMOVE_DELETE_TAG_ERROR';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';

const deleteTagProcessing = () => {
  return {
    type: DELETE_TAG_PROCESSING,
  };
};

const deleteTagError = error => {
  return {
    type: DELETE_TAG_ERROR,
    error,
  };
};

const deleteTagSuccess = tag => {
  return {
    type: DELETE_TAG_SUCCESS,
    tag,
  };
};

export const removeDeleteTagError = () => {
  return {
    type: REMOVE_DELETE_TAG_ERROR,
  };
};

export const handleDeleteTag = tag => {
  return async dispatch => {
    dispatch(deleteTagProcessing());
    try {
      const token = localStorage.getItem('authedUser');
      const body = JSON.stringify({ name: tag });
      const response = await api('tags', 'DELETE', token, body);
      if (response.status === 204) {
        dispatch(deleteTagSuccess(tag));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(deleteTagError('Error deleting tag.'));
    }
  };
};
