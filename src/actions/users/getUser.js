export const USER_LOADING = 'USER_LOADING';
export const USER_ERROR = 'USER_ERROR';
export const USER_SUCCESS = 'USER_SUCCESS';

const userError = error => {
  return {
    type: USER_ERROR,
    error,
  };
};

const userLoading = () => {
  return {
    type: USER_LOADING,
  };
};

const userSuccess = user => {
  return {
    type: USER_SUCCESS,
    user,
  };
};

export const handleGetUser = id => {
  return async dispatch => {
    dispatch(userLoading());
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const { data } = await response.json();
        dispatch(userSuccess(data));
      } else if (response.status === 404) {
        dispatch(userError('User not found. Please try again.'));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(userError('Uh oh, something went wrong. Please try again.'));
    }
  };
};
