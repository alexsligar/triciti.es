import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import { Navbar } from './Navbar';
import NavbarRight from './NavbarRight';
import NavbarRightAuthed from './NavbarRightAuthed';

const setup = (props = {}) => {
    const wrapper = shallow(<Navbar {...props} />);
    return wrapper;
}

describe('render', () => {

    it('should render correct child components when no authedUser', () => {

        const props = { authedUser: null };
        const wrapper = setup(props);
        const menu = wrapper.find(Menu);
        expect(menu.length).toBe(1);
        const navbarRight = wrapper.find(NavbarRight);
        expect(navbarRight.length).toBe(1);
        const navbarRightAuthed = wrapper.find(NavbarRightAuthed);
        expect(navbarRightAuthed.length).toBe(0);
    });

    it('should render correct child components when authedUser', () => {

        const props = { authedUser: 'test' };
        const wrapper = setup(props);
        const menu = wrapper.find(Menu);
        expect(menu.length).toBe(1);
        const navbarRight = wrapper.find(NavbarRight);
        expect(navbarRight.length).toBe(0);
        const navbarRightAuthed = wrapper.find(NavbarRightAuthed);
        expect(navbarRightAuthed.length).toBe(1);
    });
});