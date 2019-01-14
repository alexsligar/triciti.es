import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import ConnectedRoutes, { Routes } from './Routes';
import { storeFactory } from '../../test/testUtils';
import history from '../history';

const defaultProps = {
  authedUser: { id: '1', username: '1abc' },
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  const wrapper = shallow(<Routes {...propsPassed} />);
  return wrapper;
};

describe('render', () => {
  it('should render correct routes without authedUser', () => {
    const wrapper = setup({ authedUser: null });
    const switchComp = wrapper.find(Switch);
    expect(switchComp.length).toBe(1);
    const homeRoute = wrapper.find('Route[path="/"]');
    expect(homeRoute.length).toBe(1);
  });

  it('should render correct routes with authedUser', () => {
    const wrapper = setup();
    const switchComp = wrapper.find(Switch);
    expect(switchComp.length).toBe(1);
    const homeRoute = wrapper.find('Route[path="/"]');
    expect(homeRoute.length).toBe(1);
  });
});

describe('connect', () => {
  it('should connect to the store with the correct props', () => {
    const authedUser = { id: '1', username: 'test' };
    const initialState = {
      authedUser,
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <ConnectedRoutes />
        </Provider>
      </Router>
    );
    const componentProps = wrapper.find(Routes).props();
    expect(componentProps.authedUser).toEqual(authedUser);
  });
});

describe('redirect routes', () => {
  it('should redirect for certain routes when authedUser is present', () => {
    const authedUser = { id: '1', username: 'test' };
    const initialState = {
      authedUser,
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <ConnectedRoutes />
        </Provider>
      </Router>
    );
    wrapper.instance().props.history.push('/test');
    expect(wrapper.instance().props.history.location.pathname).toBe('/test');
    wrapper.instance().props.history.push('/login');
    expect(wrapper.instance().props.history.location.pathname).toBe('/');
    wrapper.instance().props.history.push('/register');
    expect(wrapper.instance().props.history.location.pathname).toBe('/');
  });
});
