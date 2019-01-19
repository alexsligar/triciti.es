import api from '../../api';

export const USER_LISTS_LOADING = 'USER_LISTS_LOADING';
export const USER_LISTS_ERROR = 'USER_LISTS_ERROR';
export const USER_LISTS_SUCCESS = 'USER_LISTS_SUCCESS';

const userListsLoading = () => {
  return {
    type: USER_LISTS_LOADING,
  };
};

const userListsError = error => {
  return {
    type: USER_LISTS_ERROR,
    error,
  };
};

const userListsSuccess = (username, lists) => {
  return {
    type: USER_LISTS_SUCCESS,
    username,
    lists,
  };
};

export const handleGetUserLists = username => {
  return async dispatch => {
    dispatch(userListsLoading());
    try {
      const response = await api(`users/${username}/lists`);
      if (response.status === 200) {
        const { data } = await response.json();
        dispatch(userListsSuccess(username, data));
      } else if (response.status === 404) {
        dispatch(userListsError('User not found. Please try again.'));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(
        userListsError(
          'Uh oh, something went wrong loading your lists. Please try again.'
        )
      );
    }
  };
};
