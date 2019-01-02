import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Confirm, Button } from 'semantic-ui-react';
import history from '../../history';
import { storeFactory } from '../../../test/testUtils';
import ConnectedItemOptions, { ItemOptions } from './ItemOptions';


const defaultProps = {
    item: {
        id: 1,
    },
    deleteProcessing: false,
    deleteError: null,
    handleDeleteItem: () => {},
    removeDeleteItemError: () => {},
}
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ItemOptions {...propsPassed} />);
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
        const editLink = wrapper.find('Link[to="/items/1/edit"]');
        expect(editLink.length).toBe(1);
        const deleteIcon = wrapper.find('Icon[name="times circle"]');
        expect(deleteIcon.length).toBe(1);
    });

    it('Confirm should have the right buttons when deleteProcessing is true', () => {

        const wrapper = setup({ deleteProcessing: true });
        const confirm = wrapper.find(Confirm);
        expect(confirm.props().cancelButton).toBeNull();
        expect(confirm.props().confirmButton.type).toBe(Button);
    });

    it('Confirm should have the correct content when deleteError is not null', () => {

        const wrapper = setup({ deleteError: 'Uh oh' });
        const confirm = wrapper.find(Confirm);
        expect(confirm.props().content).toBe('Error deleting item. Try again?');
    });
});

describe('enterDeleteMode', () => {

    it('should set deleteMode state to true', () => {

        const wrapper = setup();
        wrapper.setState({ deleteMode: false });
        wrapper.instance().enterDeleteMode();
        expect(wrapper.state().deleteMode).toBe(true);
    });
});

describe('handleCanceledDelete', () => {

    it('should set deleteMode state to false and call removeDeleteTagError', () => {

        const removeDeleteItemError = jest.fn();
        const wrapper = setup({ removeDeleteItemError, deleteError: 'Uh oh' });
        wrapper.setState({ deleteMode: true });
        wrapper.instance().handleCanceledDelete();
        expect(wrapper.state().deleteMode).toBe(false);
        expect(removeDeleteItemError.mock.calls.length).toBe(1);
    });

    it('should not call removeDeleteTagError if deleteError is null', () => {

        const removeDeleteItemError = jest.fn();
        const wrapper = setup({ removeDeleteItemError });
        wrapper.instance().handleCanceledDelete();
        expect(removeDeleteItemError.mock.calls.length).toBe(0);
    });
});

describe('handleConfirmedDelete', () => {

    it('should call handleDeleteItem', () => {

        const handleDeleteItem = jest.fn();
        const wrapper = setup({ handleDeleteItem });
        wrapper.instance().handleConfirmedDelete();
        expect(handleDeleteItem.mock.calls.length).toBe(1);
        expect(handleDeleteItem.mock.calls[0][0]).toBe(defaultProps.item.id);
    });
});

describe('connect', () => {

    it('should receive the correct props from connect', () => {

        const initialState = {
            items: {
                deleteItem: {
                    processing: false,
                    error: null,
                },
            },
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Router history={history}><Provider store={store}><ConnectedItemOptions item={{ id: 1 }} /></Provider></Router>);
        const componentProps = wrapper.find(ItemOptions).props();
        expect(componentProps.deleteProcessing).toBeDefined();
        expect(componentProps.deleteError).toBeDefined();
        expect(componentProps.handleDeleteItem).toBeInstanceOf(Function);
        expect(componentProps.removeDeleteItemError).toBeInstanceOf(Function);
    });
});