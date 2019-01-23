import api from '../../api';

export const USER_STARRED_ITEMS_LOADING = 'USER_STARRED_ITEMS_LOADING';
export const USER_STARRED_ITEMS_ERROR = 'USER_STARRED_ITEMS_ERROR';
export const USER_STARRED_ITEMS_SUCCESS = 'USER_STARRED_ITEMS_SUCCESS';

const userStarredItemsLoading = () => {
  return {
    type: USER_STARRED_ITEMS_LOADING,
  };
};

const userStarredItemsError = error => {
  return {
    type: USER_STARRED_ITEMS_ERROR,
    error,
  };
};

const userStarredItemsSuccess = (username, items) => {
  return {
    type: USER_STARRED_ITEMS_SUCCESS,
    username,
    items,
  };
};

export const handleGetUserStarredItems = username => {
  return async dispatch => {
    dispatch(userStarredItemsLoading());
    try {
      const response = await api(`users/${username}/starred`);
      if (response.status === 200) {
        const { data } = await response.json();
        dispatch(userStarredItemsSuccess(username, data));
      } else if (response.status === 404) {
        dispatch(userStarredItemsError('User not found. Please try again.'));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(
        userStarredItemsError(
          'Uh oh, something went wrong loading your starred items. Please try again.'
        )
      );
    }
  };
};
