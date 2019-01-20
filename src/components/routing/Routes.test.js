import React from 'react';
import { shallow } from 'enzyme';
import { Switch } from 'react-router-dom';
import Routes from './Routes';

const setup = (props = {}) => {
  const wrapper = shallow(<Routes {...props} />);
  return wrapper;
};

describe('render', () => {
  it('should render switch and routes', () => {
    const wrapper = setup();
    const switchComp = wrapper.find(Switch);
    expect(switchComp.length).toBe(1);
    const homeRoute = wrapper.find('Route[path="/"]');
    expect(homeRoute.length).toBe(1);
  });
});
