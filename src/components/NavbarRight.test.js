import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import { NavbarRight } from './NavbarRight';

const setup = (props = {}) => {
    const wrapper = shallow(<NavbarRight {...props} />);
    return wrapper;
}

describe('render', () => {

    describe('when not logged in', () => {

        it('should render the correct links when not at /login or /register', () => {

            const props = {
                location: {
                    pathname: '/',
                },
            }
            const wrapper = setup(props);
            const menu = wrapper.find(Menu.Menu);
            expect(menu.length).toBe(1);
            const registerLink = wrapper.find('Link[to="/register"]');
            expect(registerLink.length).toBe(1);
            const loginLink = wrapper.find('Link[to="/login"]');
            expect(loginLink.length).toBe(1);
        });

        it('should not render a register link when at /register', () => {

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

        it('should not render a register link when at /login', () => {

            const props = {
                location: {
                    pathname: '/login',
                },
            }
            const wrapper = setup(props);
            const menu = wrapper.find(Menu.Menu);
            expect(menu.length).toBe(1);
            const registerLink = wrapper.find('Link[to="/login"]');
            expect(registerLink.length).toBe(0);
            
        });
    });

    
});