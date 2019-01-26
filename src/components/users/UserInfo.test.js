import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Segment, Message, Header } from 'semantic-ui-react';
import ConnectedUserInfo, { UserInfo } from './UserInfo';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  username: 'testuser',
  loading: false,
  error: null,
  user: {
    username: 'testuser',
    name: 'John Dude',
    bio: 'This is me',
  },
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<UserInfo {...propsPassed} />);
};

describe('render', () => {
  it('should render a loading Segment when loading prop is true', () => {
    const wrapper = setup({ loading: true });
    const segment = wrapper.find(Segment);
    expect(segment.length).toBe(1);
    expect(segment.props().loading).toBe(true);
  });

  it('should render an error Message when error is not null', () => {
    const wrapper = setup({ error: 'Uh oh' });
    const message = wrapper.find(Message);
    expect(message.length).toBe(1);
    expect(message.props().content).toBe('Uh oh');
  });

  it('should render a Header with username if not loading or in error', () => {
    const wrapper = setup();
    const header = wrapper.find(Header);
    expect(header.length).toBe(1);
    expect(header.props().content).toBe('@' + defaultProps.user.username);
  });
});

describe('componentDidMount', () => {
  it('should call handleGetUser', () => {
    const handleGetUser = jest.fn();
    const wrapper = setup({ handleGetUser });
    wrapper.instance().componentDidMount();
    expect(handleGetUser.mock.calls.length).toBe(1);
    expect(handleGetUser.mock.calls[0][0]).toBe(defaultProps.username);
  });
});

describe('connect', () => {
  it('should have access to the correct props', () => {
    const initialState = {
      users: {
        getUser: {
          loading: false,
          error: null,
        },
        user: {
          username: 'testuser',
          name: 'John Dude',
          bio: 'This is a bio',
        },
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedUserInfo username='testuser' />
      </Provider>
    );
    const componentProps = wrapper.find(UserInfo).props();
    expect(componentProps.username).toBeDefined();
    expect(componentProps.loading).toBeDefined();
    expect(componentProps.error).toBeDefined();
    expect(componentProps.user).toBeDefined();
    expect(componentProps.handleGetUser).toBeInstanceOf(Function);
  });
});
