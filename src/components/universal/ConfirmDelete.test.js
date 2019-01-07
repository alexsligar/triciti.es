import React from 'react';
import { shallow } from 'enzyme';
import { Confirm, Button } from 'semantic-ui-react';
import ConfirmDelete from './ConfirmDelete';

const defaultProps = {
    entityId: 'abc',
    entityType: 'item',
    deleteProcessing: false,
    deleteError: null,
    handleDelete: () => {},
    removeDeleteError: () => {},
}
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ConfirmDelete {...propsPassed} />);
}

describe('render', () => {
    
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
})

describe('handleOpenDeleteMode', () => {

    it('should set deleteMode state to true', () => {

        const wrapper = setup();
        wrapper.setState({ deleteMode: false });
        wrapper.instance().handleOpenDeleteMode();
        expect(wrapper.state().deleteMode).toBe(true);
    });
});

describe('handleCanceledDelete', () => {

    it('should set deleteMode state to false and call removeDeleteError', () => {

        const removeDeleteError = jest.fn();
        const wrapper = setup({ removeDeleteError, deleteError: 'Uh oh' });
        wrapper.setState({ deleteMode: true });
        wrapper.instance().handleCanceledDelete();
        expect(wrapper.state().deleteMode).toBe(false);
        expect(removeDeleteError.mock.calls.length).toBe(1);
    });

    it('should not call removeDeleteError if deleteError is null', () => {

        const removeDeleteError = jest.fn();
        const wrapper = setup({ removeDeleteError });
        wrapper.instance().handleCanceledDelete();
        expect(removeDeleteError.mock.calls.length).toBe(0);
    });
});

describe('handleConfirmedDelete', () => {

    it('should call handleDelete prop', () => {

        const handleDelete = jest.fn();
        const wrapper = setup({ handleDelete });
        wrapper.instance().handleConfirmedDelete();
        expect(handleDelete.mock.calls.length).toBe(1);
        expect(handleDelete.mock.calls[0][0]).toBe(defaultProps.entityId);
    });
});