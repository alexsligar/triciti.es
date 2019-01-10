import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { List, Checkbox } from 'semantic-ui-react';
import ConnectedToggleListItem, { ToggleListItem } from './ToggleListItem';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    name: 'Test List',
    itemId: 2,
    listId: 'abcd',
    listItemExists: false,
    handleAddListItem: () => {},
    handleRemoveListItem: () => {},
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ToggleListItem {...propsPassed} />);
};

describe('render', () => {

    it('should render a ListItem and Checkbox', () => {

        const wrapper = setup();
        const listItem = wrapper.find(List.Item);
        expect(listItem.length).toBe(1);
        const checkbox = wrapper.find(Checkbox);
        expect(checkbox.length).toBe(1);
        expect(checkbox.props().checked).toBe(defaultProps.listItemExists);
    });
});

describe('handleToggleListItem', () => {

    it('should call handleRemoveListItem if listItemExists is true', () => {

        const handleRemoveListItem = jest.fn();
        const wrapper = setup({ listItemExists: true, handleRemoveListItem });
        wrapper.instance().handleToggleListItem();
        expect(handleRemoveListItem.mock.calls.length).toBe(1);
        expect(handleRemoveListItem.mock.calls[0][0]).toBe(defaultProps.listId);
        expect(handleRemoveListItem.mock.calls[0][1]).toBe(defaultProps.itemId);
    });

    it('should call handleAddListItem if listItemExists is false', () => {

        const handleAddListItem = jest.fn();
        const wrapper = setup({ handleAddListItem });
        wrapper.instance().handleToggleListItem();
        expect(handleAddListItem.mock.calls.length).toBe(1);
        expect(handleAddListItem.mock.calls[0][0]).toBe(defaultProps.listId);
        expect(handleAddListItem.mock.calls[0][1]).toBe(defaultProps.itemId);
    });
});

describe('connect', () => {

    it('should have access to the correct props via connect', () => {
        
        const store = storeFactory({});
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedToggleListItem 
                    itemId={2}
                    name='Test List'
                    listId='abcd'
                    listItemExists={false}    
                />
            </Provider>
        );
        const componentProps = wrapper.find(ToggleListItem).props();
        expect(componentProps.itemId).toBeDefined();
        expect(componentProps.listId).toBeDefined();
        expect(componentProps.listItemExists).toBeDefined();
        expect(componentProps.name).toBeDefined();
        expect(componentProps.handleAddListItem).toBeInstanceOf(Function);
        expect(componentProps.handleRemoveListItem).toBeInstanceOf(Function);
    });
});