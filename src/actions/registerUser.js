import history from '../history';

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
      const response = await fetch('http://localhost:8080/create_account', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      if (response.status === 200) {
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
