import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../../history';
import { storeFactory } from '../../../test/testUtils';
import ConnectedItemOptions, { ItemOptions } from './ItemOptions';
import ConfirmDelete from '../universal/ConfirmDelete';

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
        const confirmDelete = wrapper.find(ConfirmDelete);
        expect(confirmDelete.length).toBe(1);
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