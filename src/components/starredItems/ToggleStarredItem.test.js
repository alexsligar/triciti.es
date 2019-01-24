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
  starred: false,
  loading: false,
  error: null,
  handleAddStarredItem: () => {},
  handleRemoveStarredItem: () => {},
  handleGetUserStarredItems: () => {},
};

const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<ToggleStarredItem {...propsPassed} />);
};

describe('render', () => {
  it('should render a loading button when loading is true', () => {
    const wrapper = setup({ loading: true });
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.props().loading).toBe(true);
  });

  it('should render a error button when error is not null', () => {
    const wrapper = setup({ error: 'Uh oh' });
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.dive().text()).toBe('Uh oh');
  });

  it('should render a star Icon if loaded and not in error', () => {
    const wrapper = setup();
    const icon = wrapper.find(Icon);
    expect(icon.length).toBe(1);
    expect(icon.props().name).toBe('star');
  });

  it('should render a yellow star Icon if starred is true', () => {
    const wrapper = setup({ starred: true });
    const icon = wrapper.find(Icon);
    expect(icon.length).toBe(1);
    expect(icon.props().name).toBe('star');
    expect(icon.props().color).toBe('yellow');
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
    expect(componentProps.loading).toBeDefined();
    expect(componentProps.error).toBeDefined();
    expect(componentProps.starred).toBeDefined();
    expect(componentProps.handleAddStarredItem).toBeInstanceOf(Function);
    expect(componentProps.handleRemoveStarredItem).toBeInstanceOf(Function);
    expect(componentProps.handleGetUserStarredItems).toBeInstanceOf(Function);
  });
});
