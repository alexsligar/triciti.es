import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Modal, Message } from 'semantic-ui-react';
import ConnectedAddListItemModal, { AddListItemModal } from './AddListItemModal';
import { storeFactory } from '../../../test/testUtils';
import ToggleListItem from './ToggleListItem';

const defaultProps = {
    toggleListItemError: null,
    itemId: 2,
    userLists: [
        { id: 'abc', name: 'Test List', items: [3] },
        { id: 'def', name: 'Another List', items: [4,5,6] }
    ],
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<AddListItemModal {...propsPassed} />);
}

describe('render', () => {

    it('should render a Modal with ToggleListItems for each list', () => {

        const wrapper = setup();
        const modal = wrapper.find(Modal);
        expect(modal.length).toBe(1);
        const toggleListItems = wrapper.find(ToggleListItem);
        expect(toggleListItems.length).toBe(defaultProps.userLists.length);        
    });

    it('should render an error Message when toggleListItemError is not null', () => {

        const wrapper = setup({ toggleListItemError: 'Uh oh' });
        const message = wrapper.find(Message);
        expect(message.length).toBe(1);
        expect(message.props().content).toBe('Uh oh');
    });
});


describe('connect', () => {

    it('should have access to the correct props via connect', () => {

        const initialState = {
            listItems: {
                toggleListItem: {
                    error: null,
                },
            },
            users: {
                userLists: {
                    username: 'testuser',
                    lists: [
                        { id: 'abc', name: 'Test List', items: [3] },
                        { id: 'def', name: 'Another List', items: [4,5,6] }
                    ],
                },
            }
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Provider store={store}><ConnectedAddListItemModal itemId={2} /></Provider>);
        const componentProps = wrapper.find(AddListItemModal).props();
        expect(componentProps.toggleListItemError).toBeDefined();
        expect(componentProps.userLists).toBeDefined();
        expect(componentProps.itemId).toBeDefined();
    });
});
