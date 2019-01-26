import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Message, Segment, List, Header } from 'semantic-ui-react';
import history from '../../history';
import ConnectedUserLists, { UserLists } from './UserLists';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  loading: false,
  error: null,
  username: 'MrUser',
  lists: [
    { id: 'abc', name: 'Test List', description: 'This is a list' },
    { id: 'efg', name: 'Another List', description: null },
  ],
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<UserLists {...propsPassed} />);
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

  it('should render a Header and List if not loading or in error', () => {
    const wrapper = setup();
    const header = wrapper.find(Header);
    expect(header.length).toBe(1);
    expect(header.props().content).toBe('Lists by @' + defaultProps.username);
    const list = wrapper.find(List);
    const listItems = list.find(List.Item);
    expect(listItems.length).toBe(defaultProps.lists.length);
  });
});

describe('componentDidMount', () => {
  it('should call handleGetUserLists', () => {
    const handleGetUserLists = jest.fn();
    const wrapper = setup({ handleGetUserLists });
    wrapper.instance().componentDidMount();
    expect(handleGetUserLists.mock.calls.length).toBe(1);
    expect(handleGetUserLists.mock.calls[0][0]).toBe(defaultProps.username);
  });
});

describe('connect', () => {
  it('should have access to the correct props', () => {
    const initialState = {
      users: {
        getUserLists: {
          loading: false,
          error: null,
        },
        userLists: {
          username: 'testuser',
          lists: defaultProps.lists,
        },
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <ConnectedUserLists username='testuser' />
        </Provider>
      </Router>
    );
    const componentProps = wrapper.find(UserLists).props();
    expect(componentProps.username).toBeDefined();
    expect(componentProps.loading).toBeDefined();
    expect(componentProps.error).toBeDefined();
    expect(componentProps.lists).toBeDefined();
    expect(componentProps.handleGetUserLists).toBeInstanceOf(Function);
  });
});
