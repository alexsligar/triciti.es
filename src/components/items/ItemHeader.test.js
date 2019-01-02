import React from 'react';
import { shallow } from 'enzyme';
import { Header, Label } from 'semantic-ui-react';
import ItemHeader from './ItemHeader';

const setup = (props = {}) => {
    return shallow(<ItemHeader {...props} />);
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup({ item: { name: 'Test Item', tags: ['test', 'fun'], owners: ['testuser'] } });
        const header = wrapper.find(Header);
        expect(header.length).toBe(1);
        expect(header.dive().text()).toBe('Test Item');
        const ownerLink = wrapper.find('Link[to="/users/testuser"]');
        expect(ownerLink.length).toBe(1);
        const labels = wrapper.find(Label);
        expect(labels.length).toBe(2);
    });

    it('should return null for if the tags are null', () => {

        const wrapper = setup({ item: { name: 'Test Item', tags: [null], owners: ['testuser'] } })
        const labels = wrapper.find(Label);
        expect(labels.length).toBe(0);
    });
});