import React from 'react';
import { shallow } from 'enzyme';
import ItemOptions from './ItemOptions';

const setup = (props = {}) => {
    return shallow(<ItemOptions {...props} />);
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup({ item: { id: 1 } });
        const editLink = wrapper.find('Link[to="/items/1/edit"]');
        expect(editLink.length).toBe(1);
    });
});