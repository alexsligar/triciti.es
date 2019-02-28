import api from '../../api';

export const UPDATE_USER_PROCESSING = 'UPDATE_USER_PROCESSING';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

const updateUserProcessing = () => {
  return {
    type: UPDATE_USER_PROCESSING,
  };
};

const updateUserError = error => {
  return {
    type: UPDATE_USER_ERROR,
    error,
  };
};

const updateUserSuccess = ({ user, token }) => {
  return {
    type: UPDATE_USER_SUCCESS,
    user,
    token,
  };
};

export const handleUpdateUser = (user, username) => {
  return async (dispatch, getState) => {
    dispatch(updateUserProcessing());
    try {
      const token = getState().authedUser.token;
      const body = JSON.stringify(user);
      const response = await api(`users/${username}`, 'PUT', token, body);
      if (response.status === 200) {
        const { data } = await response.json();
        dispatch(updateUserSuccess(data));
      } else if (response.status === 409) {
        const { message } = await response.json();
        dispatch(updateUserError(message));
      } else {
        throw new Error();
      }
    } catch {
      dispatch(updateUserError('Unable to update user'));
    }
  };
};
