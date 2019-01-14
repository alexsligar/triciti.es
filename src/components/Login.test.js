import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Form, Header } from 'semantic-ui-react';
import ConnectedLogin, { Login } from './Login';
import { storeFactory } from '../../test/testUtils';
import history from '../history';

const defaultProps = {
  authUserError: null,
  authUserProcessing: false,
  handleAuthUser: () => {},
  removeAuthUserError: () => {},
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  const wrapper = shallow(<Login {...propsPassed} />);
  return wrapper;
};

describe('render', () => {
  it('should render component without error', () => {
    const wrapper = setup();
    const header = wrapper.find(Header);
    expect(header.dive().text()).toBe('Login to your account');
    const loginForm = wrapper.find(Form);
    expect(loginForm.length).toBe(1);
  });

  describe('when authUserError is present', () => {
    it('should show error message', () => {
      const authUserError = 'Invalid credentials';
      const props = {
        authUserError,
      };
      const wrapper = setup(props);
      const message = wrapper.find('.loginFormMessage');
      expect(message.length).toBe(1);
      expect(
        message
          .dive()
          .find('p')
          .text()
      ).toBe(authUserError);
    });
  });
});

describe('form is submitted', () => {
  const handleAuthUser = jest.fn();
  const removeAuthUserError = jest.fn();
  const preventDefault = jest.fn();
  let wrapper;
  beforeEach(() => {
    handleAuthUser.mockReset();
    preventDefault.mockReset();
    const props = {
      authUserError: 'Invalid credentials',
      authUserProcessing: false,
      handleAuthUser,
      removeAuthUserError,
    };
    wrapper = setup(props);
    wrapper.setState({ username: 'test', password: 'Hapi123$' });
  });

  it('should call handleAuthUser when form is submitted', () => {
    const loginForm = wrapper.find(Form);
    loginForm.simulate('submit', { preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);
    expect(handleAuthUser.mock.calls.length).toBe(1);
  });

  it('should not submit form when a field is blank', () => {
    wrapper.setState({ username: '' });
    const loginForm = wrapper.find(Form);
    loginForm.simulate('submit', { preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);
    expect(handleAuthUser.mock.calls.length).toBe(0);
  });

  it('should call handleAuthUser when enter key is pressed', () => {
    const passwordInput = wrapper.find('[name="password"]');
    passwordInput.simulate('keypress', { which: 13, preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);
    expect(handleAuthUser.mock.calls.length).toBe(1);
  });

  it('should not call handleAuthUser when another key is pressed', () => {
    const passwordInput = wrapper.find('[name="password"]');
    passwordInput.simulate('keypress', { which: 20, preventDefault });
    expect(preventDefault.mock.calls.length).toBe(0);
    expect(handleAuthUser.mock.calls.length).toBe(0);
  });

  it('should call removeAuthUserError when a field is updated', () => {
    const passwordInput = wrapper.find('[name="password"]');
    passwordInput.simulate('change', {
      target: { value: 'a', name: 'password' },
    });
    expect(removeAuthUserError.mock.calls.length).toBe(1);
  });
});

describe('input field changes should update state', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should update state when username is changed', () => {
    const username = 'test';
    const usernameInput = wrapper.find('[name="username"]');
    usernameInput.simulate('change', {
      target: { name: 'username', value: username },
    });
    expect(wrapper.state().username).toBe(username);
  });
});

describe('connect', () => {
  it('should connect to the store with the correct props', () => {
    const initialState = {
      authUser: {
        processing: false,
        error: 'Uh oh..',
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <ConnectedLogin />
        </Provider>
      </Router>
    );
    const componentProps = wrapper.find(Login).props();
    expect(componentProps.authUserProcessing).toBeDefined();
    expect(componentProps.authUserError).toBeDefined();
    expect(componentProps.removeAuthUserError).toBeInstanceOf(Function);
    expect(componentProps.handleAuthUser).toBeInstanceOf(Function);
  });
});
