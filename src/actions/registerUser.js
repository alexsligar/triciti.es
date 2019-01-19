import history from '../history';
import api from '../api';

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const REGISTER_USER_PROCESSING = 'REGISTER_USER_PROCESSING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

const registerUserError = error => {
  return {
    type: REGISTER_USER_ERROR,
    error,
  };
};

const registerUserProcessing = () => {
  return {
    type: REGISTER_USER_PROCESSING,
  };
};

const registerUserSuccess = () => {
  return {
    type: REGISTER_USER_SUCCESS,
  };
};

export const handleRegisterUser = userInput => {
  return async dispatch => {
    dispatch(registerUserProcessing());
    try {
      delete userInput.passwordConfirmation;
      const body = JSON.stringify(userInput);
      const response = await api('users', 'POST', null, body);
      if (response.status === 201) {
        dispatch(registerUserSuccess());
        history.push('/login');
      } else if (response.status === 409) {
        const decResponse = await response.json();
        dispatch(registerUserError(decResponse.message));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(
        registerUserError('Uh oh, something went wrong. Please try again.')
      );
    }
  };
};
