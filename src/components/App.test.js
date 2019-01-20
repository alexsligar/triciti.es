import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Navbar from './Navbar';
import Routes from './Routes';

const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

describe('render', () => {
  it('should render correct components', () => {
    const wrapper = setup();
    const navbar = wrapper.find(Navbar);
    expect(navbar.length).toBe(1);
    const routes = wrapper.find(Routes);
    expect(routes.length).toBe(1);
  });
});
