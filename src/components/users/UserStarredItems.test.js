import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Segment, Message } from 'semantic-ui-react';
import history from '../../history';
import ConnectedUserStarredItems, {
  UserStarredItems,
} from './UserStarredItems';
import ItemCard from '../items/ItemCard';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  loading: false,
  error: null,
  items: [{ id: 'abc', name: 'Test Item', location: 'America', type: 'Place' }],
  authedUser: {
    username: 'testuser',
  },
  handleGetUserStarredItems: () => {},
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<UserStarredItems {...propsPassed} />);
};

describe('render', () => {
  it('should render a loading segment if props loading is true', () => {
    const wrapper = setup({ loading: true });
    const segment = wrapper.find(Segment);
    expect(segment.length).toBe(1);
    expect(segment.props().loading).toBe(true);
  });

  it('should render a Message with the error prop when error is nt null', () => {
    const wrapper = setup({ error: 'Uh oh' });
    const message = wrapper.find(Message);
    expect(message.length).toBe(1);
    expect(message.props().error).toBe(true);
    expect(message.props().content).toBe('Uh oh');
  });

  it('should render an ItemCard for each item if not loading or error', () => {
    const wrapper = setup();
    const itemCard = wrapper.find(ItemCard);
    expect(itemCard.length).toBe(defaultProps.items.length);
  });
});

describe('componentDidMount', () => {
  it('should call handleGetUserStarredItems with the authedUser', () => {
    const handleGetUserStarredItems = jest.fn();
    const wrapper = setup({ handleGetUserStarredItems });
    wrapper.instance().componentDidMount();
    expect(handleGetUserStarredItems.mock.calls.length).toBe(1);
    expect(handleGetUserStarredItems.mock.calls[0][0]).toBe(
      defaultProps.authedUser.username
    );
  });
});

describe('connect', () => {
  it('should have access to the correct props', () => {
    const initialState = {
      users: {
        getUserStarredItems: {
          loading: false,
          error: null,
        },
        userStarredItems: {
          username: 'testuser',
          items: defaultProps.items,
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
      <Router history={history}>
        <Provider store={store}>
          <ConnectedUserStarredItems />
        </Provider>
      </Router>
    );
    const componentProps = wrapper.find(UserStarredItems).props();
    expect(componentProps.loading).toBeDefined();
    expect(componentProps.error).toBeDefined();
    expect(componentProps.items).toBeDefined();
    expect(componentProps.authedUser).toBeDefined();
    expect(componentProps.handleGetUserStarredItems).toBeInstanceOf(Function);
  });
});
