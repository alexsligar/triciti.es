import React from 'react';
import { shallow } from 'enzyme';
import AddItem from './AddItem';
import ItemForm from './ItemForm';

const setup = (props = {}) => {
    const wrapper = shallow(<AddItem {...props} />);
    return wrapper;
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
        const itemForm = wrapper.find(ItemForm);
        expect(itemForm.length).toBe(1);
    });
});