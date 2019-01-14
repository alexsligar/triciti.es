import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import history from '../history';
import ConnectedNavbar, { Navbar } from './Navbar';
import TagSearch from './tags/TagSearch';
import NavbarRight from './NavbarRight';
import NavbarRightAuthed from './NavbarRightAuthed';
import { storeFactory } from '../../test/testUtils';

const defaultProps = {
  authedUser: null,
  location: {
    pathname: '/',
  },
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  const wrapper = shallow(<Navbar {...propsPassed} />);
  return wrapper;
};

describe('render', () => {
  it('should render correct child components when no authedUser', () => {
    const wrapper = setup();
    const menu = wrapper.find(Menu);
    expect(menu.length).toBe(1);
    const navbarRight = wrapper.find(NavbarRight);
    expect(navbarRight.length).toBe(1);
    const navbarRightAuthed = wrapper.find(NavbarRightAuthed);
    expect(navbarRightAuthed.length).toBe(0);
  });

  it('should render correct child components when authedUser', () => {
    const props = { authedUser: { id: '1', username: 'test' } };
    const wrapper = setup(props);
    const menu = wrapper.find(Menu);
    expect(menu.length).toBe(1);
    const navbarRight = wrapper.find(NavbarRight);
    expect(navbarRight.length).toBe(0);
    const navbarRightAuthed = wrapper.find(NavbarRightAuthed);
    expect(navbarRightAuthed.length).toBe(1);
  });

  it('should not render the TagSearch when pathname is /tags(/:tag)', () => {
    const props = { location: { pathname: '/tags' } };
    const wrapper = setup(props);
    const tagSearch = wrapper.find(TagSearch);
    expect(tagSearch.length).toBe(0);
  });

  it('should render the TagSearch when pathname is not /tags(/:tag)', () => {
    const props = { location: { pathname: '/login' } };
    const wrapper = setup(props);
    const tagSearch = wrapper.find(TagSearch);
    expect(tagSearch.length).toBe(1);
  });
});

describe('connect', () => {
  it('should connect to the store with the correct props', () => {
    const authedUser = { id: '1', username: '1abc' };
    const initialState = {
      authedUser,
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <ConnectedNavbar />
        </Provider>
      </Router>
    );
    const componentProps = wrapper.find(Navbar).props();
    expect(componentProps.authedUser).toBe(authedUser);
    expect(componentProps.location.pathname).toBeDefined();
  });
});
