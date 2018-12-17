import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './Login';

const setup = (props = {}) => {
    const wrapper = shallow(<Login {...props} />);
    return wrapper;
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
    });
});