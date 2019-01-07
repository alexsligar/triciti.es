import React from 'react';
import { shallow } from 'enzyme';
import ListHeader from './ListHeader';
import { Header } from 'semantic-ui-react';

describe('render', () => {

    it('should render without error', () => {

        const props = {
            list: {
                name: 'Test List',
                owner: 'testuser',
                description: 'This is a test list',
            },
        };
        const wrapper = shallow(<ListHeader {...props} />);
        const header = wrapper.find(Header);
        expect(header.dive().text()).toBe(props.list.name);
        const ownerLink = wrapper.find('Link[to="/users/testuser"]');
        expect(ownerLink.length).toBe(1);
    });
});