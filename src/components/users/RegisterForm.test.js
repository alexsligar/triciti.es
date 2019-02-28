import React from 'react';
import { shallow, mount } from 'enzyme';
import { Form, FormButton, Dimmer, Message, Label } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import ConnectedRegisterForm, { RegisterForm } from './RegisterForm';
import { storeFactory } from '../../../test/testUtils';

const setup = (props = {}) => {
  const wrapper = shallow(<RegisterForm {...props} />);
  return wrapper;
};

describe('render', () => {
  describe('without registerUserError or registerUserProcessing', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        registerUserProcessing: false,
        registerUserError: null,
        handleRegisterUser: () => {},
      };
      wrapper = setup(props);
    });

    it('should render component without error', () => {
      const form = wrapper.find(Form);
      expect(form.length).toBe(1);
      const formButton = wrapper.find(FormButton);
      expect(formButton.children().text()).toBe('Submit');
    });

    it('should show field errors when appropriate', () => {
      const usernameInput = wrapper.find('[name="username"]');
      usernameInput.simulate('change', {
        target: { name: 'username', value: 'a' },
      });
      const label = wrapper.find(Label);
      expect(label.dive().text()).toBe(wrapper.state().fieldErrors.username);
    });
  });

  describe('with registerUserProcessing', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        registerUserProcessing: true,
        registerUserError: null,
        handleRegisterUser: () => {},
      };
      wrapper = setup(props);
    });

    it('should render without error', () => {
      const dimmer = wrapper.find(Dimmer);
      expect(dimmer.prop('active')).toBe(true);
    });
  });

  describe('with registerUserError', () => {
    const error = 'Username taken.';
    let wrapper;
    beforeEach(() => {
      const props = {
        registerUserProcessing: false,
        registerUserError: error,
        handleRegisterUser: () => {},
      };
      wrapper = setup(props);
    });

    it('should render without error', () => {
      const message = wrapper.find(Message).first();
      expect(message.prop('content')).toBe(error);
    });
  });

  it('should show error Labels for each field when in error', () => {
    const props = {
      registerUserProcessing: false,
      registerUserError: null,
      handleRegisterUser: () => {},
    };
    const wrapper = setup(props);
    wrapper.setState({
      fieldErrors: {
        name: 'a',
        username: 'a',
        email: 'a',
        bio: 'a',
        password: 'a',
        passwordConfirmation: 'a',
      },
    });
    const labels = wrapper.find('Label[basic]');
    expect(labels.length).toBe(6);
  });
});

describe('form submit', () => {
  const handleRegisterUser = jest.fn();
  const preventDefault = jest.fn();
  const props = {
    registerUserError: null,
    registerUserProcessing: false,
    handleRegisterUser,
  };
  let wrapper;
  beforeEach(() => {
    handleRegisterUser.mockReset();
    preventDefault.mockReset();
    wrapper = shallow(<RegisterForm {...props} />);
  });

  it('should call handleRegisterUser when valid form is submitted', () => {
    wrapper.setState({
      fields: {
        name: 'Test',
        username: 'test',
        email: 'test@gmail.com',
        password: 'Hapi123$',
        passwordConfirmation: 'Hapi123$',
        bio: 'React',
      },
    });
    const form = wrapper.find(Form);
    form.simulate('submit', { preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);
    expect(handleRegisterUser.mock.calls.length).toBe(1);
  });

  it('should not call handleRegisterUser when the form is invalid', () => {
    const form = wrapper.find(Form);
    form.simulate('submit', { preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);
    expect(handleRegisterUser.mock.calls.length).toBe(0);
  });
});

describe('input field changes should update state', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      registerUserProcessing: false,
      registerUserError: null,
      handleRegisterUser: () => {},
    };
    wrapper = setup(props);
  });

  it('should update state when username is changed', () => {
    const username = 'test';
    const usernameInput = wrapper.find('[name="username"]');
    usernameInput.simulate('change', {
      target: { name: 'username', value: username },
    });
    expect(wrapper.state().fields.username).toBe(username);
  });
});

describe('connect', () => {
  it('should connect to the store with the correct props', () => {
    const initialState = {
      registerUser: {
        error: 'Uh oh...',
        processing: false,
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRegisterForm />
      </Provider>
    );
    const registerFormProps = wrapper.find(RegisterForm).props();
    expect(registerFormProps.registerUserError).toBe('Uh oh...');
    expect(registerFormProps.registerUserProcessing).toBe(false);
    expect(registerFormProps.handleRegisterUser).toBeInstanceOf(Function);
  });
});
