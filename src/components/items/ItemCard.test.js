import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import ItemCard from './ItemCard';

describe('render', () => {

    it('should render without error', () => {

        const props = {
            name: 'Test Item',
            type: 'Activity',
            location: '1500 W. 1st Ave., Kennewick, WA 99336',
            start_date: 'December 1, 2018 2:00pm',
            end_date: 'December 1, 2018 3:00pm',
        }
        const wrapper = shallow(<ItemCard {...props} />);
        const card = wrapper.find(Card);
        expect(card.length).toBe(1);
    });

    it('should render without error when start_date is null', () => {

        const props = {
            name: 'Test Item',
            type: 'Activity',
            location: '1500 W. 1st Ave., Kennewick, WA 99336',
        };
        const wrapper = shallow(<ItemCard {...props} />);
        const card = wrapper.find(Card);
        expect(card.length).toBe(1);
    });
});