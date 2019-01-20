import api from '../../api';

export const UPDATE_TAG_PROCESSING = 'UPDATE_TAG_PROCESSING';
export const UPDATE_TAG_ERROR = 'UPDATE_TAG_ERROR';
export const REMOVE_UPDATE_TAG_ERROR = 'REMOVE_UPDATE_TAG_ERROR';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';

const updateTagProcessing = () => {
  return {
    type: UPDATE_TAG_PROCESSING,
  };
};

const updateTagError = error => {
  return {
    type: UPDATE_TAG_ERROR,
    error,
  };
};

const updateTagSuccess = (oldTag, newTag) => {
  return {
    type: UPDATE_TAG_SUCCESS,
    oldTag,
    newTag,
  };
};

export const removeUpdateTagError = () => {
  return {
    type: REMOVE_UPDATE_TAG_ERROR,
  };
};

export const handleUpdateTag = (oldTag, newTag) => {
  return async (dispatch, getState) => {
    dispatch(updateTagProcessing());
    try {
      const { token } = getState().authedUser;
      const body = JSON.stringify({ name: newTag });
      const response = await api(`tags/${oldTag}`, 'PUT', token, body);
      if (response.status === 200) {
        dispatch(updateTagSuccess(oldTag, newTag));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(updateTagError('Error updating tag.'));
    }
  };
};
