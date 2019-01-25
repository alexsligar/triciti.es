import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';

const defaultProps = {
  match: {
    params: {
      username: 'testuser',
    },
  },
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<Profile {...propsPassed} />);
};

describe('render', () => {
  it('should render the correct child components', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
  });
});
