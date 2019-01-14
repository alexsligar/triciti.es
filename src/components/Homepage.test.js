import React from 'react';
import { shallow } from 'enzyme';
import { Container } from 'semantic-ui-react';
import { Homepage } from './Homepage';

const setup = (props = {}) => {
  const wrapper = shallow(<Homepage {...props} />);
  return wrapper;
};

describe('render', () => {
  it('should render component without error', () => {
    const wrapper = setup();
    const container = wrapper.find(Container);
    expect(container.length).toBe(1);
  });
});
