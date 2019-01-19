import api from '../../api';

export const TAGS_LOADING = 'TAGS_LOADING';
export const TAGS_ERROR = 'TAGS_ERROR';
export const TAGS_SUCCESS = 'TAGS_SUCCESS';

const tagsSuccess = tags => {
  return {
    type: TAGS_SUCCESS,
    tags,
  };
};

const tagsLoading = () => {
  return {
    type: TAGS_LOADING,
  };
};

const tagsError = error => {
  return {
    type: TAGS_ERROR,
    error,
  };
};

export const handleGetTags = () => {
  return async dispatch => {
    dispatch(tagsLoading());
    try {
      const response = await api('tags');
      if (response.status === 200) {
        const { data } = await response.json();
        const tags = data.map(tag => {
          return { title: tag.name };
        });
        dispatch(tagsSuccess(tags));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(tagsError('Error loading tags. Please refresh to try again.'));
    }
  };
};
