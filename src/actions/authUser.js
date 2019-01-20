import history from '../history';
import api from '../api';

export const AUTH_USER_PROCESSING = 'AUTH_USER_PROCESSING';
export const AUTH_USER_ERROR = 'AUTH_USER_ERROR';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const REMOVE_AUTH_USER_ERROR = 'REMOVE_AUTH_USER_ERROR';
export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';

const authUserError = error => {
  return {
    type: AUTH_USER_ERROR,
    error,
  };
};

const authUserProcessing = () => {
  return {
    type: AUTH_USER_PROCESSING,
  };
};

const authUserSuccess = () => {
  return {
    type: AUTH_USER_SUCCESS,
  };
};

export const removeAuthUserError = () => {
  return {
    type: REMOVE_AUTH_USER_ERROR,
  };
};

export const setAuthedUser = (user, token) => {
  return {
    type: SET_AUTHED_USER,
    user,
    token,
  };
};

export const removeAuthedUser = () => {
  return {
    type: REMOVE_AUTHED_USER,
  };
};

export const handleAuthUser = credentials => {
  return async dispatch => {
    dispatch(authUserProcessing());
    try {
      const body = JSON.stringify(credentials);
      const response = await api('login', 'POST', null, body);
      if (response.status === 200) {
        const dataRes = await response.json();
        const { token } = dataRes.data;
        await dispatch(handleAuthedUser(token));
      } else if (response.status === 401) {
        dispatch(authUserError('Invalid username/password'));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(authUserError('Uh oh, something went wrong. Please try again.'));
    }
  };
};

export const handleAuthedUser = token => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:8080/users/profile', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 200) {
        const dataResponse = await response.json();
        const user = dataResponse.data;
        dispatch(setAuthedUser(user, token));
        dispatch(authUserSuccess());
        history.push('/');
      } else {
        dispatch(
          authUserError('Uh oh...something went wrong. Please try again.')
        );
      }
    } catch {
      dispatch(
        authUserError('Uh oh...something went wrong. Please try again.')
      );
    }
  };
};

export const handleLogoutUser = () => {
  return async (dispatch, getState) => {
    const { user, token } = getState().authedUser;
    dispatch(removeAuthedUser());
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (response.status === 204) {
        history.push('/');
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setAuthedUser(user, token));
    }
  };
};
