import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import history from '../history';
import ConnectedNavbar, { Navbar } from './Navbar';
import NavbarRight from './NavbarRight';
import NavbarRightAuthed from './NavbarRightAuthed';
import { storeFactory } from '../../test/testUtils';

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

describe('connect', () => {

    it('should connect to the store with the correct props', () => {

        const initialState = {
            authedUser: '1abc',
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Router history={history}><Provider store={store}><ConnectedNavbar /></Provider></Router>);
        const componentProps = wrapper.find(Navbar).props();
        expect(componentProps.authedUser).toBe('1abc');
    });
});
