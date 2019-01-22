import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Header } from 'semantic-ui-react';
import ConnectedAddListItem, { AddListItem } from './AddListItem';
import { storeFactory } from '../../../test/testUtils';
import AddListItemModal from './AddListItemModal';

const defaultProps = {
  authedUser: 'testuser',
  userListsLoading: false,
  userListsError: null,
  userLists: {
    username: 'testuser',
    lists: [{ id: 'abcd', name: 'Test List', items: [] }],
  },
  handleGetUserLists: () => {},
  showNewListModal: () => {},
  item: {
    id: 'efg',
    list_number: 1,
  },
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<AddListItem {...propsPassed} />);
};

describe('render', () => {
  it('should render a loading Segment when userListsLoading prop is true', () => {
    const wrapper = setup({ userListsLoading: true });
    const loadingSegment = wrapper.find('Segment[loading=true]');
    expect(loadingSegment.length).toBe(1);
  });

  it('should render a loading Segment when userLists doesnt match authedUser', () => {
    const wrapper = setup({ authedUser: 'bob' });
    const loadingSegment = wrapper.find('Segment[loading=true]');
    expect(loadingSegment.length).toBe(1);
  });

  it('should render an error Message when userListsError is not null', () => {
    const wrapper = setup({ userListsError: 'Uh oh' });
    const message = wrapper.find('Message[error]');
    expect(message.length).toBe(1);
    expect(message.props().content).toBe('Uh oh');
  });

  it('should render a Segment if the user doesnt have any lists', () => {
    const wrapper = setup({ userLists: { username: 'testuser', lists: [] } });
    const header = wrapper.find(Header);
    expect(header.dive().text()).toBe(
      "<Icon />You don't have any lists to add this item to."
    );
  });

  it('should render an AddListItemModal if the authedUser has lists', () => {
    const wrapper = setup();
    const addListItemModal = wrapper.find(AddListItemModal);
    expect(addListItemModal.length).toBe(1);
    expect(addListItemModal.props().item).toBe(defaultProps.item);
  });
});

describe('componentDidMount', () => {
  it('should call handleGetUserLists with correct username', () => {
    const handleGetUserLists = jest.fn();
    const wrapper = setup({ handleGetUserLists });
    wrapper.instance().componentDidMount();
    expect(handleGetUserLists.mock.calls.length).toBe(1);
    expect(handleGetUserLists.mock.calls[0][0]).toBe(defaultProps.authedUser);
  });
});

describe('connect', () => {
  it('should have access to the correct props via connect', () => {
    const initialState = {
      authedUser: {
        user: {
          username: 'testuser',
        },
      },
      users: {
        getUserLists: {
          loading: false,
          error: null,
        },
        userLists: {
          username: 'testuser',
          lists: [{ id: 'xyz', name: 'Test List', items: ['def'] }],
        },
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedAddListItem item={defaultProps.item} />
      </Provider>
    );
    const componentProps = wrapper.find(AddListItem).props();
    expect(componentProps.authedUser).toBeDefined();
    expect(componentProps.userListsLoading).toBeDefined();
    expect(componentProps.userListsError).toBeDefined();
    expect(componentProps.userLists).toBeDefined();
    expect(componentProps.handleGetUserLists).toBeInstanceOf(Function);
    expect(componentProps.showNewListModal).toBeInstanceOf(Function);
    expect(componentProps.item).toBeDefined();
  });
});
