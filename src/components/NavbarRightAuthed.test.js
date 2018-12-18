import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../history';
import { Menu } from 'semantic-ui-react';
import ConnectedNavbarRightAuthed, { NavbarRightAuthed } from './NavbarRightAuthed';
import { storeFactory } from '../../test/testUtils';

const defaultProps = {
    authedUser: '1abc',
    handleLogoutUser: () => {},
}
const setup = (props = {...defaultProps}) => {
    const wrapper = shallow(<NavbarRightAuthed {...props} />);
    return wrapper;
}

describe('render', () => {

    it('should render the correct links', () => {

        const wrapper = setup();
        const menu = wrapper.find(Menu.Menu);
        expect(menu.length).toBe(1);
        const itemsAddLink = wrapper.find('Link[to="/items/add"]');
        expect(itemsAddLink.length).toBe(1);
        const listAddLink = wrapper.find('Link[to="/lists/add"]');
        expect(listAddLink.length).toBe(1);
        const settingsLink = wrapper.find('Link[to="/settings"]');
        expect(settingsLink.length).toBe(1);
        const profileLink = wrapper.find('Link[to="/users/1abc"]');
        expect(profileLink.length).toBe(1);
    });
});

describe('logout click', () => {

    it('should call handleLogoutUser when logout button is clicked', () => {

        const handleLogoutUser = jest.fn();
        const props = {
            authedUser: '1abc',
            handleLogoutUser,
        }
        const wrapper = setup(props);
        const logoutButton = wrapper.find('Button');
        logoutButton.simulate('click');
        expect(handleLogoutUser.mock.calls.length).toBe(1);
    });
});

describe('connect', () => {

    it('should connect to the store with the correct props', () => {

        const initialState = {
            authedUser: '1abc',
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Router history={history}><Provider store={store}><ConnectedNavbarRightAuthed /></Provider></Router>);
        const componentProps = wrapper.find(NavbarRightAuthed).props();
        expect(componentProps.authedUser).toBe('1abc');
        expect(componentProps.handleLogoutUser).toBeInstanceOf(Function);
    });
});
