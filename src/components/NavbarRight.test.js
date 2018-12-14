import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import { NavbarRight } from './NavbarRight';

const setup = (props = {}) => {
    const wrapper = shallow(<NavbarRight {...props} />);
    return wrapper;
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
        const menu = wrapper.find(Menu.Menu);
        expect(menu.length).toBe(1);
    });
});