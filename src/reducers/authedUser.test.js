import authedUser from './authedUser';
import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from '../actions/authUser';
import { UPDATE_USER_SUCCESS } from '../actions/users/updateUser';

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

  it('should handle REMOVE_AUTHED_USER', () => {
    const action = {
      type: REMOVE_AUTHED_USER,
    };
    expect(authedUser(undefined, action)).toEqual({});
  });

  it('should handle UPDATE_USER_SUCCESS with token', () => {
    const initial = {
      user: { id: 1, name: 'Bobby Test', username: 'testuser' },
      token: 'abc',
    };
    const action = {
      type: UPDATE_USER_SUCCESS,
      user: { id: 1, name: 'Billy Test', username: 'testuser2' },
      token: 'efg',
    };
    expect(authedUser(initial, action)).toEqual({
      user: action.user,
      token: action.token,
    });
  });

  it('should handle UPDATE_USER_SUCCESS with undefined token', () => {
    const initial = {
      user: { id: 1, name: 'Bobby Test', username: 'testuser' },
      token: 'abc',
    };
    const action = {
      type: UPDATE_USER_SUCCESS,
      user: { id: 1, name: 'Billy Test', username: 'testuser2' },
      token: undefined,
    };
    expect(authedUser(initial, action)).toEqual({
      user: action.user,
      token: initial.token,
    });
  });
});
