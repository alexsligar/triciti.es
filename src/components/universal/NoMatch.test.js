import React from 'react';
import { shallow } from 'enzyme';
import { Header } from 'semantic-ui-react';
import NoMatch from './NoMatch';

describe('render', () => {
  it('should render without error', () => {
    const wrapper = shallow(<NoMatch />);
    const header = wrapper.find(Header);
    expect(header.length).toBe(1);
  });
});
