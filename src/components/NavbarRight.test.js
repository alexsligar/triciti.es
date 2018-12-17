import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import { NavbarRight } from './NavbarRight';

const setup = (props = {}) => {
    const wrapper = shallow(<NavbarRight {...props} />);
    return wrapper;
}

describe('render', () => {

    describe('when path is /register', () => {

        it('should not render a register link', () => {

            const props = {
                location: {
                    pathname: '/register',
                },
            }
            const wrapper = setup(props);
            const menu = wrapper.find(Menu.Menu);
            expect(menu.length).toBe(1);
            const registerLink = wrapper.find('Link[to="/register"]');
            expect(registerLink.length).toBe(0);
            
        });
    });

    
});