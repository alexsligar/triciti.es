import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import ConnectedToggleStarredItem, {
  ToggleStarredItem,
} from './ToggleStarredItem';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  authedUser: {
    username: 'testuser',
  },
  item: {
    id: 'abcd',
    starred_number: 3,
  },
  userStarredItems: {
    username: 'testuser',
    items: [],
  },
  userStarredItemsLoading: false,
  userStarredItemsError: null,
  handleAddStarredItem: () => {},
  handleRemoveStarredItem: () => {},
  handleGetUserStarredItems: () => {},
};

const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<ToggleStarredItem {...propsPassed} />);
};

describe('render', () => {
  it('should render a loading button when userStarredItemsLoading is true', () => {
    const wrapper = setup({ userStarredItemsLoading: true });
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().loading).toBe(true);
  });

  it('should render a loading button when userStarredItems.username is undefined', () => {
    const wrapper = setup({ userStarredItems: { username: null } });
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().loading).toBe(true);
  });

  it('should render a loading button when userStarredItems.username doesnt match', () => {
    const wrapper = setup({ userStarredItems: { username: 'otheruser' } });
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().loading).toBe(true);
  });

  it('should render a error button when userStarredItemsError is not null', () => {
    const wrapper = setup({ userStarredItemsError: 'Uh oh' });
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.dive().text()).toBe('Uh oh');
  });

  it('should render a star Icon if loaded and not in error', () => {
    const wrapper = setup({
      userStarredItems: { username: 'testuser', items: [{ id: 'abcd' }] },
    });
    const icon = wrapper.find(Icon);
    expect(icon.length).toBe(1);
    expect(icon.props().name).toBe('star');
  });

  it('should call handleStarClick when the button is clicked', () => {
    const wrapper = setup();
    const button = wrapper.find(Button).first();
    const spy = jest.fn();
    wrapper.instance().handleStarClick = spy;
    button.simulate('click');
    expect(spy.mock.calls.length).toBe(1);
  });
});

describe('componentDidMount', () => {
  it('should call handleGetUserStarredItems', () => {
    const handleGetUserStarredItems = jest.fn();
    const wrapper = setup({ handleGetUserStarredItems });
    wrapper.instance().componentDidMount();
    expect(handleGetUserStarredItems.mock.calls.length).toBe(1);
    expect(handleGetUserStarredItems.mock.calls[0][0]).toBe(
      defaultProps.authedUser.username
    );
  });
});

describe('handleStarClick', () => {
  it('should call handleRemoveStarredItem when starred is true', () => {
    const handleRemoveStarredItem = jest.fn();
    const wrapper = setup({ handleRemoveStarredItem });
    wrapper.instance().handleStarClick(true);
    expect(handleRemoveStarredItem.mock.calls.length).toBe(1);
    expect(handleRemoveStarredItem.mock.calls[0][0]).toBe(defaultProps.item);
  });

  it('should call handleAddStarredItem when starred is false', () => {
    const handleAddStarredItem = jest.fn();
    const wrapper = setup({ handleAddStarredItem });
    wrapper.instance().handleStarClick(false);
    expect(handleAddStarredItem.mock.calls.length).toBe(1);
    expect(handleAddStarredItem.mock.calls[0][0]).toBe(defaultProps.item);
  });
});

describe('connect', () => {
  it('should have access to needed props', () => {
    const initialState = {
      authedUser: {
        user: { id: 'abcd', username: 'testuser' },
      },
      users: {
        getUserStarredItems: {
          loading: false,
          error: null,
        },
        userStarredItems: {
          username: null,
          items: [],
        },
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedToggleStarredItem item={defaultProps.item} />
      </Provider>
    );
    const componentProps = wrapper.find(ToggleStarredItem).props();
    expect(componentProps.item).toBeDefined();
    expect(componentProps.authedUser).toBeDefined();
    expect(componentProps.userStarredItems).toBeDefined();
    expect(componentProps.userStarredItemsLoading).toBeDefined();
    expect(componentProps.userStarredItemsError).toBeDefined();
    expect(componentProps.handleAddStarredItem).toBeInstanceOf(Function);
    expect(componentProps.handleRemoveStarredItem).toBeInstanceOf(Function);
    expect(componentProps.handleGetUserStarredItems).toBeInstanceOf(Function);
  });
});
