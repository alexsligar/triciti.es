import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../../history';
import { storeFactory } from '../../../test/testUtils';
import Routes from './Routes';

describe('userIsAuthenticated routes', () => {
  it('should redirect for certain routes', () => {
    const authedUser = { user: { id: '1', username: 'test', role: 'user' } };
    const initialState = {
      authedUser,
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    );
    wrapper.instance().props.history.push('/tags');
    expect(wrapper.instance().props.history.location.pathname).toBe('/tags');
    wrapper.instance().props.history.push('/login');
    expect(wrapper.instance().props.history.location.pathname).toBe('/');
    wrapper.instance().props.history.push('/register');
    expect(wrapper.instance().props.history.location.pathname).toBe('/');
  });
});
