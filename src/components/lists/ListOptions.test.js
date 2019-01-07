import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import ConnectedListOptions, { ListOptions } from './ListOptions';
import ListForm from './ListForm';
import ConfirmDelete from '../universal/ConfirmDelete';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    list: {
        id: 'abcd',
        name: 'Test List',
        description: 'A list description',
        owner: 'testuser',
    },
    updateProcessing: false,
    updateError: null,
    deleteProcessing: false,
    deleteError: null,
    handleDeleteList: () => {},
    removeDeleteListError: () => {},
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props};
    return shallow(<ListOptions {...propsPassed} />);
}

describe('render', () => {

    it('should render a Modal for editing and a ConfirmDelete for deleting', () => {

        const wrapper = setup();
        const modal = wrapper.find(Modal);
        expect(modal.length).toBe(1);
        const listForm = modal.find(ListForm);
        expect(listForm.length).toBe(1);
        const confirm = wrapper.find(ConfirmDelete);
        expect(confirm.length).toBe(1);
    });
});

describe('handleOpenEditMode', () => {

    it('should set editMode state to true', () => {

        const wrapper = setup();
        wrapper.instance().handleOpenEditMode();
        expect(wrapper.state().editMode).toBe(true);
    });
});

describe('handleCloseEditMode', () => {

    it('should set editMode state to false', () => {

        const wrapper = setup();
        wrapper.setState({ editMode: true });
        wrapper.instance().handleCloseEditMode();
        expect(wrapper.state().editMode).toBe(false);
    });
});

describe('componentDidUpdate', () => {

    it('should call handleCloseEditMode if the item changes', () => {

        const wrapper = setup();
        const handleCloseEditMode = jest.fn();
        wrapper.instance().handleCloseEditMode = handleCloseEditMode;
        wrapper.instance().componentDidUpdate({ updateProcessing: true });
        expect(handleCloseEditMode.mock.calls.length).toBe(1);
    });

    it('should not call handleCloseEditMode if the item hasnt changed', () => {

        const wrapper = setup();
        const handleCloseEditMode = jest.fn();
        wrapper.instance().handleCloseEditMode = handleCloseEditMode;
        wrapper.instance().componentDidUpdate({ updateProcessing: false });
        expect(handleCloseEditMode.mock.calls.length).toBe(0);
    });
});

describe('connect', () => {

    it('should receive the correct props from connect', () => {

        const initialState = {
            lists: {
                updateList: {
                    processing: false,
                    error: null,
                },
                deleteList: {
                    processing: false,
                    error: null,
                },
            },
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Provider store={store}><ConnectedListOptions list={defaultProps.list} /></Provider>);
        const componentProps = wrapper.find(ListOptions).props();
        expect(componentProps.list).toBeDefined();
        expect(componentProps.updateProcessing).toBeDefined();
        expect(componentProps.updateError).toBeDefined();
        expect(componentProps.handleDeleteList).toBeInstanceOf(Function);
        expect(componentProps.removeDeleteListError).toBeInstanceOf(Function);
        expect(componentProps.deleteProcessing).toBeDefined();
        expect(componentProps.deleteError).toBeDefined();
    });
});