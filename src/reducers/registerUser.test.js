import registerUser from './registerUser';
import {
  REGISTER_USER_PROCESSING,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from '../actions/users/registerUser';

describe('registerUser reducer', () => {
  it('should return the correct initial state', () => {
    const expected = {
      processing: false,
      error: null,
    };

    expect(registerUser(undefined, {})).toEqual(expected);
  });

  it('should handle REGISTER_USER_PROCESSING', () => {
    const action = {
      type: REGISTER_USER_PROCESSING,
    };
    const expected = {
      processing: true,
      error: null,
    };
    expect(registerUser(undefined, action)).toEqual(expected);
  });

  it('should handle REGISTER_USER_ERROR', () => {
    const action = {
      type: REGISTER_USER_ERROR,
      error: 'test',
    };
    const expected = {
      processing: false,
      error: 'test',
    };
    expect(registerUser(undefined, action)).toEqual(expected);
  });

  it('should handle REGISTER_USER_SUCCESS', () => {
    const action = {
      type: REGISTER_USER_SUCCESS,
    };
    const expected = {
      processing: false,
      error: null,
    };
    expect(registerUser(undefined, action)).toEqual(expected);
  });
});
