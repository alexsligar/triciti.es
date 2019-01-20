import authedUser from './authedUser';
import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from '../actions/authUser';

describe('authedUser reducer', () => {
  it('should return null for the initial state', () => {
    expect(authedUser(undefined, {})).toEqual({});
  });

  it('should handle SET_AUTHED_USER', () => {
    const action = {
      type: SET_AUTHED_USER,
      user: {
        id: 1,
        name: 'test',
      },
      token: 'abc',
    };
    expect(authedUser(undefined, action)).toEqual({
      user: action.user,
      token: action.token,
    });
  });

  it('should handle LOGOUT_AUTHED_USER', () => {
    const action = {
      type: REMOVE_AUTHED_USER,
    };
    expect(authedUser(undefined, action)).toEqual({});
  });
});
