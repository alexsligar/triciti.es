import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../../history';
import { storeFactory } from '../../../test/testUtils';
import Routes from './Routes';

describe('userIsNotAuthenticated routes', () => {
  it('should redirect for certain routes', () => {
    const store = storeFactory({});
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    );
    wrapper.instance().props.history.push('/login');
    expect(wrapper.instance().props.history.location.pathname).toBe('/login');
    wrapper.instance().props.history.push('/items/add');
    expect(wrapper.instance().props.history.location.pathname).toBe('/login');
    wrapper.instance().props.history.push('/items/sdfd/edit');
    expect(wrapper.instance().props.history.location.pathname).toBe('/login');
  });
});
