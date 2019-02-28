import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import ConnectedUserProfileForm, { UserProfileForm } from './UserProfileForm';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  processing: false,
  error: null,
  authedUser: {
    username: 'testuser',
    name: 'Fred Tacos',
    email: 'fred@example.com',
    bio: 'Only a man',
  },
  handleUpdateUser: () => {},
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<UserProfileForm {...propsPassed} />);
};

describe('render', () => {
  it('should render a form when there isnt an error or loading', () => {
    const wrapper = setup();
    const form = wrapper.find(Form);
    expect(form.length).toBe(1);
  });
  it('should render a loading spinner when the form is loading', () => {
    const wrapper = setup({ processing: true });
    const form = wrapper.find(Form);
    expect(form.props().loading).toBe(true);
  });

  it('should render an error message when props error is not null', () => {
    const wrapper = setup({ error: 'Uh oh' });
    const message = wrapper.find(Message);
    expect(message.length).toBe(1);
    expect(message.props().content).toBe('Uh oh');
  });

  it('should render a success message when the profile updates', () => {
    const wrapper = setup();
    wrapper.setState({ updateSuccess: true });
    const message = wrapper.find(Message);
    expect(message.length).toBe(1);
    expect(message.props().success).toBe(true);
    expect(message.props().content).toBe('Profile successfully updated.');
  });

  it('should show error Labels for each field when in error', () => {
    const wrapper = setup();
    wrapper.setState({
      fieldErrors: { name: 'a', username: 'a', email: 'a', bio: 'a' },
    });
    const labels = wrapper.find('Label[basic]');
    expect(labels.length).toBe(4);
  });
});

describe('checkProfileSame', () => {
  it('should return true if the form is same as authedUser prop', () => {
    const wrapper = setup();
    const result = wrapper.instance().checkProfileSame();
    expect(result).toBe(true);
  });

  it('should return false if the form is different', () => {
    const wrapper = setup();
    wrapper.setState({ fields: { username: 'different' } });
    const result = wrapper.instance().checkProfileSame();
    expect(result).toBe(false);
  });
});

describe('componentDidUpdate', () => {
  it('should set updateSuccess to true if successfully updated', () => {
    const wrapper = setup();
    expect(wrapper.state().updateSuccess).toBe(false);
    wrapper.instance().componentDidUpdate({ processing: true });
    expect(wrapper.state().updateSuccess).toBe(true);
  });

  it('should not set updateSuccess if an error is present', () => {
    const wrapper = setup({ error: 'Uh oh' });
    expect(wrapper.state().updateSuccess).toBe(false);
    wrapper.instance().componentDidUpdate({ processing: true });
    expect(wrapper.state().updateSuccess).toBe(false);
  });
});

describe('handleInputChange', () => {
  it('should set the state of fields, fieldErrors, and formErrors', () => {
    const wrapper = setup();
    wrapper
      .instance()
      .handleInputChange({ target: { name: 'name', value: 'b' } });
    expect(wrapper.state().fields.name).toBe('b');
    expect(wrapper.state().formErrors).toBe(true);
    expect(wrapper.state().fieldErrors.name).not.toBeNull();
  });

  it('should not have formErrors if the form is valid', () => {
    const wrapper = setup();
    wrapper
      .instance()
      .handleInputChange({ target: { name: 'name', value: 'Valid Name' } });
    expect(wrapper.state().formErrors).toBe(false);
  });
});

describe('handleSubmit', () => {
  it('should not call handleUpdateUser if validation fails', () => {
    const handleUpdateUser = jest.fn();
    const wrapper = setup({ handleUpdateUser });
    wrapper.setState({ fields: { name: 'a' } });
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(handleUpdateUser.mock.calls.length).toBe(0);
  });

  it('should call handleUpdateUser if validation passes', () => {
    const handleUpdateUser = jest.fn();
    const wrapper = setup({ handleUpdateUser });
    wrapper.instance().validate = jest.fn().mockReturnValueOnce(false);
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(handleUpdateUser.mock.calls.length).toBe(1);
    expect(handleUpdateUser.mock.calls[0][0]).toEqual(wrapper.state().fields);
    expect(handleUpdateUser.mock.calls[0][1]).toEqual(
      defaultProps.authedUser.username
    );
  });
});

describe('connect', () => {
  it('should have access to the correct props via connect', () => {
    const initialState = {
      users: {
        updateUser: {
          processing: false,
          error: null,
        },
      },
      authedUser: {
        user: {
          username: 'testuser',
        },
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedUserProfileForm />
      </Provider>
    );
    const componentProps = wrapper.find(UserProfileForm).props();
    expect(componentProps.processing).toBeDefined();
    expect(componentProps.error).toBeDefined();
    expect(componentProps.authedUser).toBeDefined();
    expect(componentProps.handleUpdateUser).toBeInstanceOf(Function);
  });
});
