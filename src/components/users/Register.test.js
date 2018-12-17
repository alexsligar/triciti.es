import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';
import RegisterForm from './RegisterForm';

const setup = (props = {}) => {
    const wrapper = shallow(<Register {...props} />);
    return wrapper;
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
        const registerForm = wrapper.find(RegisterForm);
        expect(registerForm.length).toBe(1);
    });
});