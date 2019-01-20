import React from 'react';
import { shallow } from 'enzyme';
import { Dimmer, Loader } from 'semantic-ui-react';
import Loading from './Loading';

describe('render', () => {
  it('should render a Dimmer and Loader', () => {
    const wrapper = shallow(<Loading />);
    const dimmer = wrapper.find(Dimmer);
    expect(dimmer.length).toBe(1);
    const loader = wrapper.find(Loader);
    expect(loader.length).toBe(1);
  });
});
